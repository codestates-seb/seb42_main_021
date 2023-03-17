/*
package com.DuTongChitongYutong.EverybodyChachapark.slice.security;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.controller.CartController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.dto.CartDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.service.CartService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.security.configure.CustomFilterConfigurer;
import com.DuTongChitongYutong.EverybodyChachapark.security.dto.LoginDto;
import com.DuTongChitongYutong.EverybodyChachapark.security.jwt.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.snippet.Attributes;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CustomFilterConfigurer.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class CustomFilterConfigurerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Test
    public void memberLoginTest() throws Exception {

        LoginDto postLogin = new LoginDto("user@gmail.com", "1234");
        String content = gson.toJson(postLogin);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions postAction = mockMvc.perform(
                post("/members/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .headers(headers)
                );

        postAction
                .andExpect(status().isOk())
                .andDo(document("member-login",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.NUMBER).description("회원 이메일"),
                                        fieldWithPath("password").type(JsonFieldType.NUMBER).description("회원 비밀번호")
                                )
                        ),
                        responseHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                        "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                                headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                        "Refresh Token (Ex. eyJhbG...)")
                                        )
                                )
                        ));
    }
}

*/
