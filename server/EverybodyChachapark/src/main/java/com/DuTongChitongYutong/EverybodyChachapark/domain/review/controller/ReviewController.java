package com.DuTongChitongYutong.EverybodyChachapark.domain.review.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReviewDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.mapper.ReviewMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.service.ReviewService;
import com.DuTongChitongYutong.EverybodyChachapark.response.MultiResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.util.UriCreator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Validated
@AllArgsConstructor
@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final static String REVIEW_DEFAULT_URL = "/reviews";
    final private ReviewService reviewService;
    final private ReviewMapper mapper;

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewDto.Post requestBody) { // Todo: image 기능 구현 완료 후 Multipart 구현
        Review review = reviewService.createReview(mapper.reviewPostDtoToReview(requestBody));
        URI location = UriCreator.createUri(REVIEW_DEFAULT_URL, review.getReviewId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive Long reviewId, @Valid @RequestBody ReviewDto.Patch requestBody) { // Todo: image 기능 구현 완료 후 Multipart 구현
        Review review = reviewService.updateReview(reviewId, mapper.reviewPatchDtoToReview(requestBody));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.reviewToReviewResponseDto(review)), HttpStatus.OK);
    }

//    @GetMapping("/{product-id}")
//    public ResponseEntity getReviews(@PathVariable("product-id") @Positive Long productId, @Positive @RequestParam int page, @Positive @RequestParam int size) {
//        Page<Review> reviewPage = reviewService.findReviews(productId, page, size);
//        List<Review> reviews = reviewPage.getContent();
//
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.reviewToReviewResponseDtos(reviews), reviewPage), HttpStatus.OK);
//    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") @Positive Long reviewId, @Positive @RequestParam Long memberId) {
        reviewService.deleteReview(reviewId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

/*-------- Stub Network Test ---------*/

//    @PostMapping
//    public ResponseEntity postReview(@RequestBody ReviewDto.Post requestBody) {
//        // Todo: create
//        // Todo: Stub Data --->
//        URI uri = URI.create("/reviews/1");
//
//        return ResponseEntity.created(uri).build();
//    }
//
//    @PatchMapping("/{review-id}")
//    public ResponseEntity patchReview(@PathVariable("review-id") Long reviewId, @RequestBody ReviewDto.Patch requestBody) {
//        // Todo: Stub Data --->
//        ReviewDto.Response response =  new ReviewDto.Response(1L, 1L, "Stub 리뷰 수정합니다!", 2,
//                new ReviewDto.Response.ReivewMember(1L, 1L, "profileStubData1"));
//
//        return new ResponseEntity<>(new SingleResponseDto<>(response, "리뷰 수정이 완료했습니다", HttpStatus.OK, null), HttpStatus.OK);
//    }
//
//    @GetMapping("/{product-id}")
//    public ResponseEntity getReviews(@PathVariable("product-id") Long productId, @RequestParam int page, @RequestParam int size) {
//        // Todo: Stub Data --->
//        List<ReviewDto.Response> stubList = List.of(
//                new ReviewDto.Response(1L, 1L, "First Stub 리뷰", 0, new ReviewDto.Response.ReivewMember(1L, 1L, "profileStubData1")),
//                new ReviewDto.Response(2L, 1L, "second Stub 리뷰", 3, new ReviewDto.Response.ReivewMember(2L, 2L, "profileStubData1")),
//                new ReviewDto.Response(3L, 3L, "Third Stub 리뷰", 5, new ReviewDto.Response.ReivewMember(3L, 3L, "profileStubData1"))
//        );
//        Page<ReviewDto.Response> responsePage = new PageImpl<>(stubList, PageRequest.of(page-1, size, Sort.by("reviewId")), stubList.size());
//        List<ReviewDto.Response> responsesList = responsePage.getContent();
//
//        return new ResponseEntity<>(new MultiResponseDto<>(responsesList, responsePage, "리뷰 조회 완료했습니다", HttpStatus.OK, null), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{review-id}")
//    public ResponseEntity deleteReview(@PathVariable("review-id") Long reviewId, @Positive @RequestParam Long memberId) {
//        // Todo: 리뷰 삭제
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }



}
