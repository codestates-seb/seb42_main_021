package com.DuTongChitongYutong.EverybodyChachapark.domain.order.repository;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findOrderByOrderId(Long orderId);
    List<Order> findOrdersByMemberId(Long memberId);
    Page<Order> findOrdersByMemberId(Long memberId, Pageable pageable);
}
