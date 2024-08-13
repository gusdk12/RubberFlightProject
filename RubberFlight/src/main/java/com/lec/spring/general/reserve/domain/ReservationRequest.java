package com.lec.spring.general.reserve.domain;


import com.lec.spring.admin.coupon.domain.Coupon;
import lombok.Data;

import java.util.Optional;

@Data
public class ReservationRequest {
    private String personnel;
    private boolean isRoundTrip;
    private Flight outboundFlight;
    private Optional<Flight> inboundFlight = Optional.empty();
    private Long couponId;
}