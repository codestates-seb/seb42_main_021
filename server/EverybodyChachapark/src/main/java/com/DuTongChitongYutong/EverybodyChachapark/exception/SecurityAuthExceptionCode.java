package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;

public enum SecurityAuthExceptionCode {

    MEMBER_LOGOUT(401, "로그아웃 또는 회원 탈퇴한 토큰 입니다."),
    TOKEN_NOT_FOUND(401, "만료 된 토큰입니다");

    @Getter
    private int status;

    @Getter
    private String message;

    SecurityAuthExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
