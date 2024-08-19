package com.lec.spring.general.user.service;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.checklist.service.ChecklistService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final ChecklistService checklistService;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ChecklistService checklistService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.checklistService = checklistService;
    }
    public User join(User user){
        String username = user.getUsername();
        String password = user.getPassword();


        if(userRepository.existsByUsername(username)){
            return null;  // 회원 가입 실패
        }


        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_MEMBER");  // 기본적으로 MEMBER

        User savedUser = userRepository.save(user);

        // 사용자 가입이 성공했으면 기본 체크리스트 생성
        checklistService.createDefaultChecklists(savedUser.getId());

        return savedUser;
    }

    public User admin(User user){
        String username = user.getUsername();
        String password = user.getPassword();

        if(userRepository.existsByUsername(username)){
            return null;  // 회원 가입 실패
        }

        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_ADMIN");
        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 새로운 비밀번호를 인코딩합니다.
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);

        userRepository.save(user); // 비밀번호 변경 사항 저장
    }

    @Transactional
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }


    public User findByUsername(String username){
        return userRepository.findByUsername(username.toUpperCase());
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public int register(User user){
        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);

        user.setRole("ROLE_MEMBER");
        userRepository.save(user);
        return 1;
    };
}
