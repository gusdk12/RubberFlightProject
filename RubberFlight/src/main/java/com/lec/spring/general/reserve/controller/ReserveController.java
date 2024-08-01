package com.lec.spring.general.reserve.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lec.spring.general.reserve.domain.Flight;
import com.lec.spring.general.reserve.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@RestController
public class ReserveController {


    @Value("${app.api-key.aviation}")
    private String aviation_key;

    @Autowired
    private ReserveService reserveService;

    // 검색 페이지(api)
    @GetMapping("/search")
    public ResponseEntity<?> searchFlights(@RequestBody Map<String, String> flightRequest) {
        String iataCode = flightRequest.get("iataCode");
        String type = "departure";
        String depDate = flightRequest.get("date");
        String arrIataCode = flightRequest.get("arr_iataCode");
        String arrDate = flightRequest.get("date2");


        List<Flight> outboundFlights = fetchFlights(iataCode, arrIataCode, depDate, type);
        List<Flight> inboundFlights = arrDate != null && !arrDate.isEmpty()
                ? fetchFlights(arrIataCode, iataCode, arrDate, type)
                : Collections.emptyList();

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("outboundFlights", outboundFlights);


        if (!inboundFlights.isEmpty()) {
            List<Flight> matchingFlights = getMatchingFlights(outboundFlights, inboundFlights);
            responseMap.put("matchingFlights", matchingFlights);
        } else {
            responseMap.put("matchingFlights", null);
        }

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    private List<Flight> fetchFlights(String depIata, String arrIata, String date, String type) {
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/flightsFuture")
                .queryParam("key", aviation_key)
                .queryParam("iataCode", depIata)
                .queryParam("type", type)
                .queryParam("date", date)
                .queryParam("arr_iataCode", arrIata)
                .build()
                .encode()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);

        return parseFlightInfo(response.getBody(), depIata, arrIata, date);
    }

    private List<Flight> parseFlightInfo(String response, String depIata, String arrIata, String date) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Flight> flights = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(response);
            if (root.isArray()) {
                for (JsonNode jsonNode : root) {
                    double distance = reserveService.calculateDistance(depIata, arrIata);
                    int price = reserveService.calculateRandomPrice(distance);
                    flights.add(new Flight(jsonNode, date, price));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return flights;
    }

    private List<Flight> getMatchingFlights(List<Flight> outboundFlights, List<Flight> inboundFlights) {
        List<Flight> matchingFlights = new ArrayList<>();
        Set<String> airlineNames = new HashSet<>();

        // 항공사 이름찾기
        for (Flight outbound : outboundFlights) {
            if (outbound.getAirlineIata() != null) {
                airlineNames.add(outbound.getAirlineIata());
            }
        }

        // 출국 때 검색 됐던 항공사와 같은 것들만
        for (Flight inbound : inboundFlights) {
            if (inbound.getAirlineIata() != null && airlineNames.contains(inbound.getAirlineIata())) {
                matchingFlights.add(inbound);
            }
        }
        return matchingFlights;
    }


    // 디테일 페이지(api 계속 가지고 있고, 사용자가 작성한 것도 필요해)

    // 결제 페이지(db 에 저장)
}

