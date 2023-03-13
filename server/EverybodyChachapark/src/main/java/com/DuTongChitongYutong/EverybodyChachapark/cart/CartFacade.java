package com.DuTongChitongYutong.EverybodyChachapark.cart;

import com.DuTongChitongYutong.EverybodyChachapark.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.product.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class CartFacade {

    private final CartService cartService;

    private final ProductService productService;

    public CartFacade(CartService cartService, ProductService productService) {
        this.cartService = cartService;
        this.productService = productService;
    }

    public CartDto.Response addCart (CartDto.Post post) {
        Product product = productService.readProduct(post.getProductId());

        Cart cart = cartService.addCart(post);

        return cart.toDto(product);

    }
}
