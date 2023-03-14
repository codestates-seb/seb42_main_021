package com.DuTongChitongYutong.EverybodyChachapark.domain.product.controller;


import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.facade.ProductFacade;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@AllArgsConstructor
@Validated
@RequestMapping("/products")
public class ProductController {

    private final ProductFacade productFacade;

    @PostMapping
    public ResponseEntity<SingleResponseDto<ProductDto>> postProduct(@Valid @RequestPart("data-json")ProductPostDto productPostDto){

        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.createProduct(productPostDto)), HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<SingleResponseDto<ProductDto>> readProduct(@PathVariable @Positive long productId){
        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.readProduct(productId)), HttpStatus.OK);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<SingleResponseDto<ProductDto>> updateProduct(@PathVariable @Positive long productId, @Valid @RequestPart("data-json") ProductPatchDto productPatchDto){
        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.updateProduct(productId, productPatchDto)), HttpStatus.OK);
    }
}
