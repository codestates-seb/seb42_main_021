package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void store(MultipartFile file);
}
