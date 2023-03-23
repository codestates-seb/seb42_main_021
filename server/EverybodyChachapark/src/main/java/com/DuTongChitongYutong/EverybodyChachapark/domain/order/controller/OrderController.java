package com.DuTongChitongYutong.EverybodyChachapark.domain.order.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.CartListDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.service.OrderService;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<SingleResponseDto<OrderDto>> createOrder(@RequestBody CartListDto cartListDto){


        return new ResponseEntity<>(new SingleResponseDto<>(orderService.createOrder(cartListDto)),HttpStatus.CREATED);
    }

    @PatchMapping("/cancel/{orderId}")
    public ResponseEntity cancelOrder(@PathVariable Long orderId){
        orderService.cancelOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
/*
    @GetMapping("/{orderId}")
    public ResponseEntity<SingleResponseDto<OrderDto>> readOrder(@PathVariable Long orderId){

        return new ResponseEntity<>(new SingleResponseDto<>(orderService.readOrder(orderId)), HttpStatus.OK);
    }

 */

    @GetMapping("/all")
    public ResponseEntity<SingleResponseDto<List<OrderDto>>> readOrders(){

        return new ResponseEntity<>(new SingleResponseDto<>(orderService.readOrders()), HttpStatus.OK);
    }


}
