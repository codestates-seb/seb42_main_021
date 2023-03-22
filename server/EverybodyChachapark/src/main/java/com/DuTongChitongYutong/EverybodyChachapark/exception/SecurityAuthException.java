package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class SecurityAuthException extends AuthenticationException {

    SecurityAuthExceptionCode securityAuthExceptionCode;

    public SecurityAuthException(SecurityAuthExceptionCode securityAuthExceptionCode) {
        super(securityAuthExceptionCode.getMessage());
        this.securityAuthExceptionCode = securityAuthExceptionCode;
    }
}
