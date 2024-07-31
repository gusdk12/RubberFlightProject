package com.lec.spring.main.user.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserJoinDTO {
    private String username;
    private String password;
    private String name;
    private String email;
    private String tel;
    private String image;
}
