package com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProductDto {

    private long ProductId;

    private String productName;

    private int price;

    private int productView;

    private int productScore;

    private ProductCategory productCategory;

    private ProductStatus productStatus;

    private String thumbnailImageURL;

    private String productDetail;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}