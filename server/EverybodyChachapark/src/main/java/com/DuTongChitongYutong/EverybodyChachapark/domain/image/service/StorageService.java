package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StorageService {
    List<String> store(List<MultipartFile> files);

    byte[] load(String imageURL);

    void delete(List<String> imageURLs);
}
