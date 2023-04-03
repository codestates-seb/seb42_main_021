package com.DuTongChitongYutong.EverybodyChachapark.slice.review;

import com.DuTongChitongYutong.EverybodyChachapark.domain.review.controller.ReviewController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.dto.ReviewDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.entity.Review;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.mapper.ReviewMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.review.service.ReviewService;
import com.DuTongChitongYutong.EverybodyChachapark.util.GetMockMultipartFile;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Part;
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
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
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
        ReviewDto.Post createReview = new ReviewDto.Post(1L, "Stub 리뷰 작성합니다!", 5);
        String content = gson.toJson(createReview);

        given(reviewMapper.reviewPostDtoToReview(Mockito.any(ReviewDto.Post.class))).willReturn(new Review());

        given(reviewService.createReview(Mockito.any(Review.class), Mockito.any(MultipartFile.class))).willReturn(new Review());

        ReviewDto.Response response =  new ReviewDto.Response(1L,"Stub 리뷰 수정합니다!", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(),
                new ReviewDto.Response.ReviewMember(1L, "legendpaino", "imageUrl"));

        given(reviewMapper.reviewToReviewResponseDto(Mockito.any(Review.class))).willReturn(response);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        // when
        ResultActions postAction =
                mockMvc.perform(
                        multipart(REVIEW_DEFAULT_URL)
                                .file(GetMockMultipartFile.getMockMultipartJson("requestBody", content))
                                .file(GetMockMultipartFile.getMockMultipartFile("imageFile"))
                                .content(content)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .headers(headers)
                );

        // then
        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.score").value(response.getScore()))
                .andDo(document(
                        "post-review",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestHeaders(
                                List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                        "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                        headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                "Refresh Token (Ex. eyJhbG...)")
                                        )
                        ),
                        requestParts(
                                List.of(partWithName("requestBody").description("리뷰 등록 Json Request Fields"),
                                        partWithName("imageFile").description("이미지 첨부 파일(NULL 가능)")
                                )
                        ),
                        requestFields(
                                List.of(fieldWithPath("productId").type(JsonFieldType.NUMBER).description("상품 식별 ID"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("리뷰 별점 점수")
                                )
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.reviewId").type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("data.score").type(JsonFieldType.NUMBER).description("리뷰 점수"),
                                        fieldWithPath("data.imageURL").type(JsonFieldType.STRING).description("리뷰 이미지 URL"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("리뷰 생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정 날짜"),
                                        fieldWithPath("data.reviewMember").type(JsonFieldType.OBJECT).description("리뷰 작성자 데이터"),
                                        fieldWithPath("data.reviewMember.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.reviewMember.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.reviewMember.memberImageURL").type(JsonFieldType.STRING).description("회원 프로필 이미지 URL")
                                )
                        )
                ));

    }

    @Test
    public void patchReviewTest() throws Exception {
        // given
        ReviewDto.Patch updateReview = new ReviewDto.Patch(1L, "Stub 리뷰 수정합니다!", 0);
        String content = gson.toJson(updateReview);

        given(reviewMapper.reviewPatchDtoToReview(Mockito.any(ReviewDto.Patch.class))).willReturn(new Review());
        given(reviewService.updateReview(Mockito.anyLong(), Mockito.any(Review.class), Mockito.any(MultipartFile.class))).willReturn(new Review());

        ReviewDto.Response response =  new ReviewDto.Response(1L,"Stub 리뷰 수정합니다!", 0, "imageUrl", LocalDateTime.now(), LocalDateTime.now(),
                new ReviewDto.Response.ReviewMember(1L, "legendpaino", "imageUrl"));

        given(reviewMapper.reviewToReviewResponseDto(Mockito.any(Review.class))).willReturn(response);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        // when
        ResultActions patchAction =
                mockMvc.perform(
                        multipart(REVIEW_DEFAULT_URL + "/{review-id}", 1L)
                                .file(GetMockMultipartFile.getMockMultipartJson("requestBody", content))
                                .file(GetMockMultipartFile.getMockMultipartFile("imageFile"))
                                .content(content)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .headers(headers)
                                .with(request -> { request.setMethod("PATCH"); return request; })
                );

        // then
        patchAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value(response.getContent()))
                .andDo(document(
                        "patch-review",
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
                                parameterWithName("review-id").description("수정할 리뷰 식별자 ID")
                        ),
                        requestParts(
                                List.of(partWithName("requestBody").description("리뷰 수정 Json Request Fields"),
                                        partWithName("imageFile").description("수정할 이미지 첨부 파일(NULL 가능)")
                                )
                        ),
                        requestFields(
                                List.of(fieldWithPath("reviewId").type(JsonFieldType.NUMBER).description("수정할 리뷰의 식별 ID").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("수정할 리뷰 내용(선택)"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("수정할 리뷰 점수(선택)")
                                )
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.reviewId").type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("리뷰 내용"),
                                        fieldWithPath("data.score").type(JsonFieldType.NUMBER).description("리뷰 점수"),
                                        fieldWithPath("data.imageURL").type(JsonFieldType.STRING).description("리뷰 이미지 URL"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("리뷰 생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정 날짜"),
                                        fieldWithPath("data.reviewMember").type(JsonFieldType.OBJECT).description("리뷰 작성자 데이터"),
                                        fieldWithPath("data.reviewMember.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.reviewMember.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.reviewMember.memberImageURL").type(JsonFieldType.STRING).description("회원 프로필 이미지 URL")
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

        List<ReviewDto.Response> responseReviewList = List.of(new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1", "imageUrl")),
                new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1", "imageUrl")),
                new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1", "imageUrl")),
        new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1", "imageUrl")),
        new ReviewDto.Response(1L, "Answer Get 태스트 입니다", 5, "imageUrl", LocalDateTime.now(), LocalDateTime.now(), new ReviewDto.Response.ReviewMember(1L, "testUser1", "imageUrl")));


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
                                        fieldWithPath("data[].imageURL").type(JsonFieldType.STRING).description("리뷰 이미지 URL"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("리뷰 생성 날짜"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정 날짜"),
                                        fieldWithPath("data[].reviewMember").type(JsonFieldType.OBJECT).description("리뷰 작성자 데이터"),
                                        fieldWithPath("data[].reviewMember.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data[].reviewMember.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data[].reviewMember.memberImageURL").type(JsonFieldType.STRING).description("회원 프로필 이미지 URL"),

                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 수"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 요소"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지")
                                )
                        )
                )
        );

    }

    @Test
    public void deleteReviewTest() throws Exception {
        // given
        doNothing().when(reviewService).deleteReview(Mockito.anyLong());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        // when
        ResultActions deleteAction =
                mockMvc.perform(
                        delete(REVIEW_DEFAULT_URL + "/{review-id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .headers(headers)
                );

        // then
        deleteAction.andExpect(status().isNoContent())
                .andDo(document(
                                "delete-review",
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
                                parameterWithName("review-id").description("삭제할 리뷰 식별 ID")
                        )
                )
        );
    }
}
