package com.lec.spring.member.schedule.controller;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.general.user.service.UserService;
import com.lec.spring.member.schedule.domain.JoinRequestDTO;
import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.service.ScheduleService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final ScheduleService scheduleService;
    private final UserService userService;
    private List<String> notes = Collections.synchronizedList(new ArrayList<>());
    private final JWTUtil jwtUtil;

    @CrossOrigin
    @MessageMapping("/title/{id}")
    @SendTo("/topic/title/{id}")
    public Schedule broadcastNotes(@RequestBody Schedule schedule) {
        scheduleService.update(schedule);
        return schedule;
    }

    @CrossOrigin
    @GetMapping("/title/{id}")
    public Schedule getTitle(@PathVariable Long id) {
        Schedule schedule = scheduleService.detail(id);
        return schedule;
    }


    private final Map<Long, Set<String>> activeUsersMap = new ConcurrentHashMap<>();

    @CrossOrigin
    @MessageMapping("/join/{id}")
    @SendTo("/topic/users/{id}")
    public Set<String> joinUser(@RequestBody JoinRequestDTO request) {
        Long scheduleId = request.getScheduleId();
        Long userId = request.getUserId();
        User enteredUser = userService.findById(userId);

        System.out.println(enteredUser.getUsername() + "님이 입장하셨습니다.");
        activeUsersMap.computeIfAbsent(scheduleId, k -> new ConcurrentSkipListSet<>()).add(enteredUser.getImage());
        Set<String> usersPics = activeUsersMap.get(scheduleId);

        return usersPics;
    }


    @CrossOrigin
    @MessageMapping("/leave/{id}")
    @SendTo("/topic/users/{id}")
    public Set<String> leaveUser(@RequestBody JoinRequestDTO request) {
        Long scheduleId = request.getScheduleId();
        Long userId = request.getUserId();
        User enteredUser = userService.findById(userId);

        System.out.println(enteredUser.getUsername() + "님이 나가셨습니다.");
        Set<String> usersPics = activeUsersMap.get(scheduleId);
        if (usersPics != null) {
            usersPics.remove(enteredUser.getImage());
            if (usersPics.isEmpty()) {
                activeUsersMap.remove(scheduleId);
            }
        }
        return usersPics;
    }
}