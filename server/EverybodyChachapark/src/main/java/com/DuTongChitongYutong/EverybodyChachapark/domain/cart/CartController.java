package com.DuTongChitongYutong.EverybodyChachapark.domain.cart;

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

    @GetMapping("/{cart-id}")
    public ResponseEntity getCart (@PathVariable ("cart-id") long cartId) {
        return new ResponseEntity(new SingleResponseDto<>(cartFacade.findCart(cartId)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCarts() {
        return new ResponseEntity<>(new SingleResponseDto<>(cartFacade.findCarts()), HttpStatus.OK);
    }

    @DeleteMapping("{cart-id}")
    public void deleteCart (@PathVariable ("cart-id") long cartId) {
        cartFacade.deleteCart(cartId);
    }

}
