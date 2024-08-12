package com.lec.spring.member.checklist.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChecklistItemDTO {
    private Long id;
    private String itemName;  // 엔티티의 필드 이름과 일치해야 함
    private boolean checked;
    private Long checklistId; // 체크리스트 ID
}
