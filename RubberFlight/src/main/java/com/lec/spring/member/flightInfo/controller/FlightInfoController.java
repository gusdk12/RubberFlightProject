package com.lec.spring.member.flightInfo.controller;

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

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flightInfo")
@RequiredArgsConstructor
public class FlightInfoController {

    private final FlightInfoService flightInfoService;
    private final ReserveService reserveService;

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    // 사용자 예약 정보에 따른 항공편 정보
    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<FlightInfo>> getUserFlightInfo(@PathVariable Long reservationId) {
        List<FlightInfo> flightInfoList = flightInfoService.getUserFlightInfo(reservationId);
        return new ResponseEntity<>(flightInfoList, HttpStatus.OK);
    }

    // 예약 정보를 기반으로 항공편 API 호출
    @GetMapping("/reservation/{reservationId}/flightInfo")
    public ResponseEntity<?> getFlightInfoByReservation(@PathVariable Long reservationId) {
        Reserve reserve = reserveService.detail(reservationId);
        if (reserve == null) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }

        // 예약에서 출발 및 도착 IATA 코드 가져오기
        String depIata = reserve.getFlightInfoList().get(0).getDepIata();
        String arrIata = reserve.getFlightInfoList().get(0).getArrIata();

        // 항공편 API
        URI uri1 = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/flights")
                .queryParam("key", aviation_key)
                .queryParam("depIata", depIata)
                .queryParam("arrIata", arrIata)
                .build()
                .encode()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        String response1 = restTemplate.getForObject(uri1, String.class);

        // 항공편 일정 API
        URI uri2 = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/timetable")
                .queryParam("key", aviation_key)
                .queryParam("depIata", depIata)
                .queryParam("arrIata", arrIata)
                .build()
                .encode()
                .toUri();

        String response2 = restTemplate.getForObject(uri2, String.class);

        Map<String, String> combinedResponse = new HashMap<>();
        combinedResponse.put("flights", response1);
        combinedResponse.put("timetable", response2);

        return new ResponseEntity<>(combinedResponse, HttpStatus.OK);
    }

}

// getForEntity 대신 getForObject 를 사용하고 Entity 를 직접 만들어서 보내기
//        String forObject = new RestTemplate().getForObject(uri, String.class);
//        return new ResponseEntity<>(forObject, HttpStatus.OK);
