package com.lec.spring.admin.coupon.repository;

import com.lec.spring.admin.coupon.domain.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long>  {

    List<Coupon> findAllByOrderByIdDesc();
}
