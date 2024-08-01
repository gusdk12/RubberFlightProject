package com.lec.spring.general.review.repository;

import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.member.review.domain.Review;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AirlineRepository extends JpaRepository<Airline, Long> {
    @Query(value = """
            SELECT * FROM ft_airline a
            JOIN ft_review r ON a.id = r.airline_id
            JOIN ft_flightinfo f ON r.flight_info_id = f.id
            WHERE a.name = :name
            """, nativeQuery = true)
    Airline findByName(@Param("name") String name);    // 항공사에 이름이 저장되어 있는지 확인

    boolean existsByName(String name);  // 이름 존재 여부 확인
}
