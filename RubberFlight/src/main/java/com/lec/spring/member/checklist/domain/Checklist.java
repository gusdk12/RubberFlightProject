package com.lec.spring.member.checklist.domain;

import com.lec.spring.general.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "FT_CHECKLIST_LIST")
@ToString(exclude = "items")
public class Checklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "checklist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Checklist_item> items = new ArrayList<>();

}
