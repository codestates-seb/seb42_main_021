package com.DuTongChitongYutong.EverybodyChachapark.domain.product.facade;


import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProductFacade {

    private final ProductService productService;

    public ProductDto createProduct(ProductPostDto productPostDto){

        Product product = productService.createProduct(productPostDto);

        return product.toDto();
    }

    public ProductDto readProduct(long productId){

        Product product = productService.readProduct(productId);
        productService.updateProductView(productId);

        return product.toDto();
    }

    // public ProductDto readProducts

    public ProductDto updateProduct(long productId, ProductPatchDto productPatchDto){
        Product product = productService.readProduct(productId);

        Product updatedProduct = productService.updateProduct(productId, productPatchDto);

        return updatedProduct.toDto();
    }



}
