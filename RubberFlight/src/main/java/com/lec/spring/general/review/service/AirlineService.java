package com.lec.spring.general.review.service;

import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.general.review.repository.AirlineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    public List<Airline> namelist() {
        return airlineRepository.findAll(Sort.by(Sort.Order.asc("name")));
    }
}
