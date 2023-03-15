package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity.Cart;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.repository.CartRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    private final ProductService productService;

    private final MemberService memberService;

    public CartService(CartRepository cartRepository, ProductService productService, MemberService memberService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.memberService = memberService;
    }

    public Cart addCart (CartDto.Post post) {
        long memberId = memberService.findByEmail().getMemberId();
        long productId = post.getProductId();

        Optional<Cart> optionalCart = cartRepository.findByMemberIdAndProductId(memberId, productId);

        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
            cart.setQuantity(cart.getQuantity() + post.getQuantity());

            return cart;
        }

        cart = new Cart(post.getProductId(), post.getQuantity());
        cart.setMemberId(memberId);

        return cartRepository.save(cart);
    }

    public Cart updateCart (long cartId, int quantity) {

        Cart cart = findCart(cartId);
        cart.setQuantity(quantity);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart findCart(long cartId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
    }

    public List<Cart> findCarts(long memberId) {
        return cartRepository.findByMemberId(memberId);
    }

    public void deleteCart (long cartId) {
        Member member = memberService.findByEmail();
        Cart cart = findCart(cartId);

        cartRepository.delete(cart);
    }
}
