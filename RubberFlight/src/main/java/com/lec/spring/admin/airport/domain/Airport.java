package com.lec.spring.admin.airport.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_airport")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 공항 ID : airportId

    @Column
    private Integer countryId; // FK : ft_country 테이블

    @Column
    private String airportName; // 공항 이름 : nameAirport

    @Column
    private String airportIso; // 공항 ISO 코드 : codeIataAirport

}
