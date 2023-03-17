package com.DuTongChitongYutong.EverybodyChachapark.slice.member;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.controller.MemberController;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.dto.MemberDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;

import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.DuTongChitongYutong.EverybodyChachapark.util.ApiDocumentUtils.getResponsePreProcessor;
import static io.jsonwebtoken.Jwts.header;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper memberMapper;

    @Test
    public void postMemberTest() throws Exception {
        //given
        MemberDto.Post postMember = new MemberDto.Post("user@gmail.com", "1234", "user",
                "Image.link", "comment");
        String content = gson.toJson(postMember);

        given(memberMapper.memberPostDtoToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());

        Member mockResultMember = new Member();
        mockResultMember.setMemberId(1L);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);

        MemberDto.CreateResponse response = new MemberDto.CreateResponse(1L,"user@gmail.com","user"
                ,"Image.link",LocalDateTime.now());

        given(memberMapper.createMemberToMemberResponseDto(Mockito.any(Member.class))).willReturn(response);

        //when
        ResultActions postAction = mockMvc.perform(
                post("/members/signup")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                );

        //then
        postAction
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.memberId").value(response.getMemberId()))
                .andExpect(jsonPath("$.data.email").value(response.getEmail()))
                .andExpect(jsonPath("$.data.nickname").value(response.getNickname()))
                .andExpect(jsonPath("$.data.profileImg").value(response.getProfileImg()))
                .andDo(document(
                        "post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("이미지URL"),
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("소개글 (null 처리 가능하므로 별도 데이터 안주셔도 됩니다)")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 ID (이메일)"),
                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.profileImg").type(JsonFieldType.STRING).description("프로필 이미지 URL"),
                                        fieldWithPath("data.createDate").type(JsonFieldType.STRING).description("회원 생성 날짜")
                                )
                        )
                ));
    }

    @Test
    public void patchMemberTest() throws Exception {
        //given
        MemberDto.Patch patchMember = new MemberDto.Patch();
        patchMember.setPassword("5678");
        patchMember.setNickname("user2");
        String content = gson.toJson(patchMember);

        MemberDto.Response patchResponse = new MemberDto.Response(1, "user@gmail.com", "user2",
                "Img.link", "comment", Member.MemberStatus.MEMBER_ACTIVE, LocalDateTime.now());

        given(memberMapper.memberPatchDtoToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(patchResponse);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        //when
        ResultActions patchAction = mockMvc.perform(
                patch("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .headers(headers)
                );

        patchAction
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.memberId").value(patchResponse.getMemberId()))
                .andExpect(jsonPath("$.data.email").value(patchResponse.getEmail()))
                .andExpect(jsonPath("$.data.nickname").value(patchResponse.getNickname()))
                .andExpect(jsonPath("$.data.profileImg").value(patchResponse.getProfileImg()))
                .andDo(document("patch-member",
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
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임").optional(),
                                        fieldWithPath("comment").type(JsonFieldType.STRING).description("소개글 (null 처리도 가능)").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 ID (이메일)"),
                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.profileImg").type(JsonFieldType.STRING).description("프로필 이미지 URL"),
                                        fieldWithPath("data.comment").type(JsonFieldType.STRING).description("간단한 자기소개 글"),
                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("data.createDate").type(JsonFieldType.STRING).description("회원 생성 날짜")
                                )
                        )
                        ));
    }

    @Test
    public void getMemberTest() throws Exception {
        //given

        given(memberService.findByEmail()).willReturn(new Member());

        MemberDto.Response getResponse = new MemberDto.Response(1, "user@gmail.com", "user",
                "Img.link", "comment" ,Member.MemberStatus.MEMBER_ACTIVE, LocalDateTime.now());

        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(getResponse);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        //when
        ResultActions getAction = mockMvc.perform(
                get("/members/mypage")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(headers)
                );

        getAction
                .andExpect(status().isOk())
                .andDo(
                document("get-member",
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
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 ID (이메일)"),
                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.profileImg").type(JsonFieldType.STRING).description("프로필 이미지 URL"),
                                        fieldWithPath("data.comment").type(JsonFieldType.STRING).description("간단한 자기소개 글"),
                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("data.createDate").type(JsonFieldType.STRING).description("회원 생성 날짜")
                                )
                        )
                ));

    }

    @Test
    public void deleteMemberTest() throws Exception {
        // given
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer ".concat("adfadf"));
        headers.add("Refresh", "adasdsad");

        doNothing().when(memberService).deleteMember(Mockito.any());
        //when
        ResultActions deleteAction = mockMvc.perform(
                delete("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(headers)
                );

        deleteAction
                .andExpect(status().isNoContent())
                .andDo(
                        document("delete-member",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestHeaders(
                                        List.of(headerWithName("Authorization").description("인증에 필요한 " +
                                                        "Access Token (Ex. Bearer eyJhbG...) `Bearer ` 문자열을 access token 앞에 붙여야 한다."),
                                                headerWithName("Refresh").description("토큰 재발급에 필요한 " +
                                                        "Refresh Token (Ex. eyJhbG...)")
                                        )
                                )
                        )
                );
    }
}
