package com.lec.spring.member.schedule.service;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.schedule.domain.Participation;
import com.lec.spring.member.schedule.domain.Schedule;
import com.lec.spring.member.schedule.repository.ParticipationRepository;
import com.lec.spring.member.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.lec.spring.member.schedule.domain.Participation.setParticipationKey;

@RequiredArgsConstructor
@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ParticipationRepository participationRepository;
    private final UserRepository userRepository;

    @Transactional
    public Schedule save(Long userId, Schedule schedule){
        Schedule newSchedule = scheduleRepository.save(schedule);

        participateUser(userId, newSchedule.getId());

        return newSchedule;
    }

    @Transactional
    public Schedule findById(Long id){
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요."));
    }

    public List<Schedule> findAllByUser(Long user){
        List<Schedule> allSchedules = participationRepository.findAllByUserId(user)
                .stream().map(part -> part.getSchedule()).collect(Collectors.toList());

        allSchedules.sort(Comparator.comparing(Schedule::getEdit_date).reversed());
        return allSchedules;
    }

    public List<User> findAllBySchedule(Long schedule){
        List<User> users = participationRepository.findAllByScheduleId(schedule)
                .stream().map(part -> part.getUser()).collect(Collectors.toList());

        return users;
    }

    public boolean isExist(Long id){
        return scheduleRepository.existsById(id);
    }

    @Transactional
    public String participateUser(Long user, Long schedule){
        if(!userRepository.existsById(user))
            return "failed";
        if(!isExist(schedule))
            return "failed";

        Participation participationEntity = Participation.builder()
                .id(setParticipationKey(user, schedule))
                .user(userRepository.findById(user)
                    .orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요.")))
                .schedule(findById(schedule))
                .build();

        participationRepository.save(participationEntity);

        return "ok";
    }

    @Transactional // 내부적으로 종료될 때마다 체크하고 바뀐 부분이 있으면 UPDATE를 수행
    public Schedule update (Schedule schedule){
        Schedule scheduleEntity = scheduleRepository.findById(schedule.getId())
                .orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요"));

        scheduleEntity.setTitle(schedule.getTitle());
        scheduleEntity.setEdit_date(LocalDateTime.now());

        return scheduleEntity;
    }

    @Transactional // 내부적으로 종료될 때마다 체크하고 바뀐 부분이 있으면 UPDATE를 수행
    public Schedule updateEditDate (Long schedule_id){
        Schedule scheduleEntity = scheduleRepository.findById(schedule_id)
                .orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요"));

        scheduleEntity.setEdit_date(LocalDateTime.now());

        return scheduleEntity;
    }

    @Transactional
    public String delete(Long id){
        if(!isExist(id)) return "failed";

        participationRepository.deleteAllByScheduleId(id);
        scheduleRepository.deleteById(id);

        return "ok";
    }

    @Transactional
    public Schedule detail(Long id) {
        return scheduleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));
    }
}
