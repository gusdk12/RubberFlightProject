package com.lec.spring.member.review.domain;

import lombok.Getter;
import lombok.Setter;


public class ReviewDTO {
    private Long id; // Pk
    private String title; // 제목
    private int seat_rate; //
    private int service_rate; // 서비스 점수
    private int procedure_rate; // 체크인 및 탑승 점수
    private int flightmeal_rate; // 기내식 및 음료 점수
    private int lounge_rate; // 라운지 점수
    private int clean_rate; // 청결도 점수
    private String content; // 후기 내용

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getSeat_rate() {
        return seat_rate;
    }

    public void setSeat_rate(int seat_rate) {
        this.seat_rate = seat_rate;
    }

    public int getService_rate() {
        return service_rate;
    }

    public void setService_rate(int service_rate) {
        this.service_rate = service_rate;
    }

    public int getProcedure_rate() {
        return procedure_rate;
    }

    public void setProcedure_rate(int procedure_rate) {
        this.procedure_rate = procedure_rate;
    }

    public int getFlightmeal_rate() {
        return flightmeal_rate;
    }

    public void setFlightmeal_rate(int flightmeal_rate) {
        this.flightmeal_rate = flightmeal_rate;
    }

    public int getLounge_rate() {
        return lounge_rate;
    }

    public void setLounge_rate(int lounge_rate) {
        this.lounge_rate = lounge_rate;
    }

    public int getClean_rate() {
        return clean_rate;
    }

    public void setClean_rate(int clean_rate) {
        this.clean_rate = clean_rate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
