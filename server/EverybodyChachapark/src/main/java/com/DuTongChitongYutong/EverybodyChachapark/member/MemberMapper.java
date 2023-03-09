package com.DuTongChitongYutong.EverybodyChachapark.member;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    default Member memberToMemberPostDto(MemberDto.Post post) {

        Member member = new Member();
        member.setEmail(post.getEmail());
        member.setPassword(post.getPassword());
        member.setNickname(post.getNickname());

        return member;
    }

    ;

    default MemberDto.Response memberToMemberResponseDto(Member member) {

        if (member == null) {
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String nickname = null;
            Member.MemberStatus memberStatus = null;
            if (member.getMemberId() != null) {
                memberId = member.getMemberId();
            }

            email = member.getEmail();
            nickname = member.getNickname();
            memberStatus = member.getMemberStatus();
            MemberDto.Response response = new MemberDto.Response(memberId, email, nickname, memberStatus);
            return response;
        }
    }
}
