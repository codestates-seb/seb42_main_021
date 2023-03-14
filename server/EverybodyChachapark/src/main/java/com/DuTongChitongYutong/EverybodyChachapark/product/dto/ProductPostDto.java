package com.DuTongChitongYutong.EverybodyChachapark.product.dto;

import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

@Getter
@AllArgsConstructor
public class ProductPostDto {

    @NotBlank
    private String name;

    @PositiveOrZero
    private int price;

    private ProductCategory productCategory;

    private ProductStatus productStatus;



}
