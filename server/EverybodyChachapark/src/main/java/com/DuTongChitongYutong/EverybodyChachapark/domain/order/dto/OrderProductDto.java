package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderpProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class OrderProductDto {

    private long productId;

    private String productName;

    private int price;

    private OrderpProductStatus orderpProductStatus;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
