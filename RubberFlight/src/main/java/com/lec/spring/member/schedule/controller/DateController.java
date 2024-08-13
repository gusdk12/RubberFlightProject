package com.lec.spring.member.schedule.controller;

import com.lec.spring.member.schedule.service.DateService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class DateController {
    private final DateService dateService;

//    @CrossOrigin // cross-origin 요청을 허용
//    @GetMapping("/date/{scheduleId}")
//    public ResponseEntity<?> findAllBySchedule(@PathVariable Long scheduleId) {
//        return new ResponseEntity<>(dateService.findAllBySchedule(scheduleId), HttpStatus.OK);
//    }

}
