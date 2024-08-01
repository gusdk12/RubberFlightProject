package com.lec.spring.general.review.repository;

import com.lec.spring.general.review.domain.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirlineRepository extends JpaRepository<Airline, Long> {
    boolean existsByName(String name);
}
