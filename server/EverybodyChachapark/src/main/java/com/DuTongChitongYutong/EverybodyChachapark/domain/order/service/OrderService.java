
package com.DuTongChitongYutong.EverybodyChachapark.domain.order.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.entity.Cart;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.repository.CartRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.CartListDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderProduct;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderStatus;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.repository.OrderRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductService productService;
    private final MemberService memberService;


    @Transactional
    public OrderDto createOrder(CartListDto cartListDto){

        Long memberId = memberService.findByEmail().getMemberId();

        List<Long> cartIdList = cartListDto.getCartList();

        List<Cart> carts = cartRepository.findCartByCartIdIn(cartIdList);
        // List<OrderProductDto> orderProductDtos = new ArrayList<>();
        List<OrderProduct> orderProducts = new ArrayList<>();

        int totalPrice = 0;

        Order order = new Order();

        for (Cart cart : carts){
            Product product = productService.readProduct(cart.getProductId());

            Long productId = product.getProductId();
            String productName = product.getProductName();
            int price = product.getPrice();
            int quantity = cart.getQuantity();

            totalPrice += price * quantity;

          //  OrderProductDto orderProductDto = new OrderProductDto(productId, productName, price, quantity);
          //  orderProductDtos.add(orderProductDto);

            OrderProduct orderProduct = new OrderProduct(order, product.getProductId(), product.getProductName(), price, quantity);
            orderProducts.add(orderProduct);

            cartRepository.delete(cart);

        }


        int productTypeNum = carts.size();

        order.setMemberId(memberId);
        order.setOrderStatus(OrderStatus.ORDER_WAITING);
        order.setTotalPrice(totalPrice);
        order.setProductType(productTypeNum);
        order.setOrderProduct(orderProducts);
        orderRepository.save(order);

        List<OrderProductDto> orderProductDtos = order.getOrderProduct().stream().map(OrderProduct::toDto).collect(Collectors.toList());

        return new OrderDto(order, orderProductDtos);

    }
/*
    @Transactional
    public OrderDto readOrder(Long orderId){
        Order order = orderRepository.findOrderByOrderId(orderId);
        List<OrderProductDto> orderProductDtos = order.getOrderProduct().stream().map(OrderProduct::toDto).collect(Collectors.toList());

        return new OrderDto(order, orderProductDtos);
    }


 */

    @Transactional(readOnly = true)
    public List<OrderDto> readOrders(){

        Long memberId = memberService.findByEmail().getMemberId();
        List<Order> orderList = orderRepository.findOrdersByMemberId(memberId);
        List<OrderDto> allOrderDto = new ArrayList<>();

        for (Order orders : orderList){
            List<OrderProductDto> orderProductDtos = orders.getOrderProduct().stream().map(OrderProduct::toDto).collect(Collectors.toList());
            allOrderDto.add(new OrderDto(orders, orderProductDtos));
        }

        return allOrderDto;
    }



    public void cancelOrder(Long orderId){

        Order order = orderRepository.findOrderByOrderId(orderId);
        if(order.getOrderStatus() == OrderStatus.ORDER_COMPLETED) throw new BusinessLogicException(ExceptionCode.ORDER_CANNOT_CANCEL);
        if(order.getOrderStatus() == OrderStatus.ORDER_CANCELED) throw new BusinessLogicException(ExceptionCode.ORDER_ALREADY_CANCELED);
        else{
          order.setOrderStatus(OrderStatus.ORDER_CANCELED);
          orderRepository.save(order);
        }

    }

}

