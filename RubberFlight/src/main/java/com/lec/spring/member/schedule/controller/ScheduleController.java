package com.lec.spring.member.schedule.controller;

import com.lec.spring.general.user.config.PrincipalDetails;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.general.user.service.UserService;
import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.service.ScheduleService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final UserService userService;
    private final JWTUtil jwtUtil;

    @CrossOrigin // cross-origin 요청을 허용
    @GetMapping("/schedule")
    public ResponseEntity<?> findAllByUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        return new ResponseEntity<>(scheduleService.findAllByUser(userId), HttpStatus.OK);
    }

    @CrossOrigin // cross-origin 요청을 허용
    @GetMapping("/schedule/team/{scheduleId}")
    public ResponseEntity<?> findAllTeamUser(@PathVariable Long scheduleId){
        return new ResponseEntity<>(scheduleService.findAllBySchedule(scheduleId), HttpStatus.OK);
    }

    @CrossOrigin // cross-origin 요청을 허용
    @PostMapping("/schedule/team/{scheduleId}/{userName}")
    public ResponseEntity<?> inviteUserToSchedule(@PathVariable Long scheduleId, @PathVariable String userName){
        User user = userService.findByUsername(userName);
        return new ResponseEntity<>(scheduleService.participateUser(user.getId(), scheduleId), HttpStatus.OK);
    }

    @CrossOrigin // cross-origin 요청을 허용
    @PostMapping("/schedule")
    public ResponseEntity<?> save(@RequestBody Schedule schedule, HttpServletRequest request){
        String token = request.getHeader("Authorization").split(" ")[1];
        Long userId = jwtUtil.getId(token);

        return new ResponseEntity<>(scheduleService.save(userId, schedule), HttpStatus.CREATED); // 201
    }

    @CrossOrigin
    @GetMapping("/schedule/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        return new ResponseEntity<>(scheduleService.detail(id), HttpStatus.OK);
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
