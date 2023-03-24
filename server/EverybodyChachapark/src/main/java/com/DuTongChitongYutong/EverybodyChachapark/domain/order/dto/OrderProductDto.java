package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class OrderProductDto {

    private Long productId;

    private String productName;

    private BigDecimal price;

    private int quantity;

}
