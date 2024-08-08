package com.lec.spring.member.schedule.repository;

import com.lec.spring.member.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

}
