package com.lec.spring.member.review.repository;

import com.lec.spring.member.review.domain.Review;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
//    @Query(value = """
//    select r from ft_review join
//""")
//    List<Review> findByUser(Long user, Sort sort);
}


