package com.DuTongChitongYutong.EverybodyChachapark.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SingleResponseDto <T> {
    private T data;

    public static <T> SingleResponseDto<T> of(T data){
        return new SingleResponseDto<>(data);
    }
}