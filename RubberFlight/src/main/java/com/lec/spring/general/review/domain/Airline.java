package com.lec.spring.general.review.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.spring.member.review.domain.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@Entity(name = "ft_airline")
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    @Column(unique = true, nullable = false)
    private String name; // 항공사 이름

    @OneToMany
    @JoinColumn(name = "airline_id")
    @ToString.Exclude
    @Builder.Default  // builder 제공안함
    @JsonIgnore
    private List<Review> reviewList = new ArrayList<>();

    public void addReview(Review... reviews){
        Collections.addAll(reviewList, reviews);
    }
}

