package com.lec.spring.member.schedule.domain;

public class JoinRequestDTO {
    private Long scheduleId;
    private Long userId;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    public Long getScheduleId() {
        return scheduleId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }
}
