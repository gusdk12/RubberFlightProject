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
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mypage")
public class MyPageController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;


    public MyPageController(UserService userService, PasswordEncoder passwordEncoder, PasswordEncoder passwordEncoder1) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder1;
    }

    // 사용자 정보 업데이트 (비밀번호 포함)
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("tel") String tel,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        User user = userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        String filePath = user.getImage(); // 기존 파일 경로를 유지

        // 새로운 파일이 업로드된 경우 파일 경로를 업데이트
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            try {
                Path path = Paths.get("uploads/" + fileName);
                Files.write(path, file.getBytes());
                filePath = "http://localhost:8282/" + path;
            } catch (IOException e) {
                e.printStackTrace();
                Map<String, String> response = new HashMap<>();
                response.put("message", "File upload failed");
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 사용자 정보 업데이트
        user.setName(name);
        user.setEmail(email);
        user.setTel(tel);
        user.setImage(filePath); // 업데이트된 파일 경로 저장

        User updatedUser = userService.save(user);
        if (updatedUser == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Update failed");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "User updated successfully");
        response.put("user", updatedUser.toString());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {

        String newPassword = requestBody.get("newPassword");

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return new ResponseEntity<>("New password is required", HttpStatus.BAD_REQUEST);
        }

        try {
            userService.changePassword(id, newPassword);
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }




    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}