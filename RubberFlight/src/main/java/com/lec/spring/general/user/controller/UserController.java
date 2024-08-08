package com.lec.spring.general.user.controller;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.domain.UserJoinDTO;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.general.user.service.FileService;
import com.lec.spring.general.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final FileService fileService;

    private final JWTUtil jwtUtil;

    public UserController(UserService userService, FileService fileService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.fileService = fileService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/join/user")
    public ResponseEntity<String> join(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("tel") String tel,
            @RequestParam("file") MultipartFile file) {

        String filePath = "uploads/user.png";

        // 파일 처리 (예: 저장, 검사 등)
        if (!file.isEmpty()) {
            // 파일을 저장하는 로직을 구현
            String fileName = file.getOriginalFilename();
            try {
                // 파일 저장 경로를 설정
                Path path = Paths.get("uploads/" + fileName);
                Files.write(path, file.getBytes());
                filePath = path.toString().replace("\\", "/");
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 사용자 객체 생성
        User user = User.builder()
                .username(username)
                .password(password)
                .name(name)
                .email(email)
                .tel(tel)
                .image(filePath) // 파일 경로를 저장
                .build();

        user = userService.join(user);
        if (user == null) return new ResponseEntity<>("JOIN FAILED", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("JOIN OK : " + user, HttpStatus.OK);
    }

    @PostMapping("/join/admin")
    public ResponseEntity<String> admin(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("tel") String tel,
            @RequestParam("file") MultipartFile file) {

        String filePath = "uploads/user.png";

        // 파일 처리 (예: 저장, 검사 등)
        if (!file.isEmpty()) {
            // 파일을 저장하는 로직을 구현
            String fileName = file.getOriginalFilename();
            try {
                // 파일 저장 경로를 설정
                Path path = Paths.get("uploads/" + fileName);
                Files.write(path, file.getBytes());
                filePath = path.toString().replace("\\", "/");
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 사용자 객체 생성
        User user = User.builder()
                .username(username)
                .password(password)
                .name(name)
                .email(email)
                .tel(tel)
                .image(filePath) // 파일 경로를 저장
                .build();

        user = userService.admin(user);
        if (user == null) return new ResponseEntity<>("JOIN FAILED", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("JOIN OK : " + user, HttpStatus.OK);
    }

    @PostMapping("/check-username")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        boolean exists = userService.existsByUsername(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    // 특정 사용자의 쿠폰 목록 조회
    @GetMapping("/{id}/coupons")
    public ResponseEntity<List<Coupon>> getUserCoupons(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return new ResponseEntity<>(user.getCoupons(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
