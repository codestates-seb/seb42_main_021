package com.DuTongChitongYutong.EverybodyChachapark.response;

import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;
    private ResponseInfo responseInfo;

    public MultiResponseDto(List <T> data, Page page, String message, HttpStatus httpStatus, ExceptionCode exceptionCode) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
        this.responseInfo = new ResponseInfo(httpStatus.value(), message, exceptionCode);
    }
}
