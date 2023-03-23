package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderDto {

    private Long orderId;

    private BigDecimal totalPrice;

    private int productType;

    private OrderStatus orderStatus;

    private List<OrderProductDto> orderProductDtos;

    private LocalDateTime createdAt;

    public OrderDto(Order order, List<OrderProductDto> orderProductDtos){
        this.orderId = order.getOrderId();
        this.totalPrice = order.getTotalPrice();
        this.productType = order.getProductType();
        this.orderStatus = order.getOrderStatus();
        this.createdAt = order.getCreatedAt();
        this.orderProductDtos = orderProductDtos;
    }



}
