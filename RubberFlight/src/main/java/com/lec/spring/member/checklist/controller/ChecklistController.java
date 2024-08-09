package com.lec.spring.member.checklist.controller;

import com.lec.spring.member.checklist.domain.ChecklistDTO;
import com.lec.spring.member.checklist.domain.Checklist;
import com.lec.spring.member.checklist.domain.ChecklistItemDTO;
import com.lec.spring.member.checklist.domain.Checklist_item;
import com.lec.spring.member.checklist.service.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/checklist")
public class ChecklistController {

    @Autowired
    private ChecklistService checklistService;

    // 유저 아이디로 체크리스트 목록 불러오기
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChecklistDTO>> getChecklistsByUserId(@PathVariable Long userId) {
        List<ChecklistDTO> checklists = checklistService.getChecklistsByUserId(userId);
        if (checklists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(checklists);
    }

    // 체크리스트 생성하기
    @PostMapping("/create")
    public ResponseEntity<ChecklistDTO> createChecklist(@RequestBody ChecklistDTO checklistDTO) {
        ChecklistDTO createdChecklist = checklistService.createChecklist(checklistDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdChecklist);
    }

    // 체크리스트 상세 조회하기
    @GetMapping("/{id}")
    public ResponseEntity<ChecklistDTO> getChecklistById(@PathVariable Long id) {
        ChecklistDTO checklistDTO = checklistService.getChecklistById(id);
        if (checklistDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(checklistDTO);
    }

    // 체크리스트 수정하기
    @PutMapping("/{id}")
    public ResponseEntity<ChecklistDTO> updateChecklist(@PathVariable Long id, @RequestBody ChecklistDTO updatedChecklistDTO) {
        ChecklistDTO updatedChecklist = checklistService.updateChecklist(id, updatedChecklistDTO);
        if (updatedChecklist == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedChecklist);
    }

    // 체크리스트 삭제하기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChecklist(@PathVariable Long id) {
        checklistService.deleteChecklist(id);
        return ResponseEntity.noContent().build();
    }

    // 체크리스트 항목 추가하기
    @PostMapping("/items/create")
    public ResponseEntity<ChecklistItemDTO> createChecklistItem(@RequestBody ChecklistItemDTO itemDTO) {
        ChecklistItemDTO createdItem = checklistService.createChecklistItem(itemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }

    // 체크리스트 항목 조회하기
    @GetMapping("/items/{checklistId}")
    public ResponseEntity<List<ChecklistItemDTO>> getChecklistItemsByChecklistId(@PathVariable Long checklistId) {
        List<ChecklistItemDTO> items = checklistService.getChecklistItemsByChecklistId(checklistId);
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(items);
    }

    // 체크리스트 항목 수정하기
    @PutMapping("/items/{id}")
    public ResponseEntity<ChecklistItemDTO> updateChecklistItem(@PathVariable Long id, @RequestBody ChecklistItemDTO updatedItemDTO) {
        ChecklistItemDTO updatedItem = checklistService.updateChecklistItem(id, updatedItemDTO);
        if (updatedItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

    // 체크리스트 항목 삭제하기
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteChecklistItem(@PathVariable Long id) {
        checklistService.deleteChecklistItem(id);
        return ResponseEntity.noContent().build();
    }
}
