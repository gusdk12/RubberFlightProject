package com.lec.spring.general.user.controller;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.domain.UserJoinDTO;
import com.lec.spring.general.user.jwt.JWTUtil;
import com.lec.spring.general.user.jwt.U;
import com.lec.spring.general.user.service.FileService;
import com.lec.spring.general.user.service.UserService;
import com.lec.spring.member.checklist.domain.ChecklistDTO;
import com.lec.spring.member.checklist.domain.ChecklistItemDTO;
import com.lec.spring.member.checklist.service.ChecklistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://43.202.34.247:3001"})
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final FileService fileService;

    private final ChecklistService checklistService;

    private final JWTUtil jwtUtil;

    public UserController(UserService userService, FileService fileService, ChecklistService checklistService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.fileService = fileService;
        this.checklistService = checklistService;
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

        String filePath = "http://localhost:8282/uploads/user.png";
        String uploadDir = "uploads/";  // 파일을 저장할 디렉토리 경로

        // 파일 처리 로직
        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            try {
                Path path = Paths.get(uploadDir + fileName);
                Files.write(path, file.getBytes());
                filePath = "http://localhost:8282/uploads/" + fileName;

            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // 사용자 객체 생성 및 저장
        User user = User.builder()
                .username(username)
                .password(password)
                .name(name)
                .email(email)
                .tel(tel)
                .image(filePath)
                .build();

        user = userService.join(user);
        if (user == null) return new ResponseEntity<>("JOIN FAILED", HttpStatus.BAD_REQUEST);

        // 기본 체크리스트 주입

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

    @GetMapping("/{id}/info")
    public ResponseEntity<User> getUserInfo(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
