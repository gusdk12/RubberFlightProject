package com.lec.spring.admin.coupon.service;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.admin.coupon.repository.CouponRepository;
import com.lec.spring.general.reserve.domain.Flight;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CouponService {

    private final CouponRepository couponRepository;
    private final UserRepository userRepository;

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

    public List<Coupon> getCouponsByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<Coupon> coupons = user.getCoupons();
        System.out.println("Return coupons for userId " + userId + ": " + coupons);
        return coupons;
    }
}
