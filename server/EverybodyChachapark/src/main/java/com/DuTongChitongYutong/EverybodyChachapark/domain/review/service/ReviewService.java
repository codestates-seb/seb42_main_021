package com.DuTongChitongYutong.EverybodyChachapark.domain.review.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.repository.ReviewRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ReviewService {
    final private ReviewRepository reviewRepository;
    final private MemberService memberService;

//    final private ProductService productService;

    public Review createReview(Review review) {
        verifyReview(review); // 작성자, 상품 검증

        // Todo: ImageURL 생성 처리

        return reviewRepository.save(review);
    }

    public Review updateReview(Long reviewId, Review review) {
        // Todo: 작성자 검증 Request: memberId

        Review foundReview = findReview(reviewId);
        Optional<Review> optionReview = Optional.ofNullable(review); // Update Request를 받은 필드 탐색. 방식: NullPoint Optional
        optionReview.map(Review::getContent).ifPresent(foundReview::setContent); // Update Request를 받은 필드가 NULL이 아닌것을 찾아 리포지토리에 가져온 Entity의 필드값 교체
        optionReview.map(Review::getScore).ifPresent(foundReview::setScore);

        /* Todo: 이미지 변경 요청
        *   1. Patch의 Multipart가 NULL인지 확인
        *   NULL -> Pass
        *   NotNULL -> 이미지 저장 및 URL 생성 -> imageURL 필드값 교체 */


        return foundReview;
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return findVerifiedReview(reviewId);
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviews(Long productId, int page, int size) {
        List<Review> reviews = reviewRepository.findByProduct_ProductId(productId);
        return new PageImpl<>(reviews, PageRequest.of(page, size, Sort.by("reviewId")), reviews.size()); // 등록순으로
    }

    public void deleteReview(Long reviewId, Long memberId) {
        // Todo: 작성자 검증 Request: memberId

        Review foundReview = findReview(reviewId);
        reviewRepository.delete(foundReview); // Hard Delete
    }

    private Review findVerifiedReview(Long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    private void verifyReview(Review review) {
//        memberService.findMember(review.getMember().getMemberId());
//        productService.readProduct(review.getProduct().getProductId());
    }
}
