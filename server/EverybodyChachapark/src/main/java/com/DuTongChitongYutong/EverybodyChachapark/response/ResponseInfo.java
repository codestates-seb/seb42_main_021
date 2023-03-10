package com.DuTongChitongYutong.EverybodyChachapark.response;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResponseInfo {
    private int status;
    private String message;
    private ExceptionCode exceptionCode;
}
