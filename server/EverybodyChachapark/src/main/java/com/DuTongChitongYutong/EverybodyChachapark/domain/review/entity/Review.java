package com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Review extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;

    private String nickname;
    private int memberId;

    //    private String imageURL;  // Todo: 이미지 식별자

    @ManyToOne(fetch = FetchType.LAZY)  // No mapping으로 해본다
    @JoinColumn(name = "MEMBER_ID")
    private Member membera;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "PRODUCT_ID")
//    private Product product;

//    public void setMember(Member member) { // 양방향 매핑
//        this.member = member;
//        if (!this.member.getReviews().contains(this)) {
//            this.member.getReviews().add(this);
//        }
//    }
//
//    public void setProduct(Product product) { // 양방향 매핑
//        this.product = product;
//        if (!this.product.getReviews().contains(this)) {
//            this.product.getReviews().add(this);
//        }
//    }

}
