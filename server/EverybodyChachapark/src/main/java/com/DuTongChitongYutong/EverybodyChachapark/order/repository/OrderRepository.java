package com.DuTongChitongYutong.EverybodyChachapark.order.repository;

import com.DuTongChitongYutong.EverybodyChachapark.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
