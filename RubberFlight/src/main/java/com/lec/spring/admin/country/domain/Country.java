package com.lec.spring.admin.country.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer countryId; // 나라 id : countryId

    @Column
    private String countryIso; // 나라 ISO 코드 : codeIso2Country

    @Column
    private String countryName; // 나라 이름 : nameCountry


}
