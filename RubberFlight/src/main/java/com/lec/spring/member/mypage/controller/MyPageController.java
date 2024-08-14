package com.lec.spring.member.mypage.controller;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.domain.UserDTO;
import com.lec.spring.general.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mypage")
public class MyPageController {

    private final UserService userService;


    public MyPageController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
    }

    // 사용자 정보 업데이트 (비밀번호 포함)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @ModelAttribute UserDTO userDto,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        User user = userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        // 유니크 필드 중복 체크
        User existingUser = userService.findByUsername(userDto.getUsername());
        if (existingUser != null && !existingUser.getId().equals(id)) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        String filePath = userDto.getImage(); // 기존 파일 경로를 유지

        // 새로운 파일이 업로드된 경우 파일 경로를 업데이트
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            try {
                // 로컬 파일 시스템 경로
                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent()); // 경로가 존재하지 않으면 생성
                Files.write(path, file.getBytes());

                // 클라이언트가 접근할 수 있는 URL 생성
                filePath = "http://localhost:8282/uploads/" + fileName;
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 사용자 정보 업데이트
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setTel(userDto.getTel());
        user.setImage(filePath); // 업데이트된 파일 URL 저장

        User updatedUser = userService.save(user);
        if (updatedUser == null) {
            return new ResponseEntity<>("Update failed", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserInfo(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}