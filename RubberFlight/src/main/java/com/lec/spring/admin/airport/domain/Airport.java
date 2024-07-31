package com.lec.spring.admin.airport.domain;

import com.lec.spring.admin.country.domain.Country;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_airport")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer airportId;  // 공항 ID : airportId

    @ManyToOne
    @ToString.Exclude
    private Country country; // FK : countryId

    @Column
    private String airportName; // 공항 이름 : nameAirport

    @Column
    private String airportIso; // 공항 ISO 코드 : codeIataAirport

}
