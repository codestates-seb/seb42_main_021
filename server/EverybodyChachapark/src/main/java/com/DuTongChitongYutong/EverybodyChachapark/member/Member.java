package com.DuTongChitongYutong.EverybodyChachapark.member;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profileImg;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    public Member(String email) {
        this.email = email;
    }

    public Member(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    private static final String[] PROFILE_IMAGE_URLS = {
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/fYH5Wv9/1.png\" alt=\"1\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/5FB24RR/2.png\" alt=\"2\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/YXRjdgQ/3.png\" alt=\"3\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/1Z9k49d/4.png\" alt=\"4\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/G0FHVDB/5.png\" alt=\"5\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/MP8k0GF/6.png\" alt=\"6\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/6F9gTGc/7.png\" alt=\"7\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/W6vW3mN/8.png\" alt=\"8\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/KFkNYDR/9.png\" alt=\"9\" border=\"0\"></a>",
            "<a href=\"https://imgbb.com/\"><img src=\"https://i.ibb.co/n7tcz4v/10.png\" alt=\"10\" border=\"0\"></a>"
    };

    public String getRandomProfileImageUrl() {
        int randomIndex = new Random().nextInt(PROFILE_IMAGE_URLS.length);
        return PROFILE_IMAGE_URLS[randomIndex];
    }

}