package com.lec.spring.member.schedule.domain;

import com.lec.spring.general.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_participation")
public class Participation {

    @EmbeddedId
    private ParticipationKey id;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    private @MapsId("schedule_id")
    @JoinColumn(name = "schedule_id")
    Schedule schedule;

    public static ParticipationKey setParticipationKey(Long user_id, Long schedule_id) {
        ParticipationKey participationKey = new ParticipationKey();
        participationKey.setUser_id(user_id);
        participationKey.setSchedule_id(schedule_id);
        return participationKey;
    }
}

@Data
@Embeddable
class ParticipationKey implements Serializable {

    @Column(name = "user_id")
    Long user_id;

    @Column(name = "schedule_id")
    Long schedule_id;

}
