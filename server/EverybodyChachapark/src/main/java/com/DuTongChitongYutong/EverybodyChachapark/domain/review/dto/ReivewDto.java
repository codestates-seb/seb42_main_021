package com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class ReivewDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        /* Todo
        *   1. 작성 식별자
        *   2. 상품 식별자
        *   3. 리뷰 내용
        *   4. 별점
        *   5. 첨부파일(이미지)? */
        private Long memberId;
        private Long productId;
        private String content;
        private int score;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        /* Todo
         *   1. 리뷰 식별자
         *   2. 작성 식별자
         *   3. 리뷰 내용
         *   4. 별점
         *   5. 첨부파일(이미지)? */
        private Long reviewId;
        private Long memberId;
        private String content;
        private int score;
    }
}
