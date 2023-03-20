package com.DuTongChitongYutong.EverybodyChachapark.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AuthExceptionCode {

    MEMBER_LOGOUT(401, "로그아웃 또는 회원 탈퇴한 토큰 입니다.");
    private int code;
    private String message;
}
