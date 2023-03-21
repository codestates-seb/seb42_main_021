package com.DuTongChitongYutong.EverybodyChachapark.domain.order.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.service.OrderService;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<SingleResponseDto<OrderDto>> createOrder(@RequestParam Long memberId){

        return new ResponseEntity<>(new SingleResponseDto<>(orderService.createOrder(memberId)),HttpStatus.CREATED);
    }

    @PostMapping("/cancel/{orderId}")
    public ResponseEntity cancelOrder(@PathVariable Long orderId){
        orderService.cancelOrder(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<SingleResponseDto<OrderDto>> readOrder(@PathVariable Long orderId){

        return new ResponseEntity<>(new SingleResponseDto<>(orderService.readOrder(orderId)), HttpStatus.OK);
    }
}
