package com.lec.spring.member.flightInfo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/flightInfo")
public class FlightInfoController {

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    // 항공 관련 API
    @GetMapping("/flights/{depIata}/{arrIata}")
    public ResponseEntity<?> getFlightInfo(
            @PathVariable String depIata, @PathVariable String arrIata) throws InterruptedException {
        System.out.println("getFlightInfo() 호출");
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/flights")
                .queryParam("key", aviation_key)
                .queryParam("depIata", depIata)
                .queryParam("arrIata", arrIata)
                .build()
                .encode()
                .toUri();

        return new RestTemplate().getForEntity(uri, String.class);
    }

}
