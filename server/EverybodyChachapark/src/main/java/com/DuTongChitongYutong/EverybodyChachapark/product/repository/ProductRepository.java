package com.DuTongChitongYutong.EverybodyChachapark.product.repository;

import com.DuTongChitongYutong.EverybodyChachapark.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
