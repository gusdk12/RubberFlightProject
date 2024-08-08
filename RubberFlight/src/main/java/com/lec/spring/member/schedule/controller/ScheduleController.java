package com.lec.spring.member.schedule.controller;

import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.service.ScheduleService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final JWTUtil jwtUtil;

    @CrossOrigin // cross-origin 요청을 허용
    @GetMapping("/schedule/{user}")
    public ResponseEntity<?> findAllByUser(@PathVariable Long user){
        return new ResponseEntity<>(scheduleService.findAllByUser(user), HttpStatus.OK);
    }

    @CrossOrigin // cross-origin 요청을 허용
    @PostMapping("/schedule/{user}")
    public ResponseEntity<?> save(@PathVariable Long user, @RequestBody Schedule schedule, HttpServletRequest request){
        return new ResponseEntity<>(scheduleService.save(user, schedule), HttpStatus.CREATED); // 201
    }

    @CrossOrigin // cross-origin 요청을 허용
    @PutMapping("/schedule")
    public ResponseEntity<?> update(@RequestBody Schedule schedule){
        return new ResponseEntity<>(scheduleService.update(schedule), HttpStatus.OK);
    }

    @CrossOrigin // cross-origin 요청을 허용
    @DeleteMapping("/schedule/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(scheduleService.delete(id), HttpStatus.OK);
    }

}
