package com.DuTongChitongYutong.EverybodyChachapark.domain.cart.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.fasade.CartFacade;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartFacade cartFacade;

    public CartController(CartFacade cartFacade) {
        this.cartFacade = cartFacade;
    }

    @PostMapping
    public ResponseEntity postCart (@RequestBody CartDto.Post post) {
        return new ResponseEntity<>(new SingleResponseDto(cartFacade.addCart(post)), HttpStatus.CREATED);
    }

    @PatchMapping("/{cart-id}")
    public ResponseEntity patchCart (@PathVariable ("cart-id") long cartId,
                                     @RequestBody CartDto.Patch patch) {
        return new ResponseEntity(new SingleResponseDto<>(cartFacade.updateCart(cartId, patch)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCarts() {
        return new ResponseEntity<>(new SingleResponseDto<>(cartFacade.findCarts()), HttpStatus.OK);
    }

    @DeleteMapping("{cart-id}")
    public ResponseEntity deleteCart (@PathVariable ("cart-id") long cartId) {
        cartFacade.deleteCart(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
