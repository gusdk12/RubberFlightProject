package com.lec.spring.member.checklist.repository;

import com.lec.spring.member.checklist.domain.Checklist_item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Checklist_itemRepository extends JpaRepository<Checklist_item, Long> {
    List<Checklist_item> findByChecklistId(Long checklist_id);

}
