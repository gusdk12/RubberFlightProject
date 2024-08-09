package com.lec.spring.admin.airport.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.admin.country.domain.Country;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_airport")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "airportId")
    private Integer airportId;  // 공항 ID : airportId

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "countryId")
    private Country country; // FK : countryId

    @Column(name = "countryIso")
    private String countryIso; // 나라 ISO 코드 : codeIso2Country

    @Column(name = "airportName")
    private String airportName; // 공항 이름 : nameAirport

    @Column(unique = true, name = "airportIso")
    private String airportIso; // 공항 ISO 코드 : codeIataAirport

    @Column(name = "latitudeAirport")
    private Double latitudeAirport; // 공항 위도 : latitudeAirport

    @Column(name = "longitudeAirport")
    private Double longitudeAirport; // 공항 경도 : longitudeAirport

    @Column(name = "timezone")
    private String timezone; // 표준시간 : timezone
}
