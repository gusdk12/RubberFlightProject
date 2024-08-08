package com.lec.spring.member.checklist.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChecklistDTO {
    private Long id;
    private String category;
    private Long userId;
    private List<ChecklistItemDTO> items;
}
