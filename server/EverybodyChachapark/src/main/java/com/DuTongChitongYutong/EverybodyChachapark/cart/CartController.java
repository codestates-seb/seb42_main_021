package com.DuTongChitongYutong.EverybodyChachapark.cart;

import com.DuTongChitongYutong.EverybodyChachapark.dto.ResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartFacade cartFacade;

    public CartController(CartFacade cartFacade) {
        this.cartFacade = cartFacade;
    }

    @PostMapping
    public ResponseEntity postCart (@RequestBody CartDto.Post post) {
        return new ResponseEntity<>(SingleResponseDto.of(cartFacade.addCart(post)), HttpStatus.CREATED);
    }


}
