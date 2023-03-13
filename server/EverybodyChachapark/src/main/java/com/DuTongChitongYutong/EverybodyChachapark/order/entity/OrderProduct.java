package com.DuTongChitongYutong.EverybodyChachapark.order.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_id")
    private Long orderProductId;

    @ManyToOne
    @JoinColumn
    private Order order;

    private int productId;

    private int price;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private OrderpProductStatus orderpProductStatus = OrderpProductStatus.ORDER_WAITING;

    public OrderProduct(Order order, int productId, int price, int quantity) {
        this.order = order;
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
    }
}
