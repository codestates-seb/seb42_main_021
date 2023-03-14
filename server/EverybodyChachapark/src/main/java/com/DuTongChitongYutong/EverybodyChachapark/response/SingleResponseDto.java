package com.DuTongChitongYutong.EverybodyChachapark.response;

import lombok.Getter;
import org.springframework.lang.Nullable;

@Getter
public class SingleResponseDto <T> {
    private T data;

    public SingleResponseDto(@Nullable T data) {
        this.data = data;
    }
}
