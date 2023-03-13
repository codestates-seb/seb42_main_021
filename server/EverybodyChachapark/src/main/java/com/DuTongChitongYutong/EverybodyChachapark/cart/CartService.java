package com.DuTongChitongYutong.EverybodyChachapark.cart;

import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository boardRepository;

    public CartService(CartRepository boardRepository) {
        this.boardRepository = boardRepository;
    }


}
