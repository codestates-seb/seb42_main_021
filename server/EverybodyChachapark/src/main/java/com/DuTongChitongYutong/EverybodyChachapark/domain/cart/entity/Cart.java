package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity;

import com.DuTongChitongYutong.EverybodyChachapark.audit.BaseTime;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.util.JsonListHelper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(indexes = @Index(name = "idx_cart_item_user_id_product_id", columnList = "memberId, productId"))
public class Cart extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private long memberId;

    @Column(nullable = false, updatable = false)
    private long productId;

    @Column(nullable = false)
    private int quantity;

    public Cart(long productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public CartDto.Response toDto(Product product) {
        /*List<String> urlList = helper.jsonToList(product.getThumbnailImageURL());
        String imageUrl = urlList.isEmpty() ? null : urlList.get(0);*/

        return new CartDto.Response(cartId, memberId, productId, product.getProductName(), product.getThumbnailImageURL(), product.getPrice(),
                quantity, getCreatedAt(), getModifiedAt());
    }

    public CartDto.Response toDto() {
        return new CartDto.Response(
                cartId, memberId, productId, null, null, null, quantity, getCreatedAt(), getModifiedAt()
        );
    }


}
