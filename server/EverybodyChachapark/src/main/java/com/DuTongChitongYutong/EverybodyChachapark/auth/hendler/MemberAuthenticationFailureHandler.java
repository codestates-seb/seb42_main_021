package com.DuTongChitongYutong.EverybodyChachapark.auth.hendler;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인 해주세요.");
    }

    private void sendErrorResponse(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse;
        if (message != null) {
            errorResponse = ErrorResponse.of(status, message);
        } else {
            errorResponse = ErrorResponse.of(status);
        }
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
