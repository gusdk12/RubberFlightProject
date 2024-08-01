package com.lec.spring.general.reserve.domain;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Flight {
    String airlineIata;
    LocalDateTime depTime;
    LocalDateTime arrTime;
    int takeTime;
    int price;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public Flight(JsonNode jsonNode, String date) {
        this.airlineIata = jsonNode.path("airline").path("iataCode").asText(null);

        // JSON에서 시간 정보 가져오기
        String depTimeStr = jsonNode.path("departure").path("scheduledTime").asText(null); // "HH:mm"
        String arrTimeStr = jsonNode.path("arrival").path("scheduledTime").asText(null); // "HH:mm"

        LocalDateTime dateTime = LocalDateTime.parse(date, DATE_FORMATTER);

        this.depTime = dateTime.withHour(Integer.parseInt(depTimeStr.split(":")[0]))
                .withMinute(Integer.parseInt(depTimeStr.split(":")[1]));

        this.arrTime = dateTime.withHour(Integer.parseInt(arrTimeStr.split(":")[0]))
                .withMinute(Integer.parseInt(arrTimeStr.split(":")[1]));

        Duration duration = Duration.between(depTime, arrTime);
        this.takeTime = (int) duration.toMinutes();

//        this.price; // TODO
    }
}