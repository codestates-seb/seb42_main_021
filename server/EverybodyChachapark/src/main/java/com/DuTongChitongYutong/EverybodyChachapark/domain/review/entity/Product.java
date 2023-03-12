package com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

//    @OneToMany(mappedBy = "product")
//    private List<Review> reviews = new ArrayList<>();

    public Product(String productName, int price){
        this.productName = productName;
        this.price = price;
    }
}
