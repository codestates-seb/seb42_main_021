package com.DuTongChitongYutong.EverybodyChachapark.auth.utils;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status,
                                         @Nullable String message) throws IOException {

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
