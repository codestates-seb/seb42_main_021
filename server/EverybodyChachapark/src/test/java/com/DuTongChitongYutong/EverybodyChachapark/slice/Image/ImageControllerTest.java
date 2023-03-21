package com.DuTongChitongYutong.EverybodyChachapark.slice.Image;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.controller.ImageController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.util.GetMockMultipartFile;
import com.DuTongChitongYutong.EverybodyChachapark.util.JsonListHelper;
import com.google.gson.Gson;
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
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;

@WebMvcTest(ImageController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class ImageControllerTest {
    private final static String IMAGE_DEFAULT_URL = "/images";

    @Autowired
    private Gson gson;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FacadeImage facadeImage;

    @MockBean
    private JsonListHelper jsonListHelper;

    @Test
    public void postUploadImage() throws Exception {
        // given
        String imageURL = "[\"http://localhost:8080/images/NotfoundImage.jpg\"]";

        given(facadeImage.createImageURLs(Mockito.anyList())).willReturn(imageURL);

        List<String> imageURLs = List.of("http://localhost:8080/images/NotfoundImage.jpg");

        given(jsonListHelper.jsonToList(Mockito.anyString())).willReturn(imageURLs);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        // when
        ResultActions postAction =
                mockMvc.perform(
                        multipart(IMAGE_DEFAULT_URL + "/upload")
                                .file(GetMockMultipartFile.getMockMultipartFile("imageFile"))
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .headers(headers)
                );

        // then
        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data[0]").value(imageURLs.get(0)))
                .andDo(document(
                        "post-images-upload",
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
                                partWithName("imageFile").description("업로드할 이미지 첨부 파일(복수가능, NULL가능)")
                        ),
                        responseFields(
                                List.of(fieldWithPath("data[]").type(JsonFieldType.ARRAY).description("이미지 URL"),
                                        fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("응답된 URL 개수")
                                )
                        )
                ));

    }

    @Test
    public void getDownloadImage() throws Exception {
        String imageFileName = "NotfoundImage.jpg";

        given(facadeImage.loadImage(Mockito.anyString())).willReturn(null);

        ResultActions getAction =
                mockMvc.perform(
                        get(IMAGE_DEFAULT_URL + "/{image-name}", imageFileName)
                );

        getAction
                .andExpect(status().isOk())
                .andDo(document(
                        "get-image-download",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("image-name").description("요청 이미지 파일명(ex. 1512412-23125-4123.jpg)")
                        )
                ));
    }

}
