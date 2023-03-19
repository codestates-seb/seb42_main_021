package com.DuTongChitongYutong.EverybodyChachapark.security.exception;

import org.springframework.security.core.AuthenticationException;

public class SecurityAuthException extends AuthenticationException {

    AuthExceptionCode authExceptionCode;

    public SecurityAuthException(AuthExceptionCode authExceptionCode) {
        super(authExceptionCode.getMessage());
        this.authExceptionCode = authExceptionCode;
    }
}
