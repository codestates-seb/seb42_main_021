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
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
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
        MemberDto.Post postMember = new MemberDto.Post("user@gmail.com", "1234", "user", "Image.link");
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
                                        fieldWithPath("profileImg").type(JsonFieldType.STRING).description("이미지URL")
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
                "Img.link", Member.MemberStatus.MEMBER_ACTIVE, LocalDateTime.now());

        given(memberMapper.memberPatchDtoToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(patchResponse);

        //when
        ResultActions patchAction = mockMvc.perform(
                patch("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
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
                        requestFields(
                                List.of(
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 ID (이메일)"),
                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.profileImg").type(JsonFieldType.STRING).description("프로필 이미지 URL"),
                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("data.createDate").type(JsonFieldType.STRING).description("회원 생성 날짜")
                                )
                        )
                        ));
    }

    @Test
    public void getMemberTest() throws Exception {
        //given
        long memberId = 1L;

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());

        MemberDto.Response getResponse = new MemberDto.Response(1, "user@gmail.com", "user",
                "Img.link", Member.MemberStatus.MEMBER_ACTIVE, LocalDateTime.now());

        given(memberMapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(getResponse);

        //when
        ResultActions getAction = mockMvc.perform(
                get("/members/mypage/{member-id}", memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                );

        getAction
                .andExpect(status().isOk())
                .andDo(
                document("get-member",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별 ID"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 ID (이메일)"),
                                        fieldWithPath("data.nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("data.profileImg").type(JsonFieldType.STRING).description("프로필 이미지 URL"),
                                        fieldWithPath("data.memberStatus").type(JsonFieldType.STRING).description("회원 상태"),
                                        fieldWithPath("data.createDate").type(JsonFieldType.STRING).description("회원 생성 날짜")
                                )
                        )
                ));

    }

    @Test
    public void deleteMemberTest() throws Exception {
        // given
        doNothing().when(memberService).deleteMember(Mockito.any());
        //when
        ResultActions deleteAction = mockMvc.perform(
                delete("/members")
                        .accept(MediaType.APPLICATION_JSON)
                );

        deleteAction
                .andExpect(status().isNoContent())
                .andDo(
                        document("delete-member",
                                getRequestPreProcessor(),
                                getResponsePreProcessor())
                );
    }
}
