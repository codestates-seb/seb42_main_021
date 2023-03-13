package com.DuTongChitongYutong.EverybodyChachapark.product.dto;

import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProductDto {

    private long id;

    private String name;

    private int price;

    private int productView;

    private int productScore;

    private ProductCategory productCategory;

    private ProductStatus productStatus;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
