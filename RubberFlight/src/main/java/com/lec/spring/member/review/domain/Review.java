package com.lec.spring.member.review.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
//@EqualsAndHashCode(callSuper = true)
@Entity(name = "ft_review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Pk

    @Column(nullable = false, name = "title")
    private String title; // 제목

    @Column(name = "seat_rate")
    @ColumnDefault(value = "0")
    private int seat_rate; // 좌석 점수

    @Column(name = "service_rate")
    @ColumnDefault(value = "0")
    private int service_rate; // 서비스 점수

    @Column(name = "procedure_rate")
    @ColumnDefault(value = "0")
    private int procedure_rate; // 체크인 및 탑승 점수

    @Column(name = "flightmeal_rate")
    @ColumnDefault(value = "0")
    private int flightmeal_rate; // 기내식 및 음료 점수

    @Column(name = "lounge_rate")
    @ColumnDefault(value = "0")
    private int lounge_rate; // 라운지 점수

    @Column(name = "clean_rate")
    @ColumnDefault(value = "0")
    private int clean_rate; // 청결도 점수

    @Column(columnDefinition = "LONGTEXT", name = "content")
    private String content; // 후기 내용

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime date; // 작성일
    @PrePersist
    private void prePersist(){
        this.date = LocalDateTime.now();
    }

    @OneToOne
    @JoinColumn(name = "flightinfo_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private FlightInfo flightInfo; // 비행정보

//    @Column(name = "flightinfo_id", nullable = false, unique = true)
//    private Long flightinfo;
//
//    @Column(name = "flightinfo_airlinename", nullable = false, unique = true)
//    private String airline_name;


//    private String airline_name; // 항공사 이름

    @Column(name = "airline_id")
    private Long airline;   // 어느 항공사의 리뷰 (FK)


}
