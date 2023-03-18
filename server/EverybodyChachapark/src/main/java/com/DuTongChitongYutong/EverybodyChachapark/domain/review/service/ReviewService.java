package com.DuTongChitongYutong.EverybodyChachapark.domain.review.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.repository.ReviewRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class ReviewService {
    final private ReviewRepository reviewRepository;
    final private MemberService memberService;
    final private ProductService productService;
    final private FacadeImage facadeImage;

    public Review createReview(Review review, MultipartFile imageFile) {
        String imageURL = facadeImage.createImageURL(imageFile);
        review.setImageURL(imageURL);
        review.getMember().setMemberId(memberService.findByEmail().getMemberId());

        verifyReview(review); // 작성자, 상품 검증

        // Todo: ImageURL 생성 처리

        return reviewRepository.save(review);
    }

    public Review updateReview(Long reviewId, Review review, MultipartFile imageFile) {
        review.getMember().setMemberId(memberService.findByEmail().getMemberId());

        Review foundReview = findReview(reviewId);
        verifyReviewAskedMember(review, foundReview);

        Optional<Review> optionReview = Optional.of(review); // Update Request를 받은 필드 탐색. 방식: NullPoint Optional
        optionReview.map(Review::getContent).ifPresent(foundReview::setContent); // Update Request를 받은 필드가 NULL이 아닌것을 찾아 리포지토리에 가져온 Entity의 필드값 교체
        optionReview.map(Review::getScore).ifPresent(foundReview::setScore);

        if(!imageFile.isEmpty()) {
            String imageURL = foundReview.getImageURL();
            facadeImage.deleteImage(imageURL);

            imageURL = facadeImage.createImageURL(imageFile);
            foundReview.setImageURL(imageURL);
        }

        return foundReview;
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return findVerifiedReview(reviewId);
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviews(Long productId, int page, int size) {
        return reviewRepository.findPageByProduct_ProductId(productId, PageRequest.of(page-1, size, Sort.by("reviewId")));
    }

    public void deleteReview(Long reviewId) {
        Long memberId = memberService.findByEmail().getMemberId();

        Review foundReview = findReview(reviewId);
        verifyReviewAskedMember(memberId, foundReview);

        reviewRepository.delete(foundReview); // Hard Delete
    }

    private Review findVerifiedReview(Long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    private void verifyReview(Review review) {
        memberService.findMember(review.getMember().getMemberId());
        productService.readProduct(review.getProduct().getProductId());
    }

    private void verifyReviewAskedMember(Review review, Review foundReview) {
        if(!memberService.verifyAskedMember(review.getMember().getMemberId(), foundReview.getMember().getMemberId())){
            throw new BusinessLogicException(ExceptionCode.REVIEW_UPDATE_NO_PERMISSION);
        }
    }

    private void verifyReviewAskedMember(Long memberId, Review foundReview) {
        if(!memberService.verifyAskedMember(memberId, foundReview.getMember().getMemberId())){
            throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_PERMISSION);
        }
    }
}
