package com.DuTongChitongYutong.EverybodyChachapark.domain.review.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.repository.ReviewRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
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
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

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
        String imageURL = facadeImage. createImageURL(imageFile);
        review.setImageURL(imageURL);

        Member member = memberService.findByEmail();

        review.setMemberId(member.getMemberId());
        verifyReview(review); // 작성자, 상품 검증

        // Todo: ImageURL 생성 처리
        review = reviewRepository.save(review);
        review.setMember(member);

        return review;
    }

    public Review updateReview(Long reviewId, Review review, MultipartFile imageFile) {
        Member member = memberService.findByEmail();
        review.setMemberId(member.getMemberId());

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

        foundReview.setMember(member);

        return foundReview;
    }

    @Transactional(readOnly = true)
    public Review findReview(Long reviewId) {
        return findVerifiedReview(reviewId);
    }

    @Transactional(readOnly = true)
    public Page<Review> findReviews(Long productId, int page, int size) {
        Page<Review> reviewPage = reviewRepository.findPageByProductId(productId, PageRequest.of(page, size, Sort.by("reviewId"))); // Review Entity를 가져옴
        List<Review> reviews = reviewPage.getContent(); // Review List
        Set<Long> memberIds = reviews.stream().map(Review::getMemberId).collect(Collectors.toSet()); // MemberId Set

        Map<Long, Member> members = memberService.getVerifiedMembers(memberIds).stream().collect(Collectors.toMap(Member::getMemberId, Function.identity())); // SELECT 결과 가져옴

        reviews = reviews.stream().map(review -> { // Review Entity에 Member 객체 매핑
            review.setMember(members.get(review.getMemberId()));
            return review;
        }).collect(Collectors.toList());

        return new PageImpl<>(reviews, PageRequest.of(page, size, Sort.by("reviewId")), reviews.size()); // mapping된 Review Entity를 Page로 다시 변환
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
        memberService.findVerifiedMember(review.getMemberId());
        productService.readProduct(review.getProductId());
    }

    private void verifyReviewAskedMember(Review review, Review foundReview) {
        if(!memberService.verifyAskedMember(review.getMemberId(), foundReview.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.REVIEW_UPDATE_NO_PERMISSION);
        }
    }

    private void verifyReviewAskedMember(Long memberId, Review foundReview) {
        if(!memberService.verifyAskedMember(memberId, foundReview.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.REVIEW_DELETE_NO_PERMISSION);
        }
    }
}
