package com.lec.spring.general.live.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/live")
public class LiveController {
    @Value("${app.api-key.aviation}")
    private String aviation_key;

    @GetMapping("/{flightIata}")
    public ResponseEntity<?> find(@PathVariable String flightIata){
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/flights")
                .queryParam("key", aviation_key)
                .queryParam("flightIata", flightIata)
                .build()
                .encode()
                .toUri();

        String forObject = new RestTemplate().getForObject(uri, String.class);
        return new ResponseEntity<>(forObject, HttpStatus.OK);
    }
}
