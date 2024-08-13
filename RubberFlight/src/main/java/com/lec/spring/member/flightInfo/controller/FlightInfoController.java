package com.lec.spring.member.flightInfo.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.general.reserve.domain.Reserve;
import com.lec.spring.general.reserve.service.ReserveService;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import com.lec.spring.member.flightInfo.service.FlightInfoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/flightInfo")
@RequiredArgsConstructor
public class FlightInfoController {

    private final FlightInfoService flightInfoService;
    private final JWTUtil jwtUtil;
    private final ReserveService reserveService;

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    // 유저별 모든 예약 정보
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<List<FlightInfo>> getAllFlightInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        List<FlightInfo> flightInfoList = flightInfoService.findByUserId(userId);
        return new ResponseEntity<>(flightInfoList, HttpStatus.OK);
    }

    // 사용자 예약 정보에 따른 예정된 항공편 정보
    /*
    @CrossOrigin
    @GetMapping("/flights/{id}")
    public ResponseEntity<?> getFlightInfo(@PathVariable Long id, HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        FlightInfo flightInfo = flightInfoService.findByIdAndUserId(id, userId);
        if (flightInfo == null) {
            return new ResponseEntity<>("항공편 정보를 찾을 수 없거나 권한이 없습니다.", HttpStatus.NOT_FOUND);
        }

        // 예약의 상태 확인
        Reserve reserve = reserveService.detail(flightInfo.getReserve().getId());
        if (reserve != null && reserve.isIsended()) {
            // 과거 예약인 경우
            return getFlightHistory(id, request);
        } else {
            // 예정된 항공편 정보인 경우
            return getFlightTimetable(id, request);
        }
    }

     */

    // 사용자 예약 정보에 따른 예정된 항공편 정보
    @CrossOrigin
    @GetMapping("/flights/{id}")
    public ResponseEntity<?> getFlightTimetable(@PathVariable Long id, HttpServletRequest request) throws IOException {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        // 항공편 정보 가져오기 (해당 예약이 로그인한 사용자의 것인지 확인)
        FlightInfo flightInfo = flightInfoService.findByIdAndUserId(id, userId);
        if (flightInfo == null) {
            return new ResponseEntity<>("항공편 정보를 찾을 수 없거나 권한이 없습니다.", HttpStatus.NOT_FOUND);
        }

        String depIata = flightInfo.getDepIata();
        String flightIat = flightInfo.getFlightIat();

        RestTemplate restTemplate = new RestTemplate();
        URI uri2 = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/timetable")
                .queryParam("key", aviation_key)
                .queryParam("iataCode", depIata)
                .queryParam("type", "departure")
                .queryParam("flight_iata", flightIat)
                .build()
                .encode()
                .toUri();

        String response = restTemplate.getForObject(uri2, String.class);
        List<Map<String, Object>> timetableList = parseTimetableResponse(response); // JSON 리스트로 변환

        Map<String, Object> combinedResponse = new HashMap<>();
        combinedResponse.put("flightInfo", flightInfo);
        combinedResponse.put("timetable", timetableList);

        // getForEntity 대신 getForObject 를 사용하고 Entity 를 직접 만들어서 보내기
        return new ResponseEntity<>(combinedResponse, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/flights/history/{id}")
    public ResponseEntity<?> getFlightHistory(@PathVariable Long id, HttpServletRequest request) throws IOException {

        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        FlightInfo flightInfo = flightInfoService.findByIdAndUserId(id, userId);
        if (flightInfo == null) {
            return new ResponseEntity<>("항공편 정보를 찾을 수 없거나 권한이 없습니다.", HttpStatus.NOT_FOUND);
        }

        String depIata = flightInfo.getDepIata();
        String flightIat = flightInfo.getFlightIat().replaceAll("[^0-9]", "");
        LocalDateTime depSch = flightInfo.getDepSch();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = depSch.format(formatter);

        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/flightsHistory")
                .queryParam("key", aviation_key)
                .queryParam("code", depIata)
                .queryParam("type", "departure")
                .queryParam("date_from", date)
                .queryParam("flight_number", flightIat)
                .build()
                .encode()
                .toUri();

        System.out.println("flightIat" + flightIat);
        System.out.println("date" + date);
        System.out.println("code" + depIata);

        String response = restTemplate.getForObject(uri, String.class);
        List<Map<String, Object>> historyList = parseTimetableResponse(response);

        Map<String, Object> combinedResponse = new HashMap<>();
        combinedResponse.put("flightInfo", flightInfo);
        combinedResponse.put("history", historyList);

        return new ResponseEntity<>(combinedResponse, HttpStatus.OK);
    }

    // 항공편 일정 응답 JSON 파싱
    private List<Map<String, Object>> parseTimetableResponse(String jsonResponse) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonResponse);
        List<Map<String, Object>> timetableList;

        if (rootNode.isArray()) {
            timetableList = objectMapper.convertValue(rootNode, new TypeReference<List<Map<String, Object>>>() {});
        } else if (rootNode.isObject()) {
            timetableList = Collections.singletonList(objectMapper.convertValue(rootNode, new TypeReference<Map<String, Object>>() {}));
        } else {
            return Collections.emptyList();
        }

        return timetableList.stream()
                .filter(timetable -> timetable.containsKey("arrival") && timetable.containsKey("flight"))
                .collect(Collectors.toList());
    }
}