package com.DuTongChitongYutong.EverybodyChachapark.domain.cart;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        long memberId = ((Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getMemberId();
        long productId = post.getProductId();

        Optional<Cart> optionalCart = cartRepository.findByMemberIdAndProductId(memberId, productId);

        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
            cart.setQuantity(cart.getQuantity() + post.getQuantity());

            return cart;
        }

        cart = new Cart(post.getProductId(), post.getQuantity());

        return cartRepository.save(cart);
    }
}
