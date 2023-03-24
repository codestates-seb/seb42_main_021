package com.DuTongChitongYutong.EverybodyChachapark.slice.order;

import com.DuTongChitongYutong.EverybodyChachapark.domain.order.controller.OrderController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.CartListDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderListPage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.dto.OrderProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.Order;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderProduct;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.entity.OrderStatus;
import com.DuTongChitongYutong.EverybodyChachapark.domain.order.service.OrderService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class OrderControllerTest {

    private static final String ORDER_DEFAULT_URL = "/orders";

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    public void createOrderTest() throws Exception{

        Order order = new Order();

        List<OrderProduct> orderProducts = List.of(
                new OrderProduct(order, 1L, "텐트1", BigDecimal.valueOf(3000), 5),
                new OrderProduct(order, 2L, "텐트2", BigDecimal.valueOf(4000), 2),
                new OrderProduct(order, 3L,"텐트3", BigDecimal.valueOf(50000), 3)
        );

        order.setOrderId(1L);
        order.setMemberId(1L);
        order.setOrderProduct(orderProducts);
        order.setTotalPrice(BigDecimal.valueOf(173000));
        order.setProductType(3);
        order.setOrderStatus(OrderStatus.ORDER_WAITING);

        List<OrderProductDto> orderProductDtos = orderProducts.stream().map(OrderProduct::toDto).collect(Collectors.toList());



        OrderDto mockOrderDtoResult = new OrderDto(order, orderProductDtos);

        given(orderService.createOrder(Mockito.any(CartListDto.class))).willReturn(mockOrderDtoResult);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        List<Long> cartList = List.of(1L, 2L, 3L);
        CartListDto cartListDto = new CartListDto(cartList);
        String requestBody = gson.toJson(cartListDto);


        ResultActions postAction = mockMvc.perform(
                post(ORDER_DEFAULT_URL)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(headers)
                        .content(requestBody)
        );

        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.orderId").value(mockOrderDtoResult.getOrderId()))
                .andDo(document(
                        "create-order",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                        headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                "Refresh Token (Ex. eyJhbG...)")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.orderId").type(JsonFieldType.NUMBER).description("주문 식별 ID"),
                                        fieldWithPath("data.totalPrice").type(JsonFieldType.NUMBER).description("주문한 상품의 총 가격"),
                                        fieldWithPath("data.productType").type(JsonFieldType.NUMBER).description("주문한 상품의 종류"),
                                        fieldWithPath("data.orderStatus").type(JsonFieldType.STRING).description("주문 상태"),
                                        fieldWithPath("data.orderProductDtos[]").type(JsonFieldType.ARRAY).description("주문한 상품 정보"),
                                        fieldWithPath("data.orderProductDtos[].productId").type(JsonFieldType.NUMBER).description("주문한 상품 식별 ID"),
                                        fieldWithPath("data.orderProductDtos[].productName").type(JsonFieldType.STRING).description("주문한 상품 이름"),
                                        fieldWithPath("data.orderProductDtos[].price").type(JsonFieldType.NUMBER).description("주문한 상품 가격"),
                                        fieldWithPath("data.orderProductDtos[].quantity").type(JsonFieldType.NUMBER).description("주문한 상품 수량"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("주문 생성 날짜 및 시간").optional()
                                )
                        )
                ));


    }

