package com.lec.spring.member.review.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.general.user.domain.User;
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

    @Column(nullable = false)
    private String title; // 제목

    @ColumnDefault(value = "0")
    private int seat_rate; // 좌석 점수

    @ColumnDefault(value = "0")
    private int service_rate; // 서비스 점수

    @ColumnDefault(value = "0")
    private int procedure_rate; // 체크인 및 탑승 점수

    @ColumnDefault(value = "0")
    private int flightmeal_rate; // 기내식 및 음료 점수

    @ColumnDefault(value = "0")
    private int lounge_rate; // 라운지 점수

    @ColumnDefault(value = "0")
    private int clean_rate; // 청결도 점수

    @Column(columnDefinition = "LONGTEXT")
    private String content; // 후기 내용

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime date; // 작성일
    @PrePersist
    private void prePersist(){
        this.date = LocalDateTime.now();
    }

//    @OneToOne
//    private FlightInfo flightInfo; // 비행정보

    @ManyToOne(optional = false)
    @ToString.Exclude
    private Airline airline; // 항공사 이름

    @ManyToOne(optional = false)
    @ToString.Exclude
    private User user;   // 작성자 이름
}
