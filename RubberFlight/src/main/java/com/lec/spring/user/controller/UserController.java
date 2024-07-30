package com.lec.spring.user.controller;

import com.lec.spring.user.domain.User;
import com.lec.spring.user.domain.UserJoinDTO;
import com.lec.spring.user.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public String join(@RequestBody UserJoinDTO joinDTO) {

        User user = User.builder()
                .username(joinDTO.getUsername())
                .password(joinDTO.getPassword())
                .build();
        user = userService.join(user);
        if (user == null) return "JOIN FAILED";
        return "JOIN OK : " + user;
    }


}
