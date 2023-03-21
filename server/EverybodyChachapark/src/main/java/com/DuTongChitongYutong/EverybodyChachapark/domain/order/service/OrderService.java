
package com.DuTongChitongYutong.EverybodyChachapark.domain.order.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity.Cart;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.repository.CartRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderProduct;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderProductStatus;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.repository.OrderProductRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.repository.OrderRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final CartRepository cartRepository;
    private final ProductService productService;


    public OrderDto createOrder(Long memberId){

        List<Cart> carts = cartRepository.findByMemberId(memberId);
        List<OrderProductDto> orderProductDtos = new ArrayList<>();

        int totalPrice = 0;

        Order order = new Order();

        for (Cart cart : carts){
            Product product = productService.readProduct(cart.getProductId());
            int quantity = cart.getQuantity();
            int price = product.getPrice();
            totalPrice += price * quantity;

            OrderProductDto orderProductDto = new OrderProductDto(order, cart.getProductId(), price, quantity);
            orderProductDtos.add(orderProductDto);

            OrderProduct orderProduct = new OrderProduct(order, cart.getProductId(), price, quantity);
            orderProductRepository.save(orderProduct);

        }

        order.setOrderProductStatus(OrderProductStatus.ORDER_WAITING);
        order.setTotalPrice(totalPrice);
        orderRepository.save(order);

        return new OrderDto(order, orderProductDtos);

    }

    public OrderDto readOrder(Long orderId){
        Order order = orderRepository.findOrderByOrderId(orderId);
        List<OrderProductDto> orderProductDtos = orderProductRepository.findOrderProductByOrder(order).stream().map(OrderProduct::toDto).collect(Collectors.toList());

        return new OrderDto(order, orderProductDtos);
    }

    public void cancelOrder(Long orderId){

        Order order = orderRepository.findOrderByOrderId(orderId);
        if(order.getOrderProductStatus() == OrderProductStatus.ORDER_COMPLETED) throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        if(order.getOrderProductStatus() == OrderProductStatus.ORDER_CANCELED) throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        else{
          order.setOrderProductStatus(OrderProductStatus.ORDER_CANCELED);
          orderRepository.save(order);
        }

    }

}

