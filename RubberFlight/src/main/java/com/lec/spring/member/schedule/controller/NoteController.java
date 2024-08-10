package com.lec.spring.member.schedule.controller;

import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.service.ScheduleService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.*;

@RequiredArgsConstructor
@RestController
public class NoteController {

    private final ScheduleService scheduleService;

    private List<String> notes = Collections.synchronizedList(new ArrayList<>());

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


    private final Set<UserSession> connectedUsers = new HashSet<>();

    @MessageMapping("/user/join/{id}")
    @SendTo("/topic/users/{id}")
    public UserSession join(@PathVariable Long id, @RequestBody UserSession userSession) {
        connectedUsers.add(userSession);
        return userSession;
    }

    @MessageMapping("/user/leave/{id}")
    @SendTo("/topic/users/{id}")
    public UserSession leave(@PathVariable Long id, @RequestBody UserSession userSession) {
        connectedUsers.remove(userSession);
        return userSession;
    }

    @Data
    public static class UserSession {
        private String username;
        private Long id;
    }

}