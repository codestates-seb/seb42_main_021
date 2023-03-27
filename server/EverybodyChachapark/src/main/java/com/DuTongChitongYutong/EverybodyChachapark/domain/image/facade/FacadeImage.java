package com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade;


import com.DuTongChitongYutong.EverybodyChachapark.domain.image.service.StorageService;
import com.DuTongChitongYutong.EverybodyChachapark.util.JsonListHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
public class FacadeImage {
    @Value("${image.server-url}")
    private String serverUrl;
    private final StorageService storageService;
    private final JsonListHelper jsonListHelper;

    public FacadeImage(StorageService storageService, JsonListHelper jsonListHelper) {
        this.storageService = storageService;
        this.jsonListHelper = jsonListHelper;
    }

    public String createImageURL(MultipartFile file) {
        return storageService.store(file);
    }

    public String createImageURLs(List<MultipartFile> files) {
        List<String> imageURLs = storageService.store(files);
        return jsonListHelper.listToJson(imageURLs);
    }

    public byte[] loadImage(String imageURL) {
        return storageService.load(imageURL);
    }

    public void deleteImage(String imageURL) {
        storageService.delete(imageURL);
    }

    public void deleteImages(String imageURL) {
        List<String> imageURLList = jsonListHelper.jsonToList(imageURL);
        storageService.delete(imageURLList);
    }

    public String makeProfileImage() { // 랜덤 이미지 생성기
        int randomIndex = new Random().nextInt(10) + 1;
        return serverUrl + "profile-" + randomIndex + ".jpg";
    }
}
