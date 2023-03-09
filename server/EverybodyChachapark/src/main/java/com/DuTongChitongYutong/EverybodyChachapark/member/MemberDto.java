package com.DuTongChitongYutong.EverybodyChachapark.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private String email;
        private String password;
        private String nickname;
    }

    @Getter
    @Setter
    public static class Patch {
        private String password;
        private String nickname;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String nickname;
        private Member.MemberStatus memberStatus;
        private LocalDateTime createDate;

    }

    @AllArgsConstructor
    @Getter
    public static class CreateResponse {
        private long memberId;
        private String email;
        private String nickname;
        private LocalDateTime createDate;
    }
}