package com.DuTongChitongYutong.EverybodyChachapark.slice.review;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.controller.ReviewController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReviewDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.mapper.ReviewMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.repository.ReviewRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.service.ReviewService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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

    @MockBean
    private ReviewService reviewService;

    @MockBean
    private ReviewMapper reviewMapper;

    @Test
    public void postReviewTest() throws Exception {
        // given
        ReviewDto.Post createReview = new ReviewDto.Post(1L, 1L, "Stub 리뷰 작성합니다!", 5);
        String content = gson.toJson(createReview);

        given(reviewMapper.reviewPostDtoToReview(Mockito.any(ReviewDto.Post.class))).willReturn(new Review());

        Review mockResultReview = new Review();
        mockResultReview.setReviewId(1L);

        given(reviewService.createReview(Mockito.any(Review.class))).willReturn(mockResultReview);

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
                .andExpect(header().string("Location", is(startsWith("/reviews/"))))
                .andDo(document(
                        "post-review",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(fieldWithPath("productId").type(JsonFieldType.NUMBER).description("상품 식별 ID"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("리뷰 별점 점수")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리뷰의 URI")
                        )
                ));

    }

    @Test
    public void patchReviewTest() throws Exception {
        // given
        ReviewDto.Patch updateReview = new ReviewDto.Patch(1L, 1L, "Stub 리뷰 수정합니다!", 0);
        String content = gson.toJson(updateReview);

        given(reviewMapper.reviewPatchDtoToReview(Mockito.any(ReviewDto.Patch.class))).willReturn(new Review());
        given(reviewService.updateReview(Mockito.anyLong(), Mockito.any(Review.class))).willReturn(new Review());

        ReviewDto.Response response =  new ReviewDto.Response(1L,"Stub 리뷰 수정합니다!", 0, LocalDateTime.now(), LocalDateTime.now(),
                new ReviewDto.Response.ReviewMember(1L, "legendpaino"));

        given(reviewMapper.reviewToReviewResponseDto(Mockito.any(Review.class))).willReturn(response);

        // when
        ResultActions patchAction =
                mockMvc.perform(
                        patch(REVIEW_DEFAULT_URL + "/{review-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        patchAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value(response.getContent()))
                .andDo(document(
                        "patch-review",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("review-id").description("수정할 리뷰 식별자 ID")
                        ),
                        requestFields(
                                List.of(fieldWithPath("reviewId").type(JsonFieldType.NUMBER).description("수정할 리뷰의 식별 ID").ignored(),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("수정할 리뷰의 작성자 식별 ID"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("수정할 리뷰 내용"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("수정할 리뷰 점수")
                                )
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.reviewId").type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("data.score").type(JsonFieldType.NUMBER).description("리뷰 점수"),
//                                        fieldWithPath("data.imageId").type(JsonFieldType.STRING).description("리뷰 이미지 URL"), Todo
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("리뷰 생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정 날짜"),
                                        fieldWithPath("data.reviewMember").type(JsonFieldType.OBJECT).description("리뷰 작성자 데이터"),
                                        fieldWithPath("data.reviewMember.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.reviewMember.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
//                                        fieldWithPath("data.answerMember.memberImgId").type(JsonFieldType.STRING).description("회원 프로필 이미지 URL") Todo
                                        fieldWithPath("responseInfo").type(JsonFieldType.OBJECT).description("Response Info").ignored(),
                                        fieldWithPath("responseInfo.status").type(JsonFieldType.NUMBER).description("Response Status").ignored(),
                                        fieldWithPath("responseInfo.message").type(JsonFieldType.STRING).description("Response Message").ignored(),
                                        fieldWithPath("responseInfo.exceptionCode").type(JsonFieldType.NULL).description("Response ExeceptionCode").ignored()
                                )
                        )
                ));
    }

    @Test
    public void getReviewsTest() throws Exception {
        // given
        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        given(reviewService.findReviews(Mockito.anyLong(), Mockito.anyInt(), Mockito.anyInt())).willReturn(new PageImpl<>(new ArrayList<>()));

        List<ReviewDto.Response> responseReviewList = List.of(new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1")),
                new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1")),
                new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1")),
        new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1")),
        new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1")));


        given(reviewMapper.reviewToReviewResponseDtos(Mockito.anyList())).willReturn(responseReviewList);

        // when
        ResultActions getsActions =
                mockMvc.perform(
                        get(REVIEW_DEFAULT_URL + "/{product-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .params(queryParams)
                );

        // then
        MvcResult mvcResult = getsActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andReturn();

        List list = JsonPath.parse(mvcResult.getResponse().getContentAsString()).read("$.data"); // mvcResult.getResponse().getContentAsString()으로 ResponseBody 값을 Json으로 parse하고 "$.data"부분만 가져온다.
        assertThat(list.size(), is(5)); // 가져온 Json 배열의 수가 5칸인지 테스트

        getsActions.andDo(
                document(
                        "get-reviews",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("product-id").description("상품 식별 ID")
                        ),
                        requestParameters(
                                List.of(parameterWithName("page").description("Page 번호"),
                                        parameterWithName("size").description("Size 크기"))
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].reviewId").type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("data[].score").type(JsonFieldType.NUMBER).description("리뷰 점수"),
//                                        fieldWithPath("data[].imageId").type(JsonFieldType.STRING).description("리뷰 이미지 URL"), Todo
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("리뷰 생성 날짜"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정 날짜"),
                                        fieldWithPath("data[].reviewMember").type(JsonFieldType.OBJECT).description("리뷰 작성자 데이터"),
                                        fieldWithPath("data[].reviewMember.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data[].reviewMember.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
//                                        fieldWithPath("data.answerMember.memberImgId").type(JsonFieldType.STRING).description("회원 프로필 이미지 URL"), Todo

                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 수"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 요소"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지"),

                                        fieldWithPath("responseInfo").type(JsonFieldType.OBJECT).description("Response Info").ignored(),
                                        fieldWithPath("responseInfo.status").type(JsonFieldType.NUMBER).description("Response Status").ignored(),
                                        fieldWithPath("responseInfo.message").type(JsonFieldType.STRING).description("Response Message").ignored(),
                                        fieldWithPath("responseInfo.exceptionCode").type(JsonFieldType.NULL).description("Response ExeceptionCode").ignored())
                        )
                )
        );

    }

    @Test
    public void deleteReviewTest() throws Exception {
        // given
        doNothing().when(reviewService).deleteReview(Mockito.anyLong(), Mockito.anyLong());
        // when
        ResultActions deleteAction =
                mockMvc.perform(
                        delete(REVIEW_DEFAULT_URL + "/{review-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .param("memberId", "1")
                );

        // then
        deleteAction.andExpect(status().isNoContent())
                .andDo(document(
                                "delete-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("review-id").description("삭제할 리뷰 식별 ID")
                                ),
                                requestParameters(
                                        parameterWithName("memberId").description("삭제할 리뷰의 작성자 식별 ID")
                                )
                        )
                );
    }
}
