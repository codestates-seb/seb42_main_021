package com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

    private String productDetail;


}
