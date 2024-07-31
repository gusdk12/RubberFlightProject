package com.lec.spring.general.user.controller;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.domain.UserJoinDTO;
import com.lec.spring.general.user.service.UserService;
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

    @PostMapping("/join/user")
    public String join(@RequestBody UserJoinDTO joinDTO) {

        User user = User.builder()
                .username(joinDTO.getUsername())
                .password(joinDTO.getPassword())
                .name(joinDTO.getName())  // Set this field
                .email(joinDTO.getEmail())  // Set this field
                .tel(joinDTO.getTel())  // Set this field
                .image(joinDTO.getImage())
                .build();

        user = userService.join(user);
        if (user == null) return "JOIN FAILED";
        return "JOIN OK : " + user;
    }

    @PostMapping("/join/admin")
    public String Admin(@RequestBody UserJoinDTO joinDTO) {

        User user = User.builder()
                .username(joinDTO.getUsername())
                .password(joinDTO.getPassword())
                .build();
        user = userService.admin(user);
        if (user == null) return "JOIN FAILED";
        return "JOIN OK : " + user;
    }


}
