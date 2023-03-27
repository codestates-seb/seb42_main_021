package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderListPage {
    private List<OrderDto> orderDtoList;

    private int currentPage;

    private int totalPages;
    
    private Long totalElements;

    public OrderListPage(){

    }
}
