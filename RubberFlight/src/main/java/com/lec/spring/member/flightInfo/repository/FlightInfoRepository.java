package com.lec.spring.member.flightInfo.repository;

import com.lec.spring.member.flightInfo.domain.FlightInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightInfoRepository extends JpaRepository<FlightInfo, Long> {

    List<FlightInfo> findByReserveId(Long reserveId);

    // 해당 유저 예약정보 목록
    @Query(value = """
        SELECT f.id, f.depAirport, f.depIata, f.arrAirport, f.arrIata,
               f.price, f.flightIat, f.depSch, f.arrSch, f.airlineName, f.review_id,
               re.id AS reservation_id, u.id AS user_id
        FROM ft_flightInfo f
                 JOIN ft_review r ON f.review_id = r.id
                 JOIN ft_reservation re ON f.reservation_id = re.id
                 JOIN ft_user u ON re.user_id = u.id
        where u.id = :id
        ORDER BY re.id DESC
        """, nativeQuery = true)
    List<FlightInfo> findByUser(@Param("id") Long user);
}
