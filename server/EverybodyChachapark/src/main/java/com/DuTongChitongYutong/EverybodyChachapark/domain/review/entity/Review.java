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
    private String imageURL;  // Todo: 이미지 식별자

    @Column
    private Long memberId;

    @Column
    private Long productId;

    @Transient
    private Member member;

}
