package com.lec.spring.member.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lec.spring.general.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    // ft_user:ft_schedule 1:N
    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String team_usernames;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime edit_date;

    @PrePersist
    private void prePersist(){
        this.edit_date = LocalDateTime.now();
        this.team_usernames = user.getName();
    }

}
