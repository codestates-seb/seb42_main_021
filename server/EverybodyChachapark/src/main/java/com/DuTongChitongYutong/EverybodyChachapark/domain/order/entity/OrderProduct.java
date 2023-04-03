
package com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderProductDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class OrderProduct extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_product_id")
    private Long orderProductId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private int quantity;

    public OrderProduct(Order order, Long productId, String productName, BigDecimal price, int quantity)
    {
        this.order = order;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public static OrderProductDto toDto(OrderProduct orderProduct){
        return new OrderProductDto(orderProduct.getProductId(), orderProduct.getProductName(), orderProduct.getPrice(), orderProduct.getQuantity());
    }

}