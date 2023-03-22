package com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Review extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private String imageURL = "[]";  // Todo: 이미지 식별자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    public void setMember(Member member) { // 양방향 매핑
        this.member = member;
        if (!this.member.getReviews().contains(this)) {
            this.member.getReviews().add(this);
        }
    }

//
//    public void setProduct(Product product) { // 양방향 매핑
//        this.product = product;
//        if (!this.product.getReviews().contains(this)) {
//            this.product.getReviews().add(this);
//        }
//    }

}
