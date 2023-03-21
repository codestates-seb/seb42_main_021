
package com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Order extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    private int totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderProductStatus orderProductStatus = OrderProductStatus.ORDER_WAITING;

    }
