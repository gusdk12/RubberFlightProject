package com.lec.spring.member.flightInfo.repository;

import com.lec.spring.member.flightInfo.domain.FlightInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightInfoRepository extends JpaRepository<FlightInfo, Long> {

    List<FlightInfo> findByReserveId(Long reserveId);

    List<FlightInfo> findByReserveUserId(Long userId);

    FlightInfo findByIdAndReserveUserId(Long id, Long userId);
}
