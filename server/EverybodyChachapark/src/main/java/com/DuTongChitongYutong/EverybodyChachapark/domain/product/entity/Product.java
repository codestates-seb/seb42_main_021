package com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Product extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "product_view")
    private int productView;

    @Column(name = "thumbnail_imageURL")
    private String thumbnailImageURL;

    @Column(name = "product_category")
    @Enumerated(value = EnumType.STRING)
    private ProductCategory productCategory = ProductCategory.NO_CATEGORY;

    @Enumerated(value = EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.PRODUCT_FOR_SALE;

    @Column(name = "product_detail", length = 9999)
    private String productDetail;

    public Product(String productName, String subtitle, BigDecimal price, String thumbnailImageURL, String productDetail){
        this.productName = productName;
        this.subtitle = subtitle;
        this.price = price;
        this.thumbnailImageURL = thumbnailImageURL;
        this.productDetail = productDetail;
    }

    public Product(long productId, String productName, String subtitle, BigDecimal price, int productView, ProductCategory productCategory, ProductStatus productStatus, String thumbnailImageURL, String productDetail){
        this.productId = productId;
        this.productName = productName;
        this.subtitle = subtitle;
        this.price = price;
        this.productView = productView;
        this.productCategory = productCategory;
        this.productStatus = productStatus;
        this.thumbnailImageURL = thumbnailImageURL;
        this.productDetail = productDetail;
    }

    public ProductDto toDto(){
        return new ProductDto(productId, productName, subtitle, price, productView, productCategory, productStatus, thumbnailImageURL, productDetail, getCreatedAt(), getModifiedAt());
    }

}
