package com.DuTongChitongYutong.EverybodyChachapark.cart;

import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartId;

    @Column(nullable = false)
    private String title;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember (Member member) {
        this.member = member;
    }
}
