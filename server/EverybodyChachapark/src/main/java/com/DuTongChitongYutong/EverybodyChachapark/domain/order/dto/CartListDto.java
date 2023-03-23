package com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartListDto {
    private List<Long> cartList;

    public CartListDto(){

    }

    public CartListDto(List<Long> cartList){
        this.cartList = cartList;
    }

}
