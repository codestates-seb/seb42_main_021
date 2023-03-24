package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.repository;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

       Optional<Cart> findByMemberIdAndProductId(long memberId, long productId);

       List<Cart> findByMemberId(long memberId);

       List<Cart> findCartByCartIdIn(List<Long> cartIdList);
}
