package com.lec.spring.general.reserve.repository;

import com.lec.spring.general.reserve.domain.Reserve;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {

}
