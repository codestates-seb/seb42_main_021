package com.DuTongChitongYutong.EverybodyChachapark.domain.image.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/image")
public class ImageController {

    /*
     * 본 Post 컨트롤러는 이미지를 저장하고 이미지Id 형태의 URL로 응답하기 위한 기능
     *
     * 그런 것이 아니라면 해당 도메인의 Post에서 multipart로 보낼 것
     * */
    @PostMapping("/members")
    public ResponseEntity postMemberImg(/*Todo: @RequestPart*/) {
        // Todo: 프로필 이미지 등록
        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PostMapping("/products")
    public ResponseEntity postProductImg(/*Todo: @RequestPart*/) {
        // Todo: 상품 이미지 등록
        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PostMapping("/reviews")
    public ResponseEntity postReivewImg(/*Todo: @RequestPart*/) {
        // Todo: 리뷰 이미지 등록
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/members/{image-id}")
    public ResponseEntity getMemberImg(/*Todo: @PathVariable("image-id")*/) {
        // Todo: 프로필 이미지 불러오기
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/products/{image-id}")
    public ResponseEntity getProductImg(/*Todo: @PathVariable("image-id")*/) {
        // Todo: 상품 이미지 불러오기
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/reviews/{image-id}")
    public ResponseEntity getReivewImg(/*Todo: @PathVariable("image-id")*/) {
        // Todo: 리뷰 이미지 불러오기
        return new ResponseEntity(HttpStatus.OK);
    }
}
