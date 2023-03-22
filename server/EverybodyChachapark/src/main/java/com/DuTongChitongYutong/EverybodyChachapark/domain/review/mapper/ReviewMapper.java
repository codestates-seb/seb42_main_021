package com.DuTongChitongYutong.EverybodyChachapark.domain.review.mapper;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReviewDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewDto.Post reviewPostDto);

    Review reviewPatchDtoToReview(ReviewDto.Patch reviewPatchDto);

    @Mapping(source = "member.nickname", target = "reviewMember.nickname")
    @Mapping(source = "member.memberId", target = "reviewMember.memberId")
    @Mapping(source = "member.profileImg", target = "reviewMember.memberImageURL")
    ReviewDto.Response reviewToReviewResponseDto(Review review);

    List<ReviewDto.Response> reviewToReviewResponseDtos(List<Review> reviews);
}
