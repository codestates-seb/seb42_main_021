package com.DuTongChitongYutong.EverybodyChachapark.domain.product.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.repository.ProductRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@AllArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(ProductPostDto productPostDto){
        Product product = new Product(productPostDto.getName(), productPostDto.getPrice());

        Optional.ofNullable(productPostDto.getProductCategory()).ifPresent(product::setProductCategory);
        Optional.ofNullable(productPostDto.getProductStatus()).ifPresent(product::setProductStatus);

        return productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public Product readProduct(long productId){
        return productRepository.findByProductId(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }
    // 추후 예외처리 다시

    @Transactional(readOnly = true)
    public Page<Product> readProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Product> readProducts(ProductCategory productCategory, Pageable pageable){
        return productRepository.findByProductCategory(productCategory, pageable);
    }

    public Product updateProduct(long productId, ProductPatchDto productPatchDto){
        Product product = readProduct(productId);

        Optional<ProductPatchDto> optionalProductPatchDto = Optional.ofNullable(productPatchDto);
        optionalProductPatchDto.map(ProductPatchDto::getName).ifPresent(product::setProductName);
        optionalProductPatchDto.map(ProductPatchDto::getPrice).ifPresent(product::setPrice);
        optionalProductPatchDto.map(ProductPatchDto::getProductCategory).ifPresent(product::setProductCategory);
        optionalProductPatchDto.map(ProductPatchDto::getProductStatus).ifPresent(product::setProductStatus);

        return product;
    }

    public void updateProductView(Long productId){
        productRepository.updateProductView(productId);
    }

    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }

    @Transactional(readOnly = true)
    public List<Product> getVerifiedProducts(Set<Long> productId) {

        List<Product> products = productRepository.findAllById(productId);

        if (products.size() != productId.size()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        return products;
    }
}
