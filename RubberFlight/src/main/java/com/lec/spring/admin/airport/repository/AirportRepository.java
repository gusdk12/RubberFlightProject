package com.lec.spring.admin.airport.repository;

import com.lec.spring.admin.airport.domain.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AirportRepository extends JpaRepository<Airport, Long> {

    Airport findByAirportIso(String airportIso);

    List<Airport> findByCountryId(Long countryId);
}
