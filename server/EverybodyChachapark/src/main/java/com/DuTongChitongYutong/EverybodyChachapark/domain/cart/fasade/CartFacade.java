package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.fasade;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.service.CartService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity.Cart;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CartFacade {

    private final CartService cartService;
    private final ProductService productService;
    private final MemberService memberService;

    public CartFacade(CartService cartService, ProductService productService, MemberService memberService) {
        this.cartService = cartService;
        this.productService = productService;
        this.memberService = memberService;
    }

    public CartDto.Response addCart (CartDto.Post post) {
        Product product = productService.readProduct(post.getProductId());

        Cart cart = cartService.addCart(post);

        return cart.toDto(product);
    }

    public CartDto.Response updateCart(long cartId, CartDto.Patch patch) {
        Cart cart = cartService.findCart(cartId);

        // 회원 확인 로직
        long memberId = memberService.findByEmail().getMemberId();
        if (memberId != cart.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        Product product = productService.readProduct(cart.getProductId());

        return cartService.updateCart(cartId, patch.getQuantity()).toDto(product);
    }

    /*public CartDto.Response findCart (long cartId) {
        Cart cart = cartService.findCart(cartId);

        // 회원 확인 로직
        Member member = memberService.findByEmail();

        if (member.getMemberId() != cart.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        Product product = productService.readProduct(cart.getProductId());

        return cart.toDto(product);
    }*/

    public List<CartDto.Response> findCarts() {

        // 회원 확인 로직
        long memberId = memberService.findByEmail().getMemberId();

        List<Cart> carts = cartService.findCarts(memberId);

        Set<Long> products = carts.stream().map(Cart::getProductId).collect(Collectors.toSet());

        Map<Long, Product> productMap = productService.getVerifiedProducts(products).stream()
                .collect(Collectors.toMap(Product::getProductId, Function.identity()));


        return carts.stream().map(cart -> cart.toDto(productMap.get(cart.getProductId()))).collect(Collectors.toList());

    }

    public void deleteCart (long cartId) {
        Cart cart = cartService.findCart(cartId);

        long memberId = memberService.findByEmail().getMemberId();

        if (memberId != cart.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        }

        cartService.deleteCart(cartId);

    }
}
