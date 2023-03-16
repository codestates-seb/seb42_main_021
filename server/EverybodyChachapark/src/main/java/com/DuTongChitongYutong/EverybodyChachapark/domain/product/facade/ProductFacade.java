package com.DuTongChitongYutong.EverybodyChachapark.domain.product.facade;


import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductFacade {

    private final ProductService productService;
    private final FacadeImage facadeImage;

    public ProductDto createProduct(ProductPostDto productPostDto, MultipartFile thumbnailImageFile){
        String thumbnailImageURL = facadeImage.createImageURL(List.of(thumbnailImageFile)); // 이미지 저장

        Product product = productService.createProduct(productPostDto, thumbnailImageURL);

        return product.toDto();
    }

    public ProductDto readProduct(long productId){

        Product product = productService.readProduct(productId);
        productService.updateProductView(productId);

        return product.toDto();
    }

        public Page<Product> readProducts(Pageable pageable){

        Page<Product> productPage = productService.readProducts(pageable);

        return productPage;

        }

        public Page<Product> readProducts(ProductCategory productCategory, Pageable pageable){

        Page<Product> productPage = productService.readProducts(productCategory, pageable);

        return productPage;
    }


    public ProductDto updateProduct(long productId, ProductPatchDto productPatchDto){
        Product product = productService.readProduct(productId);

        Product updatedProduct = productService.updateProduct(productId, productPatchDto);

        return updatedProduct.toDto();
    }



}
