package com.lec.spring.general.reserve.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "ft_reservation")
@EntityListeners(AuditingEntityListener.class)
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String personnel;

    @Column(updatable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime reserveDate;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean isended = false;

    // ft_user:ft_reservation 1:N
    @ManyToOne
    @ToString.Exclude
    private User user;

    // ft_reservation:ft_flightinfo 랑 1:N
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id")
    @ToString.Exclude
    @Builder.Default
    @JsonIgnore
    private List<FlightInfo> flightInfoList = new ArrayList<>();

    public void addFlightInfo(FlightInfo... flightInfos){
        Collections.addAll(flightInfoList, flightInfos);
    }


}
