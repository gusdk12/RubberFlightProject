package com.lec.spring.member.review.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewDTO {
    private Long id; // Pk
    private String title; // 제목
    private int seat_rate; // 좌석 점수
    private int service_rate; // 서비스 점수
    private int procedure_rate; // 체크인 및 탑승 점수
    private int flightmeal_rate; // 기내식 및 음료 점수
    private int lounge_rate; // 라운지 점수
    private int clean_rate; // 청결도 점수
    private String content; // 후기 내용

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime date; // 작성일
}
