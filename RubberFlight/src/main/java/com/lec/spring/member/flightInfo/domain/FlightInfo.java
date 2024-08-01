package com.lec.spring.member.flightInfo.domain;

import com.lec.spring.general.reserve.domain.Reserve;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_flightinfo")
public class FlightInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reserve reserve;

    @Column(nullable = false)
    private String depAirport;

    @Column(nullable = false)
    private String depIata;

    @Column(nullable = false)
    private String arrAirport;

    @Column(nullable = false)
    private String arrIata;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String flightIat;

    @Column(nullable = false)
    private LocalDateTime depSch;

    @Column(nullable = false)
    private LocalDateTime arrSch;

    @Column(nullable = false)
    private String airlineName;


}
