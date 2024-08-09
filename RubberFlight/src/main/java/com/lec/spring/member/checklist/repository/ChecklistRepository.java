package com.lec.spring.member.checklist.repository;

import com.lec.spring.member.checklist.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    List<Checklist> findByUserId(Long user_Id);
}
