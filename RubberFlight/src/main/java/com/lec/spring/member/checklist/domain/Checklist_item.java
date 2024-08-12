package com.lec.spring.member.checklist.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "FT_CHECKLIST_ITEM")
@ToString(exclude = "checklist")
public class Checklist_item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name")
    private String itemName;  // DTO의 필드와 일치해야 함

    private boolean checked;

    @ManyToOne
    @JoinColumn(name = "checklist_id", nullable = false)
    private Checklist checklist;
}

