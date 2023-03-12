package com.DuTongChitongYutong.EverybodyChachapark.domain.review.mapper;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReviewDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    default Review reviewPostDtoToReview(ReviewDto.Post reviewPostDto) {
        Review review = new Review();

        review.setContent(reviewPostDto.getContent());
        review.setScore(reviewPostDto.getScore());

        Member member = new Member();
        member.setMemberId(reviewPostDto.getMemberId());
//        Product product = new Product();
//        product.setProductId(reviewPostDto.getProductId());

        review.setMembera(member);
//        review.setProduct(product);

        return review;
    }

    default Review reviewPatchDtoToReview(ReviewDto.Patch reviewPatchDto) {
        Review review = new Review();

        review.setContent(reviewPatchDto.getContent());
        review.setScore(reviewPatchDto.getScore());

        Member member = new Member();
        member.setMemberId(reviewPatchDto.getMemberId());

        review.setMembera(member);

        return review;
    }

    @Mapping(source = "member.nickname", target = "reviewMember.nickname")
    @Mapping(source = "member.memberId", target = "reviewMember.memberId")
    ReviewDto.Response reviewToReviewResponseDto(Review review);

    List<ReviewDto.Response> reviewToReviewResponseDtos(List<Review> reviews);
}
