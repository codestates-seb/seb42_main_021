package com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;


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

    private int price;

    @Column(name = "product_view")
    private int productView;

    @Column(name = "product_score")
    private int productScore;

    // Todo: 주연님 여기에 imageURL 넣겠습니다!
    @Column(name = "thumbnail_imageURL")
    private String thumbnailImageURL;

    @Column(name = "product_category")
    @Enumerated(value = EnumType.STRING)
    private ProductCategory productCategory = ProductCategory.NO_CATEGORY;

    @Enumerated(value = EnumType.STRING)
    private ProductStatus productStatus = ProductStatus.PRODUCT_FOR_SALE;

    public Product(String productName, int price, String thumbnailImageURL){
        this.productName = productName;
        this.price = price;
        this.thumbnailImageURL = thumbnailImageURL;
    }

    public Product(long productId, String productName, int price, int productView, int productScore, ProductCategory productCategory, ProductStatus productStatus, String thumbnailImageURL){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.productView = productView;
        this.productScore = productScore;
        this.productCategory = productCategory;
        this.productStatus = productStatus;
        this.thumbnailImageURL = thumbnailImageURL;
    }

    public ProductDto toDto(){
        return new ProductDto(productId, productName, price, productView, productScore,productCategory, productStatus, thumbnailImageURL, getCreatedAt(), getModifiedAt());
    }

}
