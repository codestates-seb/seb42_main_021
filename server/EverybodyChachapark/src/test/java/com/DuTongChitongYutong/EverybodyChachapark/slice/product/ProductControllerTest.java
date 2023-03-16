package com.DuTongChitongYutong.EverybodyChachapark.slice.product;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.controller.ProductController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPatchDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.dto.ProductPostDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.Product;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductCategory;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.entity.ProductStatus;
import com.DuTongChitongYutong.EverybodyChachapark.domain.product.facade.ProductFacade;

import com.DuTongChitongYutong.EverybodyChachapark.domain.product.service.ProductService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

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
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(ProductController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class ProductControllerTest {

    private static final String PRODUCT_DEFAULT_URL = "/products";

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductFacade productFacade;

    @MockBean
    private ProductService productService;

    @Test
    public void postProductTest() throws Exception{
        ProductPostDto productPostDto = new ProductPostDto("짱비싼 텐트", 500000, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE);
        String content = gson.toJson(productPostDto);

        ProductDto mockResultProduct = new ProductDto(1, "짱비싼 텐트", 500000, 0, 0, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]", LocalDateTime.now(), LocalDateTime.now());

        given(productFacade.createProduct(Mockito.any(ProductPostDto.class), Mockito.any(MultipartFile.class))).willReturn(mockResultProduct);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions postAction =
                mockMvc.perform(
                        multipart(PRODUCT_DEFAULT_URL)
                                .file(GetMockMultipartFile.getMockMultipartJson("productPostDto", content))
                                .file(GetMockMultipartFile.getMockMultipartFile("thumbnailImageFile"))
                                .content(content)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                                .headers(headers)
                );

        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.price").value(mockResultProduct.getPrice()))
                .andDo(document(
                        "post-product",
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
                                List.of(partWithName("productPostDto").description("상품 등록 Json Request Fields"),
                                        partWithName("thumbnailImageFile").description("썸네일 이미지 첨부 파일")
                                )
                        ),
                        requestFields(
                                List.of(fieldWithPath("name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("productStatus").type(JsonFieldType.STRING).description("상품 상태")
                                )
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.productId").type(JsonFieldType.NUMBER).description("상품 ID"),
                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data.productView").type(JsonFieldType.NUMBER).description("상품 조회수"),
                                        fieldWithPath("data.productScore").type(JsonFieldType.NUMBER).description("상품 점수"),
                                        fieldWithPath("data.productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("data.productStatus").type(JsonFieldType.STRING).description("상품 상태"),
                                        fieldWithPath("data.thumbnailImageURL").type(JsonFieldType.STRING).description("상품 썸네일 이미지 URL"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정 날짜")


                                )
                        )
                ));

    }

    @Test
    public void patchProduct() throws Exception{

        ProductPatchDto productPatchDto = new ProductPatchDto("짱비싼 의자", 400000, ProductCategory.CHAIR, ProductStatus.PRODUCT_SOLD_OUT);
        String content = gson.toJson(productPatchDto);

        ProductDto mockResultPatchProduct = new ProductDto(2, "짱비싼 의자", 400000, 5, 5, ProductCategory.CHAIR, ProductStatus.PRODUCT_SOLD_OUT,"[\"imageURL\"]", LocalDateTime.now(), LocalDateTime.now());
        given(productFacade.updateProduct(Mockito.anyLong(), Mockito.any(ProductPatchDto.class), Mockito.any(MultipartFile.class))).willReturn(mockResultPatchProduct);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        ResultActions patchAction =
                mockMvc.perform(
                        multipart(PRODUCT_DEFAULT_URL + "/{productId}", 2L)
                                .file(GetMockMultipartFile.getMockMultipartJson("productPatchDto", content))
                                .file(GetMockMultipartFile.getMockMultipartFile("thumbnailImageFile"))
                                .content(content)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .headers(headers)
                                .with(request -> { request.setMethod("PATCH"); return request; })
                );

        patchAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.price").value(mockResultPatchProduct.getPrice()))
                .andDo(document(
                        "patch-product",
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
                                parameterWithName("productId").description("수정할 상품 ID")
                        ),
                        requestParts(
                                List.of(partWithName("productPatchDto").description("상품 수정 Json Request Fields"),
                                        partWithName("thumbnailImageFile").description("썸네일 이미지 첨부 파일")
                                )
                        ),
                        requestFields(
                                List.of(fieldWithPath("name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("productStatus").type(JsonFieldType.STRING).description("상품 상태"))
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.productId").type(JsonFieldType.NUMBER).description("상품 ID"),
                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data.productView").type(JsonFieldType.NUMBER).description("상품 조회수"),
                                        fieldWithPath("data.productScore").type(JsonFieldType.NUMBER).description("상품 점수"),
                                        fieldWithPath("data.productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("data.productStatus").type(JsonFieldType.STRING).description("상품 상태"),
                                        fieldWithPath("data.thumbnailImageURL").type(JsonFieldType.STRING).description("상품 썸네일 이미지 URL"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정 날짜")


                                )


                )
                ));


    }

    @Test
    public void readProduct() throws Exception{

        long productId = 1L;

        ProductDto mockResultProductReadDto = new ProductDto(1L, "의자", 0, 0, 0, ProductCategory.CHAIR, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]", LocalDateTime.now(), LocalDateTime.now());

        given(productFacade.readProduct(Mockito.anyLong())).willReturn(mockResultProductReadDto);

        ResultActions readAction =
                mockMvc.perform(
                        get(PRODUCT_DEFAULT_URL + "/{productId}", 1L)
                                .accept(MediaType.APPLICATION_JSON)

                );

        readAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.productId").value(mockResultProductReadDto.getProductId()))
                .andDo(document(
                        "read-product",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("productId").description("조회할 상품 ID")
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.productId").type(JsonFieldType.NUMBER).description("상품 ID"),
                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("data.price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data.productView").type(JsonFieldType.NUMBER).description("상품 조회수"),
                                        fieldWithPath("data.productScore").type(JsonFieldType.NUMBER).description("상품 점수"),
                                        fieldWithPath("data.productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("data.productStatus").type(JsonFieldType.STRING).description("상품 상태"),
                                        fieldWithPath("data.thumbnailImageURL").type(JsonFieldType.STRING).description("상품 썸네일 이미지 URL"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("수정 날짜")
                                )
                        )


                ));




    }

    @Test
    public void readAllProducts() throws Exception{

        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        List<Product> products = List.of(
                new Product(1, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(2, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(3, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(4, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(5, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]")
        );

        Page<Product> productPage = new PageImpl<>(products, PageRequest.of(1, 10), products.size());

        given(productFacade.readProducts(Mockito.any(Pageable.class))).willReturn(productPage);


        // when
        ResultActions getsActions =
                mockMvc.perform(
                        get(PRODUCT_DEFAULT_URL + "/all")
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
                        "get-all-products",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(parameterWithName("page").description("Page 번호"),
                                        parameterWithName("size").description("Size 크기"))
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].productId").type(JsonFieldType.NUMBER).description("상품 ID"),
                                        fieldWithPath("data[].name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("data[].price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data[].productView").type(JsonFieldType.NUMBER).description("상품 조회수"),
                                        fieldWithPath("data[].productScore").type(JsonFieldType.NUMBER).description("리뷰 평균 점수"),
                                        fieldWithPath("data[].productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("data[].productStatus").type(JsonFieldType.STRING).description("상품 상태"),
                                        fieldWithPath("data[].thumbnailImageURL").type(JsonFieldType.STRING).description("상품 썸네일 이미지 URL"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("상품 등록 날짜").optional(),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("상품 수정 날짜").optional(),

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
    public void readProducts() throws Exception{

        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        List<Product> products = List.of(
                new Product(1, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(2, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(3, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(4, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]"),
                new Product(5, "텐트", 50000, 5, 5, ProductCategory.TENT, ProductStatus.PRODUCT_FOR_SALE, "[\"imageURL\"]")
        );

        Page<Product> productPage = new PageImpl<>(products, PageRequest.of(1, 10), products.size());

        given(productFacade.readProducts(Mockito.any(ProductCategory.class), Mockito.any(Pageable.class))).willReturn(productPage);


        // when
        ResultActions getsActions =
                mockMvc.perform(
                        get(PRODUCT_DEFAULT_URL + "/category" + "/{category}", ProductCategory.TENT)
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
                        "get-category-products",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("category").description("조회할 상품 카테고리")
                        ),
                        requestParameters(
                                List.of(parameterWithName("page").description("Page 번호"),
                                        parameterWithName("size").description("Size 크기"))
                        ),
                        responseFields(
                                List.of(fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].name").type(JsonFieldType.STRING).description("상품 이름"),
                                        fieldWithPath("data[].price").type(JsonFieldType.NUMBER).description("상품 가격"),
                                        fieldWithPath("data[].productView").type(JsonFieldType.NUMBER).description("상품 조회수"),
                                        fieldWithPath("data[].productScore").type(JsonFieldType.NUMBER).description("리뷰 평균 점수"),
                                        fieldWithPath("data[].productCategory").type(JsonFieldType.STRING).description("상품 카테고리"),
                                        fieldWithPath("data[].productStatus").type(JsonFieldType.STRING).description("상품 상태"),
                                        fieldWithPath("data[].thumbnailImageURL").type(JsonFieldType.STRING).description("상품 썸네일 이미지 URL"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("상품 등록 날짜").optional(),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("상품 수정 날짜").optional(),
                                        fieldWithPath("data[].productId").type(JsonFieldType.NUMBER).description("상품 ID"),

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
    public void deleteProduct() throws Exception{
        doNothing().when(productService).deleteProduct(Mockito.anyLong());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        // when
        ResultActions deleteAction =
                mockMvc.perform(
                        delete(PRODUCT_DEFAULT_URL + "/{productId}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .headers(headers)
                );

        // then
        deleteAction.andExpect(status().isNoContent())
                .andDo(document(
                            "delete-product",
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
                                    parameterWithName("productId").description("삭제할 상품 ID")
                            )
                    )
                );
    }




}
