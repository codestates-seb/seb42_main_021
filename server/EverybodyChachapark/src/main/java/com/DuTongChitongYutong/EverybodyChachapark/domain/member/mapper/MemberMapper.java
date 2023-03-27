package com.DuTongChitongYutong.EverybodyChachapark.domain.member.mapper;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.dto.MemberDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    default Member memberPostDtoToMember(MemberDto.Post post) {

        Member member = new Member();
        member.setEmail(post.getEmail());
        member.setPassword(post.getPassword());
        member.setNickname(post.getNickname());

        return member;
    }

    default Member memberPatchDtoToMember(MemberDto.Patch patch) {
        Member member = new Member();

        member.setPassword(patch.getPassword());
        member.setNickname(patch.getNickname());
        member.setComment(patch.getComment());
        return member;
    }


    // 회원 가입 응답매퍼 : 회원을 생성했을때와 조회할대 응답값을 따로 받기위하여 매퍼를 2개로 구성함
    default MemberDto.CreateResponse createMemberToMemberResponseDto(Member member) {

        if (member == null) {
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String nickname = null;
            String profileImg = null;
            LocalDateTime createDate = null;
            if (member.getMemberId() != null) {
                memberId = member.getMemberId();
            }
            email = member.getEmail();
            nickname = member.getNickname();
            profileImg = member.getProfileImg();
            createDate = member.getCreatedAt();
            MemberDto.CreateResponse response = new MemberDto.CreateResponse(memberId, email, nickname, profileImg, createDate);
            return response;
        }
    }

    // 마이페이지 응답매퍼 : 회원을 생성했을때와 조회할대 응답값을 따로 받기위하여 매퍼를 2개로 구성함
    default MemberDto.Response memberToMemberResponseDto(Member member) {

        if (member == null) {
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String nickname = null;
            String profileImg = null;
            String comment = null;
            Member.MemberStatus memberStatus = null;
            LocalDateTime createDate = null;
            if (member.getMemberId() != null) {
                memberId = member.getMemberId();
            }
            email = member.getEmail();
            nickname = member.getNickname();
            memberStatus = member.getMemberStatus();
            profileImg = member.getProfileImg();
            comment = member.getComment();
            createDate = member.getCreatedAt();
            MemberDto.Response response = new MemberDto.Response(memberId, email, nickname, profileImg, comment, memberStatus, createDate);
            return response;
        }
    }
}
