package com.lec.spring.general.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.member.checklist.domain.Checklist;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "FT_USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String tel;

    @Column(nullable = true)
    private String image;

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Coupon> coupons = new ArrayList<>(); ; // 사용자가 가진 쿠폰들

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Checklist> checklists = new ArrayList<>();

    private String provider;
    private String providerId;
}
