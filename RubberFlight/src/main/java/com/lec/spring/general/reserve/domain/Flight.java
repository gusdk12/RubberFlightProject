package com.lec.spring.general.reserve.domain;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
public class Flight {
    String depAirport;
    String arrAirport;
    String airlineIata;
    LocalDateTime depTime;
    LocalDateTime arrTime;
    int takeTime;
    int price;
    String airlineName;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public Flight(JsonNode jsonNode, String iataCode, String arrIataCode, String date, int price) {
        this.depAirport = iataCode;
        this.arrAirport = arrIataCode;

        this.airlineIata = jsonNode.path("airline").path("iataCode").asText(null);
        this.airlineName = jsonNode.path("airline").path("name").asText(null);

        // JSON에서 시간 정보 가져오기
        String depTimeStr = jsonNode.path("departure").path("scheduledTime").asText(null); // "HH:mm"
        String arrTimeStr = jsonNode.path("arrival").path("scheduledTime").asText(null); // "HH:mm"


        LocalDateTime depTime = LocalDateTime.parse(date + "T" + depTimeStr + ":00");
        LocalDateTime arrTime = LocalDateTime.parse(date + "T" + arrTimeStr + ":00");

        if (arrTime.isBefore(depTime)) {
            arrTime = arrTime.plusDays(1);
        }


        System.out.println("예상 출발 시간" + depTime);
        System.out.println("예상 도착 시간" + arrTime);

        this.depTime = depTime;
        this.arrTime = arrTime;

        Duration duration = Duration.between(depTime, arrTime);
        this.takeTime = (int) duration.toMinutes();


        this.price = price;
    }
}