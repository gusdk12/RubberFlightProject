package com.lec.spring.member.schedule.domain;

public class JoinRequestDTO {
    private Long scheduleId;
    private String userToken;
    public Long getScheduleId() {
        return scheduleId;
    }
    public String getUserToken() {return userToken;}

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
    public void setUserToken(String userToken) {this.userToken = userToken;}
}
