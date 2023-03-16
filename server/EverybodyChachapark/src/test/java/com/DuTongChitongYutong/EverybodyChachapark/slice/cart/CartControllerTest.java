package com.DuTongChitongYutong.EverybodyChachapark.slice.cart;

import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.controller.CartController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.fasade.CartFacade;
import com.DuTongChitongYutong.EverybodyChachapark.domain.cart.service.CartService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.mapper.MemberMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

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

        

    }
}
