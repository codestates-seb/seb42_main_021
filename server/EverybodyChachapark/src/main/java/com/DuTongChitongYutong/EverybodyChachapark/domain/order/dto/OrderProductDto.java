package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderProductDto {

    private Long productId;

    private int price;

    private int quantity;

}
