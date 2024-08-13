package com.lec.spring.member.schedule.repository;

import com.lec.spring.member.schedule.domain.Date;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DateRepository extends JpaRepository<Date, Long> {

    List<Date> findAllByScheduleId(Long schedule_id);

}
