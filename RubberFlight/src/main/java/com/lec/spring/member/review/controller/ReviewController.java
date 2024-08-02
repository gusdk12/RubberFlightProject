package com.lec.spring.member.review.controller;

import com.lec.spring.member.review.domain.Review;
import com.lec.spring.member.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    // 해당 유저의 리뷰 목록
    @CrossOrigin
    @GetMapping("/member/review/list/{user}")
    public ResponseEntity<?> userReviewList(@PathVariable Long user) {
        return new ResponseEntity<>(reviewService.userReviewList(user), HttpStatus.OK);
    }

    // 리뷰 작성
    @CrossOrigin
    @PostMapping("/member/review/write")
    public ResponseEntity<?> write(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.write(review), HttpStatus.CREATED);
    }

    // 리뷰 내용 조회
    @CrossOrigin
    @GetMapping("/member/review/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.detail(id), HttpStatus.OK);
    }

    // 리뷰 수정
    @CrossOrigin
    @PutMapping("/member/review/update")
    public ResponseEntity<?> update(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.update(review), HttpStatus.OK);
    }

    // 리뷰 삭제
    @CrossOrigin
    @DeleteMapping("/member/review/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.delete(id), HttpStatus.OK);
    }

}
