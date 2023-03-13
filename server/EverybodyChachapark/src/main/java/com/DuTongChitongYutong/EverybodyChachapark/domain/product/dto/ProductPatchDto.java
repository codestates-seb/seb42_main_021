package com.DuTongChitongYutong.EverybodyChachapark.product.dto;

import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.PositiveOrZero;

@Getter
@AllArgsConstructor
public class ProductPatchDto {

    private String name;

    @PositiveOrZero
    private int price;

    private ProductCategory productCategory;

    private ProductStatus productStatus;

}
