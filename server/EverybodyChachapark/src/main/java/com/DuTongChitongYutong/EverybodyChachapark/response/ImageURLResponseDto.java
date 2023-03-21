package com.DuTongChitongYutong.EverybodyChachapark.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ImageURLResponseDto <T> {
    private List<T> data;
    private int totalElements;

    public ImageURLResponseDto(List<T> imageURL) {
        this.data = imageURL;
        this.totalElements = imageURL.size();
    }
}
