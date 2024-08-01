package com.lec.spring.admin.country.repository;

import com.lec.spring.admin.country.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {

    Country findByCountryIso(String countryIso);
}
