
package com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    private Long memberId;

    private int totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.ORDER_WAITING;

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderProduct> orderProduct = new ArrayList<>();

    public static OrderDto.Response toDto(Order order){
        return new OrderDto.Response(order.getOrderId(), order.getTotalPrice(), order.getOrderStatus(), order.getCreatedAt());
    }

    }
