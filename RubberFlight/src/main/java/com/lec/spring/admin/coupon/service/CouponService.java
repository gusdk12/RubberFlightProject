package com.lec.spring.admin.coupon.service;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.admin.coupon.repository.CouponRepository;
import com.lec.spring.general.reserve.domain.Flight;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CouponService {

    private final CouponRepository couponRepository;

    @Transactional
    public Coupon save(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Transactional(readOnly = true)
    public List<Coupon> findAll() {
        return couponRepository.findAllByOrderByIdDesc();
    }

    @Transactional
    public Coupon findByCode(String couponCode) {
        return couponRepository.findByCode(couponCode);
    }

    @Transactional
    public int delete(Long id) {
        couponRepository.deleteById(id);
        return 1;
    }

    public List<String> getAirlineName(List<Flight> flights) {
        return flights.stream()
                .map(Flight::getAirlineName)
                .distinct()
                .collect(Collectors.toList());
    }
}
