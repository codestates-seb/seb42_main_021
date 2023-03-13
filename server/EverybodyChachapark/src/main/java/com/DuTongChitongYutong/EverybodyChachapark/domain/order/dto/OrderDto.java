package com.DuTongChitongYutong.EverybodyChachapark.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderDto {

    private long OrderId;

    private List<OrderProductDto> orderProductDtos;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
