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
    public ResponseEntity<?> searchFlights(@RequestParam String iataCode,
                                           @RequestParam String depDate,
                                           @RequestParam String arrIataCode,
                                           @RequestParam(required = false) String arrDate,
                                           @RequestParam String mode) {

        String type = "departure";

        System.out.println("arrDate: " + arrDate); // 로깅 추가



        List<Flight> outboundFlights = fetchFlights(iataCode, arrIataCode, depDate, type);

        List<Flight> inboundFlights = (arrDate != null && !arrDate.isEmpty())
                ? fetchFlights(arrIataCode, iataCode, arrDate, type)
                : Collections.emptyList();

        if ("combine".equals(mode) && !outboundFlights.isEmpty() && !inboundFlights.isEmpty()) {
            List<Map<String, Flight>> combinations = createFlightCombinations(outboundFlights, inboundFlights);
            return new ResponseEntity<>(Collections.singletonMap("combinations", combinations), HttpStatus.OK);
        }

        List<Flight> sortedOutboundFlights = reserveService.getFlights(outboundFlights);
        List<Flight> sortedInboundFlights = reserveService.getFlights(inboundFlights);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("outboundFlights", sortedOutboundFlights);
        responseMap.put("inboundFlights", sortedInboundFlights);

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
                    Flight flight = new Flight(jsonNode, depIata, arrIata, date, price);

                    if(!flight.getAirlineName().equals("") && !flight.getAirlineName().trim().isEmpty()) {
                        flights.add(flight);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return flights;
    }

    private List<Map<String, Flight>> createFlightCombinations(List<Flight> outboundFlights, List<Flight> inboundFlights) {
        List<Map<String, Flight>> combinations = new ArrayList<>();
        for (Flight outbound : outboundFlights) {
            for (Flight inbound : inboundFlights) {
                Map<String, Flight> combination = new HashMap<>();
                combination.put("outbound", outbound);
                combination.put("inbound", inbound);
                combinations.add(combination);
            }
        }
        return combinations;
    }


    // 디테일 페이지(api 계속 가지고 있고, 사용자가 작성한 것도 필요해)

    // 결제 페이지(db 에 저장)
}

