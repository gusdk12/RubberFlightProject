package com.lec.spring.general.review.controller;

import com.lec.spring.member.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AirlineReviewController {

    private final ReviewService reviewService;

    @CrossOrigin
    @GetMapping("/general/review/list")
    public ResponseEntity<?> list(@RequestParam int page,
                                  @RequestParam int size) {
        return new ResponseEntity<>(reviewService.list(page, size), HttpStatus.OK);
    }

    // 항공사별 리뷰 목록 조회
    @CrossOrigin
    @GetMapping("/general/review/list/{id}")
    public ResponseEntity<?> airlineList(@PathVariable Long id,
                                         @RequestParam int page,
                                         @RequestParam int size) {
        return new ResponseEntity<>(reviewService.airlineReviewList(id, page, size), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("general/review/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.detail(id), HttpStatus.OK);
    }
}
