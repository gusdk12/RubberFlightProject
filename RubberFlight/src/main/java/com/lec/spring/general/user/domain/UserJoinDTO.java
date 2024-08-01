package com.lec.spring.general.user.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class UserJoinDTO {
    private String username;
    private String password;
    private String name;
    private String email;
    private String tel;
    private MultipartFile image;
}
