package com.lec.spring.admin.coupon.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lec.spring.general.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "FT_COUPON")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id; // 쿠폰 아이디

    @Column(nullable = false, columnDefinition = "VARCHAR(70)")
    private String code; // 쿠폰 코드

    @Column(nullable = false)
    private Long percent; // 쿠폰 할인 퍼센트

    @Column(nullable = false)
    private String description; // 쿠폰 설명

    @Column(nullable = false)
    @ColumnDefault("'All'")
    private String airline_name; // 쿠폰이 적용될 수 있는 항공사 이름

    @ManyToMany(mappedBy = "coupons", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<User> users = new ArrayList<>();

}
