package com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ReviewDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        @Positive
        private Long productId;
        @NotBlank(message = "본문 입력은 필수 사항입니다.")
        private String content;
        @PositiveOrZero
        private int score;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long reviewId;
        private String content;
        private int score;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long reviewId;
        private String content;
        private int score;
        private String imageURL;

        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private ReviewMember reviewMember;

        @AllArgsConstructor
        @Getter
        public static class ReviewMember {
            private Long memberId;
            private String nickname;
            private String memberImageURL;

        }
    }
}
