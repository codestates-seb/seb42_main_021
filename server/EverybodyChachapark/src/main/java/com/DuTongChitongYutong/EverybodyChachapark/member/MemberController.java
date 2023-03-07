package com.DuTongChitongYutong.EverybodyChachapark.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember (@RequestBody MemberDto.Post post) {

        Member createdMember = memberService.createMember(mapper.memberToMemberPostDto(post));

        return new ResponseEntity(mapper.memberToMemberResponseDto(createdMember),HttpStatus.CREATED);

    }
}
