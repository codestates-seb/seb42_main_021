package com.DuTongChitongYutong.EverybodyChachapark.domain.product.repository;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductId(long id);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findByProductCategory(ProductCategory productCategory, Pageable pageable);

    Page<Product> findByProductNameContaining(String searchName, Pageable pageable);

    @Modifying
    @Query("Update Product p SET p.productView = p.productView + 1 WHERE p.productId = :productId ")
    void updateProductView(@Param("productId") Long productId);


}
