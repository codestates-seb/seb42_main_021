package com.DuTongChitongYutong.EverybodyChachapark.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderProductCancelDto {

    private long productId;

    private int quantity;
}
