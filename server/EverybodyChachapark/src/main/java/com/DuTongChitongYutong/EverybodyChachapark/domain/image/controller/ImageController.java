package com.DuTongChitongYutong.EverybodyChachapark.domain.image.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.image.service.StorageService;
import com.DuTongChitongYutong.EverybodyChachapark.response.ImageURLResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.util.JsonListHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageController {
    final private FacadeImage facadeImage;
    final private JsonListHelper jsonListHelper;

    @PostMapping("/upload") // Image Upload Test
    public ResponseEntity postImage(@RequestPart(name = "imageFile", required = false) List<MultipartFile> imageFile) {
        String imageURL = facadeImage.createImageURLs(imageFile);

        return new ResponseEntity<>(new ImageURLResponseDto<>(jsonListHelper.jsonToList(imageURL)), HttpStatus.CREATED);
    }

    @GetMapping("/{image-name}")
    public ResponseEntity getImage(@PathVariable("image-name") String imageName) {
        String type = "image/" + imageName.substring(imageName.lastIndexOf(".") + 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", type);

        return new ResponseEntity<>(facadeImage.loadImage(imageName), headers, HttpStatus.OK);
    }
}
