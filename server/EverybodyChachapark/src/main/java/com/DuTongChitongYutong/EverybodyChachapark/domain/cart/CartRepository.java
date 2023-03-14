package com.DuTongChitongYutong.EverybodyChachapark.domain.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

       Optional<Cart> findByMemberIdAndProductId(long memberId, long productId);
}
