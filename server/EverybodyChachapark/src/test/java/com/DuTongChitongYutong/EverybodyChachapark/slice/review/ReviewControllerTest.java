package com.DuTongChitongYutong.EverybodyChachapark.slice.review;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.controller.ReviewController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReivewDto;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReviewController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class ReviewControllerTest {
    private final static String REVIEW_DEFAULT_URL = "/reviews";

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void postReivewTest() throws Exception {
        // given
        ReivewDto.Post createReview = new ReivewDto.Post(1L, 1L, "Stub 리뷰 작성합니다!", 5);
        String content = gson.toJson(createReview);

        // when
        ResultActions postAction =
                mockMvc.perform(
                        post(REVIEW_DEFAULT_URL)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        postAction
                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is(startsWith("/reviews/"))))
                .andExpect(jsonPath("$.data.content").value(createReview.getContent()));

    }

    @Test
    public void patchReivewTest() throws Exception {
        // given
        // when
        // then

    }

    @Test
    public void getReivewsTest() throws Exception {
        // given
        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        // when
        ResultActions getsActions =
                mockMvc.perform(
                        get("/reviews/{product-Id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .params(queryParams)
                );

        // then
        MvcResult mvcResult = getsActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        List list = JsonPath.parse(mvcResult.getResponse().getContentAsString()).read("$.data"); // mvcResult.getResponse().getContentAsString()으로 ResponseBody 값을 Json으로 parse하고 "$.data"부분만 가져온다.
        assertThat(list.size(), is(3)); // 가져온 Json 배열의 수가 5칸인지 테스트

    }

    @Test
    public void deleteReivewTest() throws Exception {
        // given
        // when
        // then

    }
}
