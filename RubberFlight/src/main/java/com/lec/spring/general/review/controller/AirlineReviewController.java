package com.lec.spring.general.review.controller;

import com.lec.spring.general.review.service.AirlineService;
import com.lec.spring.member.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/airlinereview")
public class AirlineReviewController {

    private final ReviewService reviewService;
    private final AirlineService airlineService;

    // 모든 리뷰 목록 조회(최신순)
    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> list(@RequestParam int page,
                                  @RequestParam int size) {
        return new ResponseEntity<>(reviewService.list(page, size), HttpStatus.OK);
    }

    // 모든 리뷰 목록 조회(별점순)
    @CrossOrigin
    @GetMapping("/ratelist")
    public ResponseEntity<?> rateList(@RequestParam int page,
                                  @RequestParam int size) {
        return new ResponseEntity<>(reviewService.rateList(page, size), HttpStatus.OK);
    }

    // 항공사별 리뷰 목록 조회(최신순)
    @CrossOrigin
    @GetMapping("/list/{id}")
    public ResponseEntity<?> airlineList(@PathVariable Long id,
                                         @RequestParam int page,
                                         @RequestParam int size) {
        return new ResponseEntity<>(reviewService.airlineReviewList(id, page, size), HttpStatus.OK);
    }

    // 항공사별 리뷰 목록 조회(별점순)
    @CrossOrigin
    @GetMapping("/ratelist/{id}")
    public ResponseEntity<?> airlineRateList(@PathVariable Long id,
                                         @RequestParam int page,
                                         @RequestParam int size) {
        return new ResponseEntity<>(reviewService.airlineReviewRateList(id, page, size), HttpStatus.OK);
    }

    // 항공사 이름 목록
    @CrossOrigin
    @GetMapping("/namelist")
    public ResponseEntity<?> nameList(){
        return new ResponseEntity<>(airlineService.namelist(), HttpStatus.OK);
    }

}
