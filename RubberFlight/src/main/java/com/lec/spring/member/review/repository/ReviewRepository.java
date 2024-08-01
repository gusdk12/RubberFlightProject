package com.lec.spring.member.review.repository;

import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.member.review.domain.Review;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = """
            SELECT * FROM ft_review r
            JOIN ft_airline a ON r.airline_id = a.id
            JOIN ft_flightinfo f ON r.id = f.review_id
            JOIN ft_reservation re ON f.reservation_id = re.id
            JOIN ft_user u ON re.user_id = u.id
            where u.id = :id
            ORDER BY r.id DESC
                """, nativeQuery = true)
    List<Review> findByUser(@Param("id") Long user);  // 해당 유저 리뷰 목록

    @Query(value = """
            SELECT * FROM ft_review r
            JOIN ft_airline a ON r.airline_id = a.id
            JOIN ft_flightinfo f ON r.id = f.review_id
            JOIN ft_reservation re ON f.reservation_id = re.id
            JOIN ft_user u ON re.user_id = u.id
            where r.user_id = :id
            ORDER BY r.id DESC
                """, nativeQuery = true)
    List<Review> findByAirline(@Param("id") Long airline);  // 해당 항공사 리뷰 목록
}