/*    @Test
    public void readOrder() throws Exception{

        Long orderId = 1L;

        Order order = new Order();

        List<OrderProduct> orderProducts = List.of(
                new OrderProduct(order, 1L, "텐트1", 3000, 5),
                new OrderProduct(order, 2L, "텐트2", 4000, 2),
                new OrderProduct(order, 3L, "텐트3", 50000, 3)
        );

        order.setOrderId(orderId);
        order.setMemberId(1L);
        order.setOrderProduct(orderProducts);
        order.setTotalPrice(173000);
        order.setOrderStatus(OrderStatus.ORDER_WAITING);

        List<OrderProductDto> orderProductDtos = orderProducts.stream().map(OrderProduct::toDto).collect(Collectors.toList());

        OrderDto mockOrderDtoResult = new OrderDto(order, orderProductDtos);

        given(orderService.readOrder(Mockito.anyLong())).willReturn(mockOrderDtoResult);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions readAction = mockMvc.perform(
                get(ORDER_DEFAULT_URL + "/{orderId}", 1L)
                        .accept(MediaType.APPLICATION_JSON)

        );

        readAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.orderId").value(mockOrderDtoResult.getOrderId()))
                .andDo(document(
                        "read-order",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("orderId").description("조회할 주문 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.orderId").type(JsonFieldType.NUMBER).description("주문 식별 ID"),
                                        fieldWithPath("data.totalPrice").type(JsonFieldType.NUMBER).description("주문한 상품의 총 가격"),
                                        fieldWithPath("data.orderStatus").type(JsonFieldType.STRING).description("주문 상태"),
                                        fieldWithPath("data.orderProductDtos[]").type(JsonFieldType.ARRAY).description("주문한 상품 정보"),
                                        fieldWithPath("data.orderProductDtos[].productId").type(JsonFieldType.NUMBER).description("주문한 상품 식별 ID"),
                                        fieldWithPath("data.orderProductDtos[].price").type(JsonFieldType.NUMBER).description("주문한 상품 가격"),
                                        fieldWithPath("data.orderProductDtos[].quantity").type(JsonFieldType.NUMBER).description("주문한 상품 수량"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("주문 생성 날짜 및 시간").optional()
                                )
                        )


                ));



    }


 */

    @Test
    public void readOrders() throws Exception{

        Long orderId = 1L;

        Order order = new Order();
        Order order2 = new Order();

        List<OrderProduct> orderProducts = List.of(
                new OrderProduct(order, 1L, "텐트1", BigDecimal.valueOf(3000), 5),
                new OrderProduct(order, 2L, "텐트2", BigDecimal.valueOf(4000), 2),
                new OrderProduct(order, 3L, "텐트3", BigDecimal.valueOf(50000), 3)
        );

        List<OrderProduct> orderProducts2 = List.of(
                new OrderProduct(order, 1L, "텐트1", BigDecimal.valueOf(3000), 3),
                new OrderProduct(order, 2L, "텐트2", BigDecimal.valueOf(4000), 1),
                new OrderProduct(order, 3L, "텐트3", BigDecimal.valueOf(4000), 4)
        );

        order.setOrderId(orderId);
        order.setMemberId(1L);
        order.setOrderProduct(orderProducts);
        order.setTotalPrice(BigDecimal.valueOf(173000));
        order.setOrderStatus(OrderStatus.ORDER_WAITING);

        order2.setOrderId(2L);
        order2.setMemberId(1L);
        order2.setOrderProduct(orderProducts2);
        order2.setTotalPrice(BigDecimal.valueOf(213000));
        order2.setOrderStatus(OrderStatus.ORDER_COMPLETED);

        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        int pageNumber = 1;
        int pageSize = 10;
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);


        List<Order> orderList = List.of(order, order2);
        Page<Order> orderPage = new PageImpl<>(orderList, pageable, orderList.size());

        List<OrderDto> AllOrderDto = new ArrayList<>();

        for (Order orders : orderPage.getContent()){
            List<OrderProductDto> orderProductDtos = orders.getOrderProduct().stream().map(OrderProduct::toDto).collect(Collectors.toList());
            AllOrderDto.add(new OrderDto(orders, orderProductDtos));
        }

        OrderListPage mockOrderListPage = new OrderListPage();
        mockOrderListPage.setOrderDtoList(AllOrderDto);
        mockOrderListPage.setCurrentPage(pageNumber);
        mockOrderListPage.setTotalPages(1);
        mockOrderListPage.setTotalElements(2L);

        given(orderService.readOrders(Mockito.anyInt(), Mockito.anyInt())).willReturn(mockOrderListPage);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions readAction = mockMvc.perform(
                get(ORDER_DEFAULT_URL + "/all")
                        .accept(MediaType.APPLICATION_JSON)
                        .params(queryParams)
                        .headers(headers)

        );

        MvcResult mvcResult = readAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.*").exists())
                .andReturn();

        List list = JsonPath.parse(mvcResult.getResponse().getContentAsString()).read("$.data.orderDtoList"); // mvcResult.getResponse().getContentAsString()으로 ResponseBody 값을 Json으로 parse하고 "$.data"부분만 가져온다.
        assertThat(list.size(), is(2)); // 가져온 Json 배열의 수가 2칸인지 테스트

        readAction
                .andDo(document(
                        "read-all-order",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                        headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                "Refresh Token (Ex. eyJhbG...)")
                                )
                        ),
                        requestParameters(
                                List.of(parameterWithName("page").description("Page 번호"),
                                        parameterWithName("size").description("Size 크기"))
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.orderDtoList").type(JsonFieldType.ARRAY).description("조회된 주문 목록"),
                                        fieldWithPath("data.orderDtoList[].orderId").type(JsonFieldType.NUMBER).description("주문 식별 ID"),
                                        fieldWithPath("data.orderDtoList[].totalPrice").type(JsonFieldType.NUMBER).description("주문한 상품의 총 가격"),
                                        fieldWithPath("data.orderDtoList[].productType").type(JsonFieldType.NUMBER).description("주문한 상품의 종류"),
                                        fieldWithPath("data.orderDtoList[].orderStatus").type(JsonFieldType.STRING).description("주문 상태"),
                                        fieldWithPath("data.orderDtoList[].orderProductDtos[]").type(JsonFieldType.ARRAY).description("주문한 상품 정보"),
                                        fieldWithPath("data.orderDtoList[].orderProductDtos[].productId").type(JsonFieldType.NUMBER).description("주문한 상품 식별 ID"),
                                        fieldWithPath("data.orderDtoList[].orderProductDtos[].productName").type(JsonFieldType.STRING).description("주문한 상품 이름"),
                                        fieldWithPath("data.orderDtoList[].orderProductDtos[].price").type(JsonFieldType.NUMBER).description("주문한 상품 가격"),
                                        fieldWithPath("data.orderDtoList[].orderProductDtos[].quantity").type(JsonFieldType.NUMBER).description("주문한 상품 수량"),
                                        fieldWithPath("data.orderDtoList[].createdAt").type(JsonFieldType.STRING).description("주문 생성 날짜 및 시간").optional(),
                                        fieldWithPath("data.currentPage").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("data.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
                                        fieldWithPath("data.totalElements").type(JsonFieldType.NUMBER).description("전체 요소 수")
                                )
                        )


                ));

    }

    @Test
    public void cancelOrder() throws Exception{

        doNothing().when(orderService).cancelOrder(Mockito.anyLong());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions cancelAction =
                mockMvc.perform(
                        patch(ORDER_DEFAULT_URL + "/cancel" + "/{orderId}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .headers(headers)
                );

        cancelAction.andExpect(status().isNoContent())
                .andDo(document(
                                "cancel-order",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestHeaders(
                                        List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                        "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                                headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                        "Refresh Token (Ex. eyJhbG...)")
                                        )
                                ),
                                pathParameters(
                                        parameterWithName("orderId").description("삭제할 주문 ID")
                                )
                        )
                );

    }



}
