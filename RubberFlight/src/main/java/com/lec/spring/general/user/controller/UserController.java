package com.lec.spring.general.user.controller;

import com.lec.spring.admin.coupon.domain.Coupon;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.domain.UserJoinDTO;
import com.lec.spring.general.user.jwt.JWTUtil;
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

@CrossOrigin(origins = "http://localhost:3000")
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

        // 파일 처리 로직
        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            try {
                Path path = Paths.get("/uploads/" + fileName);
                Files.write(path, file.getBytes());
                filePath = path.toString().replace("\\", "/");
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

        // 기본 체크리스트 생성
        ChecklistDTO checklistDTO = new ChecklistDTO();
        checklistDTO.setCategory("의류");
        checklistDTO.setUserId(user.getId());

        ChecklistItemDTO item1 = new ChecklistItemDTO();
        item1.setItemName("속옷");

        ChecklistItemDTO item2 = new ChecklistItemDTO();
        item2.setItemName("양말");

        ChecklistItemDTO item3 = new ChecklistItemDTO();
        item3.setItemName("긴팔");

        ChecklistItemDTO item4 = new ChecklistItemDTO();
        item4.setItemName("모자");

        checklistDTO.setItems(Arrays.asList(item1, item2, item3, item4));

        checklistService.createChecklist(checklistDTO);

        ChecklistDTO newCategoryChecklistDTO = new ChecklistDTO();
        newCategoryChecklistDTO.setCategory("상비약");  // 새로운 카테고리명
        newCategoryChecklistDTO.setUserId(user.getId());

        ChecklistItemDTO newCategoryItem1 = new ChecklistItemDTO();
        newCategoryItem1.setItemName("감기약");

        ChecklistItemDTO newCategoryItem2 = new ChecklistItemDTO();
        newCategoryItem2.setItemName("소화제");

        ChecklistItemDTO newCategoryItem3 = new ChecklistItemDTO();
        newCategoryItem3.setItemName("소염제");

        ChecklistItemDTO newCategoryItem4 = new ChecklistItemDTO();
        newCategoryItem4.setItemName("멀미약");

        // 새로운 카테고리 아이템 추가
        newCategoryChecklistDTO.setItems(Arrays.asList(newCategoryItem1, newCategoryItem2, newCategoryItem3, newCategoryItem4));
        // 상비약 카테고리 저장
        checklistService.createChecklist(newCategoryChecklistDTO);

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
