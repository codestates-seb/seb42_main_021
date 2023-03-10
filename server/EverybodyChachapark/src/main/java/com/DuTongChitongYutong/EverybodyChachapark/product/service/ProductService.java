package com.DuTongChitongYutong.EverybodyChachapark.product.service;

import com.DuTongChitongYutong.EverybodyChachapark.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    // public Product registerProduct(ProductPostDto productPostDto)

    @Transactional(readOnly = true)
    public Product getProduct(long productId){
        return productRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException(""));
    }
    // 추후 예외처리 다시

    @Transactional(readOnly = true)
    public Page<Product> getProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Product> getProducts(ProductCategory productCategory, Pageable pageable){
        return productRepository.findByProductCategory(productCategory, pageable);
    }

    // public Product updateProduct(long productId, ProductPatchDto productPatchDto)

    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }
}
