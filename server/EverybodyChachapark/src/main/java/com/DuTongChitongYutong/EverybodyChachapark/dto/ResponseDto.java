package com.DuTongChitongYutong.EverybodyChachapark.dto;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

@AllArgsConstructor
@Getter
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ResponseDto<T> {

    private T data;
    private int status;
    private String message;
    private ExceptionCode exceptionCode;

    public static <T> ResponseDto<T> success(@Nullable T data, @Nullable String message, HttpStatus httpStatus) {
        return new ResponseDto<>(data, httpStatus.value(), message, null);
    }
}
