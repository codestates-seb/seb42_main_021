package com.DuTongChitongYutong.EverybodyChachapark.domain.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class CartDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private long productId;
        private int quantity;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long cartId;
        private long memberId;
        private long productId;
        private String productName;
        private Integer price;
        private int quantity;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }
}
