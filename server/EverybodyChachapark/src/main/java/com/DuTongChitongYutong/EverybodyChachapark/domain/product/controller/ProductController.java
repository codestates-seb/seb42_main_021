package com.DuTongChitongYutong.EverybodyChachapark.domain.product.controller;


import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.facade.ProductFacade;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.response.MultiResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Validated
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductFacade productFacade;
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<SingleResponseDto<ProductDto>> postProduct(@Valid @RequestPart ProductPostDto productPostDto, @RequestPart MultipartFile thumbnailImageFile){

        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.createProduct(productPostDto, thumbnailImageFile)), HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<SingleResponseDto<ProductDto>> readProduct(@PathVariable @Positive long productId){
        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.readProduct(productId)), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<MultiResponseDto<ProductDto>> readAllProducts(Pageable pageable){
        Page<Product> page = productFacade.readProducts(pageable);
        List<ProductDto> list = page.getContent().stream().map(Product::toDto).collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResponseDto<>(list, page), HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<MultiResponseDto<ProductDto>> readProducts(@PathVariable ProductCategory category, Pageable pageable){
        Page<Product> page = productFacade.readProducts(category, pageable);
        List<ProductDto> list = page.getContent().stream().map(Product::toDto).collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResponseDto<>(list, page), HttpStatus.OK);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<SingleResponseDto<ProductDto>> updateProduct(@PathVariable @Positive long productId, @Valid @RequestBody ProductPatchDto productPatchDto){

        return new ResponseEntity<>(new SingleResponseDto<>(productFacade.updateProduct(productId, productPatchDto)), HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable @Positive long productId){
        productService.deleteProduct(productId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


}
