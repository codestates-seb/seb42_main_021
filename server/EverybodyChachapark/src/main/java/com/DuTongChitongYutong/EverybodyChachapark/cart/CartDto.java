package com.DuTongChitongYutong.EverybodyChachapark.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class CartDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private String title;
        private String content;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private long boardId;
        private String title;
        private String content;
    }
}
