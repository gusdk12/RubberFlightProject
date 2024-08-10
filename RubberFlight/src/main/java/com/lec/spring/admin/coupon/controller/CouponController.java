package com.lec.spring.admin.coupon.controller;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.admin.coupon.service.CouponService;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.general.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/coupon")
public class CouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final JWTUtil jwtUtil;

    /* 관리자 */
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

    /* 사용자 */
    // 사용자 쿠폰 목록 확인
    @CrossOrigin
    @GetMapping("/user/coupons")
    public ResponseEntity<?> getCoupons(HttpServletRequest request) {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        List<Coupon> coupons = user.getCoupons();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }

    // 사용자 쿠폰 추가
    @CrossOrigin
    @PostMapping("/user/add/{couponCode}")
    public ResponseEntity<?> addCoupon(@PathVariable String couponCode, HttpServletRequest request) {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        User user = userService.findById(userId);
        if (user == null) {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        Coupon coupon = couponService.findByCode(couponCode);
        if (coupon != null) {
            user.getCoupons().add(coupon);
            userService.save(user);
            return new ResponseEntity<>(coupon, HttpStatus.OK);
        }
        return new ResponseEntity<>("쿠폰 코드가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
    }


    // 사용자 쿠폰 사용
    @CrossOrigin
    @PostMapping("/user/use/{couponCode}")
    public ResponseEntity<?> useCoupon(@PathVariable String couponCode, HttpServletRequest request) {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        Coupon coupon = couponService.findByCode(couponCode);
        if (coupon != null) {
            User user = userService.findById(userId);
            if (user.getCoupons().contains(coupon)) {
                user.getCoupons().remove(coupon);
                userService.save(user);

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("사용자가 소유하지 않은 쿠폰입니다.", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("쿠폰 코드가 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
    }
}
