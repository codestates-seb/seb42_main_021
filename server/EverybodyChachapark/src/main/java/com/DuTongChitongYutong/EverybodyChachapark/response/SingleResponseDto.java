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

    public SingleResponseDto(@Nullable T data) {
        this.data = data;
    }
}
