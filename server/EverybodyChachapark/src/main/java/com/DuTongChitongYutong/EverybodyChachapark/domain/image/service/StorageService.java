package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String store(MultipartFile file);
    byte[] load(String imageUrl);
    void delete(String imageUrl);
}
