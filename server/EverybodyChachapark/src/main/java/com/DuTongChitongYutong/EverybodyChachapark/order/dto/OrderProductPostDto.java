package com.DuTongChitongYutong.EverybodyChachapark.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OrderProductPostDto {

    private long productId;

    private int price;

    private int quantity;
}
