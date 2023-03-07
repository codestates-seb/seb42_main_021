package com.DuTongChitongYutong.EverybodyChachapark.member;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    default Member memberToMemberPostDto (MemberDto.Post post) {

        Member member = new Member();
        member.setEmail(post.getEmail());
        member.setPassword(post.getPassword());
        member.setUsername(post.getUsername());

        return member;
    };

    default MemberDto.Response memberToMemberResponseDto (Member member) {

        long id = member.getMemberId();
        String email = member.getEmail();
        String password = member.getPassword();
        String username = member.getUsername();
        MemberDto.Response response = new MemberDto.Response(id, email, password, username);

        return response;

    }
}
