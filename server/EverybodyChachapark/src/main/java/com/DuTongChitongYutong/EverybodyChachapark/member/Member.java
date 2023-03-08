package com.DuTongChitongYutong.EverybodyChachapark.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;



    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email) {
        this.email = email;
    }

    public Member(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    /*@Override
    public String getName() {
        return getEmail();
    }*/

    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }
}