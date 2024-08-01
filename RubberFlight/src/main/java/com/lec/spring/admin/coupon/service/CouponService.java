package com.lec.spring.admin.coupon.service;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.admin.coupon.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public int delete(Long id) {
        couponRepository.deleteById(id);
        return 1;
    }
}
