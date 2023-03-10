//package com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity;
//
//import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.mapstruct.Mapping;
//
//import javax.persistence.*;
//
//@NoArgsConstructor
//@Getter
//@Setter
//@Entity
//public class Review {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long reviewId;
//    @Column(nullable = false)
//    private String content;
//    @Column(nullable = false)
//    private int score;
//
////    @ManyToOne(fetch = FetchType.LAZY)  // No mapping으로 해본다
////    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
////    private Image image;  // Todo: 이미지 식별자
//
//}
