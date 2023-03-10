package com.DuTongChitongYutong.EverybodyChachapark.response;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import java.util.List;

@Getter
public class SingleResponseDto <T> {
    private T data;
    private ResponseInfo responseInfo;

    public SingleResponseDto(T data, String message, HttpStatus httpStatus, ExceptionCode exceptionCode) {
        this.data = data;
        this.responseInfo = new ResponseInfo(httpStatus.value(), message, exceptionCode);
    }

    public static <T> SingleResponseDto<T> success(@Nullable T data, @Nullable String message, HttpStatus httpStatus) {
        return new SingleResponseDto<>(data, message, httpStatus, null);
    }


}
