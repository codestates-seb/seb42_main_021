package com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade;


import com.DuTongChitongYutong.EverybodyChachapark.domain.image.service.StorageService;
import com.DuTongChitongYutong.EverybodyChachapark.util.JsonListHelper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class FacadeImage {
    private final StorageService storageService;
    private final JsonListHelper jsonListHelper;

    public String createImageURL(MultipartFile file) {
        return storageService.store(file);
    }

    public String createImageURLs(List<MultipartFile> files) {
        return Optional.ofNullable(files).map(storageService::store).map(jsonListHelper::listToJson).orElse(null);
    }

    public byte[] loadImage(String imageURL) {
        return storageService.load(imageURL);
    }

    public void deleteImage(String imageURL) {
        storageService.delete(imageURL);
    }

    public void deleteImages(String imageURLs) {
        List<String> imageURLList = jsonListHelper.jsonToList(imageURLs);
        storageService.deletes(imageURLList);
    }
}
