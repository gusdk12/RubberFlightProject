package com.lec.spring.admin.coupon.controller;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.admin.coupon.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/coupon")
public class CouponController {

    private final CouponService couponService;

    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(couponService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody Coupon coupon){
        return new ResponseEntity<>(couponService.save(coupon), HttpStatus.CREATED);   // 201
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(couponService.delete(id), HttpStatus.OK);
    }

}
