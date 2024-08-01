package com.lec.spring.admin.country.service;

import com.lec.spring.admin.country.domain.Country;
import com.lec.spring.admin.country.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

    @RequiredArgsConstructor
    @Service
    public class CountryService {
        private final CountryRepository countryRepository;

        // 나라 목록
        @Transactional
        public List<Country> list() {
            return countryRepository.findAll(Sort.by(Sort.Order.desc("id")));
        }

        // 나라 추가
        @Transactional
        public Country add(Country country) {
            return countryRepository.save(country);
        }

    // 나라 삭제
//    @Transactional
//    public int delete(String countryIso) {
//        Optional<Country> optionalCountry = countryRepository.findByCountryIso(countryIso);
//        if (optionalCountry.isPresent()) {
//            countryRepository.delete(optionalCountry.get());
//            return 1;
//        } else {
//            return 0;
//        }
//    }
}