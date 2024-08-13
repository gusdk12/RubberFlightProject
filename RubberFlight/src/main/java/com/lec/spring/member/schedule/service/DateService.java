package com.lec.spring.member.schedule.service;

import com.lec.spring.member.schedule.domain.Date;
import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.repository.DateRepository;
import com.lec.spring.member.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DateService {
    private final DateRepository dateRepository;
    private final ScheduleRepository scheduleRepository;

    public List<Date> findAllBySchedule(Long schedule_id){
        List<Date> allDates = dateRepository.findAllByScheduleId(schedule_id);
        allDates.sort(Comparator.comparing(Date::getDate));
        return allDates;
    }
    @Transactional // 내부적으로 종료될 때마다 체크하고 바뀐 부분이 있으면 UPDATE를 수행
    public Date save (Long scheduleId, Date date){
        Schedule sch = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요."));

        Date newDate = dateRepository.save(date);
        newDate.setSchedule(sch);

        return newDate;
    }

    @Transactional // 내부적으로 종료될 때마다 체크하고 바뀐 부분이 있으면 UPDATE를 수행
    public Date update (Date date){
        Date dateEntity = dateRepository.findById(date.getId())
                .orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요"));

        dateEntity.setDate(date.getDate());
        dateEntity.setContent(date.getContent());

        return dateEntity;
    }

    @Transactional
    public String delete(Long id){
        if(!isExist(id)) return "failed";

        dateRepository.deleteById(id);

        return "ok";
    }

    public boolean isExist(Long id){
        return dateRepository.existsById(id);
    }

}
