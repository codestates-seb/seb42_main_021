package com.DuTongChitongYutong.EverybodyChachapark.domain.image.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.service.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageController {
    /*
     * 본 Post 컨트롤러는 이미지를 저장하고 이미지Id 형태의 URL로 응답하기 위한 기능
     *
     * 그런 것이 아니라면 해당 도메인의 Post에서 multipart로 보낼 것
     * */

    final private StorageService storageService;

    @PostMapping
    public ResponseEntity postReivewImg(@RequestPart MultipartFile reviewImage) {
        // Todo: 이미지 등록

        String url = storageService.store(reviewImage);

        return new ResponseEntity<>(url, HttpStatus.CREATED);
    }

    @GetMapping("/{image-name}")
    public ResponseEntity getMemberImg(@PathVariable("image-name") String imageName) {
        // Todo: 이미지 불러오기

        byte[] imageFile = storageService.load(imageName);

        return new ResponseEntity<>(imageFile, HttpStatus.OK);
    }

    @DeleteMapping("/{image-name}")
    public ResponseEntity getReivewImg(@PathVariable("image-name") String imageName) {
        // Todo: 이미지 삭제
        storageService.delete(imageName);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
