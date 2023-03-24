package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;



public class CartDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private long productId;
        @NotBlank
        @Range(min = 1)
        private int quantity;
    }

    @Getter
    @Setter
    public static class Patch {
        private int quantity;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long cartId;
        private long memberId;
        private long productId;
        private String productName;
        private String imageUrl;
        private BigDecimal price;
        private int quantity;
        private LocalDateTime createAt;
        private LocalDateTime modifiedAt;
    }
}
