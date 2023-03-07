package com.DuTongChitongYutong.EverybodyChachapark.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        private String email;
        private String password;
        private String username;
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String password;
        private String username;

    }
}