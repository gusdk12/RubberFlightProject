package com.lec.spring.general.user.service;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.checklist.service.ChecklistService;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
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

    public User join(User user) {
        String username = user.getUsername();
        if (userRepository.existsByUsername(username)) {
            return null;  // 회원 가입 실패
        }

        user.setUsername(username.toUpperCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_MEMBER");  // 기본적으로 MEMBER

        User savedUser = userRepository.save(user);

        // 사용자 가입이 성공했으면 기본 체크리스트 생성
        checklistService.createDefaultChecklists(savedUser.getId());

        return savedUser;
    }

    public User admin(User user) {
        String username = user.getUsername();
        if (userRepository.existsByUsername(username)) {
            return null;  // 회원 가입 실패
        }

        user.setUsername(username.toUpperCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_ADMIN");
        return userRepository.save(user);
    }

    @Transactional
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public User save(User user) {
        try {
            User existingUser = findById(user.getId());
            if (existingUser == null) {
                return null; // 사용자가 존재하지 않으면 null 반환
            }

            // 유니크 필드 검사 (단, 현재 사용자의 필드는 제외)
            User userWithSameUsername = userRepository.findByUsername(user.getUsername().toUpperCase());
            if (userWithSameUsername != null && !userWithSameUsername.getId().equals(user.getId())) {
                throw new DataIntegrityViolationException("Duplicate username");
            }

            // 비밀번호 암호화 (새로운 비밀번호가 입력된 경우에만)
            if (user.getPassword() != null && !user.getPassword().isEmpty() &&
                    !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            } else {
                user.setPassword(existingUser.getPassword()); // 기존 비밀번호 유지
            }

            // 사용자명 대문자로 설정
            user.setUsername(user.getUsername().toUpperCase());

            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();  // 예외 발생 시 로그 출력
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username.toUpperCase());
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username.toUpperCase());
    }

    public int register(User user) {
        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_MEMBER");
        userRepository.save(user);
        return 1;
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }


}
