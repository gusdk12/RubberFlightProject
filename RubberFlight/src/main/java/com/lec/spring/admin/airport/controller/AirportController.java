package com.lec.spring.admin.airport.controller;

import com.lec.spring.admin.airport.domain.Airport;
import com.lec.spring.admin.airport.service.AirportService;
import com.lec.spring.admin.country.domain.Country;
import com.lec.spring.admin.country.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/airport")
public class AirportController {
    private final AirportService airportService;

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    @GetMapping("/{codeIataAirport}")
    public ResponseEntity<?> find(@PathVariable String codeIataAirport){
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/airportDatabase")
                .queryParam("key", aviation_key)
                .queryParam("codeIataAirport", codeIataAirport)
                .build()
                .encode()
                .toUri();

        String forObject = new RestTemplate().getForObject(uri, String.class);
        return new ResponseEntity<>(forObject, HttpStatus.OK);
    }

    // 목록
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(airportService.list(), HttpStatus.OK);
    }

    // 추가
    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Airport airport) {
        return new ResponseEntity<>(airportService.add(airport), HttpStatus.OK);
    }

    // 삭제
    @CrossOrigin
    @DeleteMapping("/delete/{codeIataAirport}")
    public ResponseEntity<?> delete(@PathVariable String codeIataAirport) {
        return new ResponseEntity<>(airportService.delete(codeIataAirport), HttpStatus.OK);
    }
}
