package com.lec.spring.general.reserve.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lec.spring.general.reserve.service.ReserveService;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
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


        List<JsonNode> outboundFlights = fetchFlights(iataCode, arrIataCode, depDate, type);
        List<JsonNode> inboundFlights = arrDate != null && !arrDate.isEmpty()
                ? fetchFlights(arrIataCode, iataCode, arrDate, type)
                : Collections.emptyList();

        // 가격 추가
        List<JsonNode> updatedOutboundFlights = addPricesToFlights(outboundFlights, iataCode, arrIataCode);
        List<JsonNode> updatedInboundFlights = addPricesToFlights(inboundFlights, arrIataCode, iataCode);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("outboundFlights", updatedOutboundFlights);
        responseMap.put("inboundFlights", updatedInboundFlights);

        if (!inboundFlights.isEmpty()) {
            List<JsonNode> matchingFlights = getMatchingFlights(outboundFlights, inboundFlights);
            responseMap.put("matchingFlights", matchingFlights);
        } else {
            responseMap.put("matchingFlights", null);
        }

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    private List<JsonNode> fetchFlights(String depIata, String arrIata, String date, String type) {
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

        return parseFlightInfo(response.getBody());
    }

    private List<JsonNode> parseFlightInfo(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<JsonNode> flights = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(response);
            if (root.isArray()) {
                for (JsonNode flight : root) {
                    flights.add(flight);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return flights;
    }

    private List<JsonNode> addPricesToFlights(List<JsonNode> flights, String depIata, String arrIata) {
        List<JsonNode> updatedFlights = new ArrayList<>();
        for (JsonNode flight : flights) {
            ObjectNode flightNode = (ObjectNode) flight;

            // 거리와 가격 계산
            double distance = reserveService.calculateDistance(depIata, arrIata);
            int price = reserveService.calculateRandomPrice(distance);

            // 거리 추가
            flightNode.put("price", price);

            updatedFlights.add(flightNode);
        }
        return updatedFlights;
    }

    private List<JsonNode> getMatchingFlights(List<JsonNode> outboundFlights, List<JsonNode> inboundFlights) {
        List<JsonNode> matchingFlights = new ArrayList<>();
        Set<String> airlineNames = new HashSet<>();

        // Extract airline names from outbound flights
        for (JsonNode outbound : outboundFlights) {
            JsonNode airlineNode = outbound.get("airline");
            if (airlineNode != null) {
                String airlineName = airlineNode.get("iataCode").asText(null);
                if (airlineName != null) {
                    airlineNames.add(airlineName);
                }
            }
        }

        // Find matching flights based on airline names
        for (JsonNode inbound : inboundFlights) {
            JsonNode airlineNode = inbound.get("airline");
            if (airlineNode != null) {
                String airlineName = airlineNode.get("iataCode").asText(null);
                if (airlineName != null && airlineNames.contains(airlineName)) {
                    matchingFlights.add(inbound);
                }
            }
        }
        return matchingFlights;


    }


    // 디테일 페이지(api 계속 가지고 있고, 사용자가 작성한 것도 필요해)

    // 결제 페이지(db 에 저장)
}

