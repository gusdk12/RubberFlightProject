package com.lec.spring.member.flightInfo.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.general.reserve.domain.Reserve;
import com.lec.spring.general.reserve.service.ReserveService;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import com.lec.spring.member.flightInfo.service.FlightInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
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

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    // 사용자 예약 정보에 따른 항공편 정보
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<List<FlightInfo>> getAllFlightInfo() {
        List<FlightInfo> flightInfoList = flightInfoService.findAll();
        return new ResponseEntity<>(flightInfoList, HttpStatus.OK);
    }

    // 예약 정보 불러오기
    @CrossOrigin
    @GetMapping("/flightInfo")
    public ResponseEntity<?> getFlightInfoFromApi() throws IOException {
        List<FlightInfo> flightInfoList = flightInfoService.findAll();

        // 출발 및 도착 IATA 코드 가져오기
        Map<String, Object> combinedResponse = new HashMap<>();

        RestTemplate restTemplate = new RestTemplate();

        for (FlightInfo flightInfo : flightInfoList) {
            String depIata = flightInfo.getDepIata();
            String arrIata = flightInfo.getArrIata();
            String flightIat = flightInfo.getFlightIat();

            // 항공편 API
            URI uri1 = UriComponentsBuilder
                    .fromUriString("https://aviation-edge.com/v2/public/flights")
                    .queryParam("key", aviation_key)
                    .queryParam("depIata", depIata)
                    .queryParam("arrIata", arrIata)
                    .build()
                    .encode()
                    .toUri();

            String response1 = restTemplate.getForObject(uri1, String.class);
            List<Map<String, Object>> flightList = parseFlightResponse(response1); // JSON 리스트로 변환

            // 항공편 일정 API
            URI uri2 = UriComponentsBuilder
                    .fromUriString("https://aviation-edge.com/v2/public/timetable")
                    .queryParam("key", aviation_key)
                    .queryParam("iataCode", depIata)
                    .queryParam("type", "departure")
                    .build()
                    .encode()
                    .toUri();

            String response2 = restTemplate.getForObject(uri2, String.class);
            List<Map<String, Object>> timetableList = parseTimetableResponse(response2, arrIata, flightIat.toUpperCase()); // JSON 리스트로 변환

            combinedResponse.put(depIata + " to " + arrIata + " flights", flightList);
            combinedResponse.put(depIata + " to " + arrIata + " timetable", timetableList);
        }

        // getForEntity 대신 getForObject 를 사용하고 Entity 를 직접 만들어서 보내기
        return new ResponseEntity<>(combinedResponse, HttpStatus.OK);
    }

    // 항공편 응답 JSON 파싱
    private List<Map<String, Object>> parseFlightResponse(String jsonResponse) throws IOException {
        List<Map<String, Object>> flights = new ObjectMapper().readValue(jsonResponse, new TypeReference<List<Map<String, Object>>>() {});

        // 필요한 항목만 추출
        return flights.stream()
                .map(flight -> {
                    Map<String, Object> flightInfo = new HashMap<>();
                    flightInfo.put("flightNumber", ((Map<String, Object>) flight.get("flight")).get("iataNumber"));
                    flightInfo.put("departure", ((Map<String, Object>) flight.get("departure")).get("iataCode"));
                    flightInfo.put("arrival", ((Map<String, Object>) flight.get("arrival")).get("iataCode"));
                    flightInfo.put("status", flight.get("status"));
                    return flightInfo;
                })
                .collect(Collectors.toList());
//        return flights; // 필요한 항목을 필터링하지 않고 전체를 반환
    }

    // 항공편 일정 응답 JSON 파싱
    private List<Map<String, Object>> parseTimetableResponse(String jsonResponse, String arrIata, String flightIat) throws IOException {
        List<Map<String, Object>> timetableList = new ObjectMapper().readValue(jsonResponse, new TypeReference<List<Map<String, Object>>>() {});

        return timetableList.stream()
                .filter(timetable -> ((Map<String, Object>) timetable.get("arrival")).get("iataCode").equals(arrIata) &&
                        ((Map<String, Object>) timetable.get("flight")).get("iataNumber").equals(flightIat))
                .collect(Collectors.toList());

    }
}