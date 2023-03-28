package com.DuTongChitongYutong.EverybodyChachapark.auth.hendler;

import com.DuTongChitongYutong.EverybodyChachapark.exception.SecurityAuthException;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.ErrorResponder;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws ServletException, IOException {

        Exception exception = (Exception) request.getAttribute("exception");

        if (exception != null) {
            if (exception.getClass().getName().equals(SignatureException.class.getName())) {
                ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "검증에 실패했습니다.");
            } else if (exception.getClass().getName().equals(ExpiredJwtException.class.getName())) {
                ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "토큰 기한이 만료되었습니다. 다시 로그인 하십시오.");
            } else if (exception.getClass().getName().equals(SecurityAuthException.class.getName())) {
                ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, exception.getMessage());
            }
        } else {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "회원만 접근할 수 있습니다.");
        }
    }
}
