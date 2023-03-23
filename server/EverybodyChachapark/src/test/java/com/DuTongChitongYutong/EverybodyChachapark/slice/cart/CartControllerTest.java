package com.DuTongChitongYutong.EverybodyChachapark.slice.cart;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.controller.CartController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.fasade.CartFacade;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.service.CartService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.mapper.MemberMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CartController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private CartService cartService;

    @MockBean
    private CartFacade cartFacade;

    @Test
    public void postCartTest() throws Exception {

        CartDto.Post postCart = new CartDto.Post(1, 1);
        String content = gson.toJson(postCart);

        CartDto.Response response = new CartDto.Response(1, 1, 1, "Test상품 1",
                "[\\\"imageURL\\\"]", BigDecimal.valueOf(10000), 1, LocalDateTime.now(), LocalDateTime.now());

        given(cartFacade.addCart(Mockito.any(CartDto.Post.class))).willReturn(response);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions postAction = mockMvc.perform(
                post("/carts")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .headers(headers)
                );

        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.productId").value(response.getProductId()))
                .andDo(document("post-cart",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                        headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                "Refresh Token (Ex. eyJhbG...)")
                                )
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("productId").type(JsonFieldType.NUMBER).description("상품 고유 ID"),
                                        fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("상품 수량")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.cartId").type(JsonFieldType.NUMBER).description("장바구니 고유 ID"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("장바구니 등록 회원 ID"),
                                        fieldWithPath("data.productId").type(JsonFieldType.NUMBER).description("상품 고유 ID"),
                                        fieldWithPath("data.productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("data.imageUrl").type(JsonFieldType.STRING).description("상품 썸네일 URL 주소"),
                                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data.quantity").type(JsonFieldType.NUMBER).description("상품 수량"),
                                        fieldWithPath("data.createAt").type(JsonFieldType.STRING).description("장바구니 등록 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("장바구니 수정 시간")
                                )
                        )
        ));
    }

    @Test
    public void patchCartTest() throws Exception{

        CartDto.Patch patchCart = new CartDto.Patch();
        patchCart.setQuantity(2);
        String content = gson.toJson(patchCart);

        CartDto.Response patchResponse = new CartDto.Response(1, 1, 1, "Test상품 1",
                "[\\\"imageURL\\\"]", BigDecimal.valueOf(10000), 1, LocalDateTime.now(), LocalDateTime.now());

        given(cartFacade.updateCart(Mockito.anyLong(), Mockito.any(CartDto.Patch.class))).willReturn(patchResponse);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions patchAction = mockMvc.perform(
                patch("/carts/{cart-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .headers(headers)
                );

        patchAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.quantity").value(patchResponse.getQuantity()))
                .andDo(document("patch-cart",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                        headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                "Refresh Token (Ex. eyJhbG...)")
                                )
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("quantity").type(JsonFieldType.NUMBER).description("상품 수량")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.cartId").type(JsonFieldType.NUMBER).description("장바구니 고유 ID"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("장바구니 등록 회원 ID"),
                                        fieldWithPath("data.productId").type(JsonFieldType.NUMBER).description("상품 고유 ID"),
                                        fieldWithPath("data.productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("data.imageUrl").type(JsonFieldType.STRING).description("상품 썸네일 URL 주소"),
                                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data.quantity").type(JsonFieldType.NUMBER).description("상품 수량"),
                                        fieldWithPath("data.createAt").type(JsonFieldType.STRING).description("장바구니 등록 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("장바구니 수정 시간")
                                )
                        )
                ));
    }

    @Test
    public void getCartsTest() throws Exception {

        List<CartDto.Response> cartList = List.of(
                new CartDto.Response(1, 1, 1, "Test상품 1",
                        "[\\\"imageURL\\\"]", BigDecimal.valueOf(10000), 1, LocalDateTime.now(), LocalDateTime.now()),
                new CartDto.Response(2, 1, 2, "Test상품 2",
                        "[\\\"imageURL\\\"]", BigDecimal.valueOf(30000), 1, LocalDateTime.now(), LocalDateTime.now()),
                new CartDto.Response(3, 1, 3, "Test상품 3",
                        "[\\\"imageURL\\\"]", BigDecimal.valueOf(50000), 1, LocalDateTime.now(), LocalDateTime.now())
        );

        given(cartFacade.findCarts()).willReturn(cartList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions getAction = mockMvc.perform(
                get("/carts")
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(headers)
        );

        getAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andDo(document("get-cart",
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
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].cartId").type(JsonFieldType.NUMBER).description("장바구니 고유 ID"),
                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("장바구니 등록 회원 ID"),
                                        fieldWithPath("data[].productId").type(JsonFieldType.NUMBER).description("상품 고유 ID"),
                                        fieldWithPath("data[].productName").type(JsonFieldType.STRING).description("상품명"),
                                        fieldWithPath("data[].imageUrl").type(JsonFieldType.STRING).description("상품 썸네일 URL 주소"),
                                        fieldWithPath("data[].price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data[].quantity").type(JsonFieldType.NUMBER).description("상품 수량"),
                                        fieldWithPath("data[].createAt").type(JsonFieldType.STRING).description("장바구니 등록 시간"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("장바구니 수정 시간")
                                )
                        )
                ));
    }

    @Test
    public void deleteCartTest() throws Exception {

        doNothing().when(cartService).deleteCart(Mockito.anyLong());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions deleteAction = mockMvc.perform(
                delete("/carts/{cartId}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(headers)
                );

        deleteAction
                .andExpect(status().isNoContent())
                .andDo(document("delete-cart",
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
                                        parameterWithName("cartId").description("삭제할 장바구니 ID")
                                )
                        )
                );
    }
}
