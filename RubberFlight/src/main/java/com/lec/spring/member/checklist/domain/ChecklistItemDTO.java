package com.lec.spring.member.checklist.domain;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChecklistItemDTO {
    private Long id;
    private String itemName;
    private Long checklistId;
}
