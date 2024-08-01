package com.lec.spring.member.review.service;

import com.lec.spring.general.review.domain.Airline;
import com.lec.spring.general.review.repository.AirlineRepository;

import com.lec.spring.member.review.domain.Review;
import com.lec.spring.member.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final AirlineRepository airlineRepository;

    // 모든 유저 목록 조회
    @Transactional(readOnly = true) // 변경사항 체크 X
    public List<Review> list() {
        return reviewRepository.findAll(Sort.by(Sort.Order.desc("id"))); // id 순으로 내림차순
    }

    // 해당 유저의 리뷰 목록 조회
    @Transactional(readOnly = true)
    public List<Review> userReviewList(Long user){
        return reviewRepository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<Review> airlineReviewList(Long airline) {
        return reviewRepository.findByAirline(airline);
    }

    // 리뷰 작성
    @Transactional
    public Review write(Review review) {

        Airline airline;
        // 항공사 존재하는지 확인
        if (!airlineRepository.existsByName(review.getFlightInfo().getAirlineName())) {
            airline = new Airline();
            airline.setName(review.getFlightInfo().getAirlineName());
            airlineRepository.save(airline);  // 새로운 항공사 저장
            System.out.println("항공사 이름 추가 :" + review.getFlightInfo().getAirlineName());
        } else {
            // 항공사 존재하면 해당 항공사 가져오기
            airline = airlineRepository.findByName(review.getFlightInfo().getAirlineName());
        }

        Long airlineId = airline.getId(); // Airline ID 가져오기
        if (airlineId != null) {
            review.setAirline(airlineId); // 리뷰에 항공사 ID 설정
        }
        return reviewRepository.save(review); // 리뷰 저장
    }

    // 리뷰 조회
    @Transactional
    public Review detail(Long id) {
        return reviewRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));
    }

    // 리뷰 수정
    @Transactional
    public Review update(Review review) {
        Review reviewEntity = reviewRepository.findById(review.getId()).orElseThrow(() -> new IllegalArgumentException("id를 확인해주세요"));

        reviewEntity.setClean_rate(review.getClean_rate()); // 청결 점수
        reviewEntity.setTitle(review.getTitle());   // 리뷰 제목
        reviewEntity.setService_rate(review.getService_rate()); // 서비스 점수
        reviewEntity.setFlightmeal_rate(review.getFlightmeal_rate()); // 기내식 및 음료 점수
        reviewEntity.setLounge_rate(review.getLounge_rate()); // 라운지 점수
        reviewEntity.setSeat_rate(review.getSeat_rate()); // 좌석 점수
        reviewEntity.setProcedure_rate(review.getProcedure_rate()); // 체크인 및 탑승 점수
        reviewEntity.setContent(review.getContent()); // 리뷰 내용

        return reviewEntity;
    }

    // 리뷰 삭제
    public int delete(Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return 1;
        } else {
            return 0;
        }
    }
}
