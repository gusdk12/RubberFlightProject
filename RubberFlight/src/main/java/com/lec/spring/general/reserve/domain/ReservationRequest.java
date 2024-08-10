package com.lec.spring.general.reserve.domain;


import lombok.Data;

@Data
public class ReservationRequest {
    private String personnel;
    private boolean isRoundTrip;
    private Flight outboundFlight;
    private Flight inboundFlight;
}