package com.lec.spring.member.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
//@EqualsAndHashCode(callSuper = true)
@Entity(name = "ft_schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Pk

    @OneToMany(mappedBy = "schedule")
    @JsonIgnore
    private Set<Participation> users;

    @Column(nullable = false)
    private String title;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime edit_date;

    @PrePersist
    private void prePersist(){
        this.edit_date = LocalDateTime.now();
    }

}
