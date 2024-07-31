package com.lec.spring.admin.country.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class CountryController {

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    @GetMapping("/country/{iso2Country}")
    public ResponseEntity<?> find(@PathVariable String iso2Country){
        URI uri = UriComponentsBuilder
                .fromUriString("https://aviation-edge.com/v2/public/countryDatabase")
                .queryParam("key", aviation_key)
                .queryParam("codeIso2Country", iso2Country)
                .build()
                .encode()
                .toUri();

        return new RestTemplate().getForEntity(uri, String.class);
    }

}
