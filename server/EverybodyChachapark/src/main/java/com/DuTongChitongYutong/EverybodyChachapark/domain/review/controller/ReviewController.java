package com.DuTongChitongYutong.EverybodyChachapark.domain.review.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReivewDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.MultiResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @PostMapping
    public ResponseEntity postReview(@RequestBody ReivewDto.Post requestBody) {
        // Todo: create
        // Todo: Stub Data --->
        URI uri = URI.create("/reviews/1");

//        return ResponseEntity.created(uri).build();
        return new ResponseEntity(new SingleResponseDto<>(
                new ReivewDto.Response(1L, requestBody.getMemberId(), requestBody.getContent(), requestBody.getScore())),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{review-Id}")
    public ResponseEntity patchReview() {
        // Todo: 리뷰 수정

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{product-Id}")
    public ResponseEntity getReviews(@PathVariable("product-Id") Long productId, @RequestParam int page, @RequestParam int size) {
        // Todo: Stub Data --->
        List<ReivewDto.Response> stubList = List.of(
                new ReivewDto.Response(1L, 1L, "First Stub 리뷰", 0),
                new ReivewDto.Response(2L, 1L, "second Stub 리뷰", 3),
                new ReivewDto.Response(3L, 3L, "Third Stub 리뷰", 5)
        );
        Page<ReivewDto.Response> responsePage = new PageImpl<>(stubList, PageRequest.of(page, size, Sort.by("reviewId")), stubList.size());
        List<ReivewDto.Response> responsesList = responsePage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(responsesList, responsePage), HttpStatus.OK);
    }

    @DeleteMapping("/{review-Id}")
    public ResponseEntity deleteReview() {
        // Todo: 리뷰 삭제

        return ResponseEntity.noContent().build();
    }
}
