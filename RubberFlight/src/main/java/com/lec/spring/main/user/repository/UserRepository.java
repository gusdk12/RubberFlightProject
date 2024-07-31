package com.lec.spring.main.user.repository;

import com.lec.spring.main.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUsername(String username);

    User findByUsername(String username);

}
