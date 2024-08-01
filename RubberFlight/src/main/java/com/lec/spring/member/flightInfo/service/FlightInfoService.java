package com.lec.spring.member.flightInfo.service;

import com.lec.spring.member.flightInfo.repository.FlightInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FlightInfoService {
    private final FlightInfoRepository flightInfoRepository;
}
