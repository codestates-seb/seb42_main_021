package com.DuTongChitongYutong.EverybodyChachapark.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderPostDto {

    @NotNull
    private List<OrderProductPostDto> orderProductPostDtos;

}
