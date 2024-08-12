package com.lec.spring.admin.country.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.admin.airport.domain.Airport;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_id")
    private Integer countryId; // 나라 id : countryId

    @Column(unique = true, name = "country_iso")
    private String countryIso; // 나라 ISO 코드 : codeIso2Country

    @Column(name = "country_name")
    private String countryName; // 나라 이름 : nameCountry

    @OneToMany(mappedBy = "country", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private List<Airport> airports;
}
