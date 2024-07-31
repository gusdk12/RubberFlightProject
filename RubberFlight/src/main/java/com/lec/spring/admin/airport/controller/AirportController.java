package com.lec.spring.admin.airport.controller;

import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/airport")
public class AirportController {

    public AirportController() {
        System.out.println("AirportController() 생성");
    }

//    @CrossOrigin
//    @GetMapping("/wirte")
}
