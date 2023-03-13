package com.DuTongChitongYutong.EverybodyChachapark.cart;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
import com.DuTongChitongYutong.EverybodyChachapark.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(indexes = @Index(name = "idx_cart_item_user_id_product_id", columnList = "memberId, productId"))
public class Cart extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int quantity;

    public Cart(Long cartId, Integer quantity) {
        this.cartId = cartId;
        this.quantity = quantity;
    }

    public CartDto.Response toDto(Product product) {
        return new CartDto.Response(cartId,memberId, productId, product.getProductName(), product.getPrice(), quantity,
                getCreatedAt(), getModifiedAt());
    }

    public CartDto.Response todo() {
        return new CartDto.Response(
                cartId, memberId, productId, null, null, quantity, getCreatedAt(), getModifiedAt()
        );
    }


}
