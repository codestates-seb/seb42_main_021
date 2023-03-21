package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class OrderDto {

    private Long orderId;

    private int totalPrice;

    private OrderProductStatus orderProductStatus;

    private List<OrderProductDto> orderProductDtos;

    private int createdAt;

    public OrderDto(Order order, List<OrderProductDto> orderProductDtos){
        this.orderId = getOrderId();
        this.totalPrice = getTotalPrice();
        this.orderProductStatus = getOrderProductStatus();
        this.createdAt = getCreatedAt();
        this.orderProductDtos = orderProductDtos;
    }



}
