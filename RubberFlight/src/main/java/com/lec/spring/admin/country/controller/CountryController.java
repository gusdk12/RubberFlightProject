package com.lec.spring.admin.country.controller;

import com.lec.spring.admin.country.domain.Country;
import com.lec.spring.admin.country.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/country")
public class CountryController {
    private final CountryService countryService;

    @Value("${app.api-key.aviation}")
    private String aviation_key;

    @GetMapping("/{iso2Country}")
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

    // 목록
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(countryService.list(), HttpStatus.OK);
    }

    // 추가
    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Country country) {
        return new ResponseEntity<>(countryService.add(country), HttpStatus.OK);
    }

    // 삭제
    @CrossOrigin
    @DeleteMapping("/delete/{iso2Country}")
    public ResponseEntity<?> delete(@PathVariable String iso2Country) {
        return new ResponseEntity<>(countryService.delete(iso2Country), HttpStatus.OK);
    }





}
