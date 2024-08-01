package com.lec.spring.member.review.repository;

import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.member.review.domain.Review;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(Long user, Sort sort);  // 해당 유저 리뷰 목록
    List<Review> findByAirline(Long airline, Sort sort);  // 해당 항공사 리뷰 목록
}


