package com.lec.spring.member.schedule.service;

import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public Schedule save(Schedule schedule){
        return scheduleRepository.save(schedule);
    }

    @Transactional
    public Schedule findById(Long id){
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요."));
    }

    public List<Schedule> findAllByUser(Long user){
        return scheduleRepository.findByUserId(user);
    }

}
