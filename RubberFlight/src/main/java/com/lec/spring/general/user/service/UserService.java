package com.lec.spring.general.user.service;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
        return userRepository.save(user);
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
}
