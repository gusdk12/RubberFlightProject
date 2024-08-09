package com.lec.spring.member.review.controller;

import com.lec.spring.member.review.domain.Review;
import com.lec.spring.member.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰 정보 조회
    @CrossOrigin
    @GetMapping("/reviewlist/{user}")
    public ResponseEntity<?> reviewList(@PathVariable Long user) {
        return new ResponseEntity<>(reviewService.reviewList(user), HttpStatus.OK);
    }


    // 해당 유저의 리뷰 목록(최신순)
    @CrossOrigin
    @GetMapping("/list/{user}")
    public ResponseEntity<?> userReviewList(@PathVariable Long user,
                                            @RequestParam int page,
                                            @RequestParam int size) {
        return new ResponseEntity<>(reviewService.userReviewList(user, page, size), HttpStatus.OK);
    }

    // 해당 유저의 리뷰 목록(별점순)
    @CrossOrigin
    @GetMapping("/ratelist/{user}")
    public ResponseEntity<?> userReviewRateList(@PathVariable Long user,
                                            @RequestParam int page,
                                            @RequestParam int size) {
        return new ResponseEntity<>(reviewService.userReviewRateList(user, page, size), HttpStatus.OK);
    }

    // 리뷰 작성
    @CrossOrigin
    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.write(review), HttpStatus.CREATED);
    }

    // 리뷰 내용 조회
    @CrossOrigin
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.detail(id), HttpStatus.OK);
    }

    // 리뷰 수정
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.update(review), HttpStatus.OK);
    }

    // 리뷰 삭제
    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.delete(id), HttpStatus.OK);
    }

}
