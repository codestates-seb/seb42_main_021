package com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReviewDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private Long productId;
        private Long memberId;
        private Long imageId;
        private String content;
        private int score;
    }

    /* Todo: MultiPart로 Post
    @AllArgsConstructor
    @Getter
    public static class Post {
        private Long memberId;
        private Long productId;
        private String content;
        private int score;
    }*/

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private Long reviewId;
        private Long memberId;
        private Long imageId;
        private String content;
        private int score;
    }

    /* Todo: MultiPart로 Patch
    @AllArgsConstructor
    @Getter
    public static class Post {
        private Long reivewId;
        private Long memberId;
        private String content;
        private int score;
    }*/


    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long reviewId;
        private Long imageId; // response는 상관이 없음: image Controller가 관여하기 때문
        private String content;
        private int score;
        private ReivewMember answerMember;

        @AllArgsConstructor
        @Getter
        public static class ReivewMember {
            private Long memberId;
            private Long memberImgId; // response는 상관이 없음: image Controller가 관여하기 때문
            private String userName;

        }
    }
}
