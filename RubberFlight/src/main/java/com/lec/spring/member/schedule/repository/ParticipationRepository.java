package com.lec.spring.member.schedule.repository;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.member.schedule.domain.Participation;
import com.lec.spring.member.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    int deleteAllByScheduleId(Long schedule);
    List<Participation> findAllByUserId(Long user);
    List<Participation> findAllByScheduleId(Long schedule);

}
