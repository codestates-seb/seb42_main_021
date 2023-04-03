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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
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
    public ResponseEntity postReview(@Valid @RequestPart(name = "requestBody") ReviewDto.Post requestBody, @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) {
        Review review = reviewService.createReview(mapper.reviewPostDtoToReview(requestBody), imageFile);

        return new ResponseEntity(new SingleResponseDto<>(mapper.reviewToReviewResponseDto(review)), HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive Long reviewId, @Valid @RequestPart(name = "requestBody") ReviewDto.Patch requestBody, @RequestPart(name = "imageFile", required = false) MultipartFile imageFile) {
        Review review = reviewService.updateReview(reviewId, mapper.reviewPatchDtoToReview(requestBody), imageFile);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.reviewToReviewResponseDto(review)), HttpStatus.OK);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity getReviews(@PathVariable("product-id") @Positive Long productId, @PositiveOrZero @RequestParam int page, @PositiveOrZero @RequestParam int size) {
        Page<Review> reviewPage = reviewService.findReviews(productId, page, size);
        List<Review> reviews = reviewPage.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.reviewToReviewResponseDtos(reviews), reviewPage), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") @Positive Long reviewId) {
        reviewService.deleteReview(reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
