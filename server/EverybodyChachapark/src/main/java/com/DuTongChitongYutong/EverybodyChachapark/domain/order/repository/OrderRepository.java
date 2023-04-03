package com.DuTongChitongYutong.EverybodyChachapark.domain.order.repository;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findOrderByOrderId(Long orderId);
    Page<Order> findOrdersByMemberId(Long memberId, Pageable pageable);

    Long countOrdersByMemberId(Long memberId);
}
