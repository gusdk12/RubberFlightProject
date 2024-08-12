package com.lec.spring.member.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.general.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
//@EqualsAndHashCode(callSuper = true)
@Entity(name = "ft_date")
public class Date {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Pk

    // ft_schedule:ft_date 1:N
    @ManyToOne
    @ToString.Exclude
    @JsonIgnore
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate date;

    private String content;
}
