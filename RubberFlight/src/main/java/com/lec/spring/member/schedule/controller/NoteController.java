package com.lec.spring.member.schedule.controller;

import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

}