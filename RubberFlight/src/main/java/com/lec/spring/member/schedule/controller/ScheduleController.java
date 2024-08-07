package com.lec.spring.member.schedule.controller;

import com.lec.spring.member.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;

    @CrossOrigin // cross-origin 요청을 허용
    @GetMapping("/schedule/{user}")
    public ResponseEntity<?> findAllByUser(@PathVariable Long user){
        return new ResponseEntity<>(scheduleService.findAllByUser(user), HttpStatus.OK);
    }

}
