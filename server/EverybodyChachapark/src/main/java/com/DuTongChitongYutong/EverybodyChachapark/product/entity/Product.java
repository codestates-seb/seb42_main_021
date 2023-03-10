package com.DuTongChitongYutong.EverybodyChachapark.product.entity;

import com.DuTongChitongYutong.EverybodyChachapark.order.entity.OrderProduct;
import com.DuTongChitongYutong.EverybodyChachapark.product.dto.ProductDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    private int price;

    @Column(name = "product_view")
    private int productView;

    @Column(name = "product_score")
    private int productScore;

    @Column(name = "product_category")
    @Enumerated(value = EnumType.STRING)
    private ProductCategory productCategory = ProductCategory.NO_CATEGORY;

    @Enumerated(value = EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.PRODUCT_FOR_SALE;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    public Product(String productName, int price){
        this.productName = productName;
        this.price = price;
    }

    public ProductDto toDto(){
        return new ProductDto(productId, productName, price, productView, productScore,productCategory, productStatus, getCreatedAt(), getModifiedAt());
    }


    }
