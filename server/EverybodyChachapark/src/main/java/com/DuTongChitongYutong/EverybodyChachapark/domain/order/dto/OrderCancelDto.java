package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class OrderCancelDto {

    private List<OrderProductCancelDto> orderProductCancelDtos;
}
