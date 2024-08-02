package com.lec.spring.member.flightInfo.service;

import com.lec.spring.member.flightInfo.domain.FlightInfo;
import com.lec.spring.member.flightInfo.repository.FlightInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FlightInfoService {
    private final FlightInfoRepository flightInfoRepository;

    // 예약 ID로 항공편 정보 가져오기
    public List<FlightInfo> getUserFlightInfo(Long reservationId) {
        return flightInfoRepository.findByReserveId(reservationId);
    }
}
