package com.lec.spring.member.schedule.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class NoteController {

    private String currentContent = "";

    private List<String> notes = Collections.synchronizedList(new ArrayList<>());

    @CrossOrigin
    @MessageMapping("/notes")
    @SendTo("/topic/notes")
    public String broadcastNotes(String content) {
        currentContent = content;
        return currentContent;
    }

    @CrossOrigin
    @GetMapping("/notes")
    public String getNotes() {
        return currentContent;
    }

}