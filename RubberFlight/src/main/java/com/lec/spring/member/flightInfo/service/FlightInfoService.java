package com.lec.spring.member.flightInfo.service;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import com.lec.spring.member.flightInfo.repository.FlightInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FlightInfoService {
    private final FlightInfoRepository flightInfoRepository;

    @Transactional(readOnly = true)
    public List<FlightInfo> findAll() {
        return flightInfoRepository.findAll();
    }
}
