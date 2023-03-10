package com.DuTongChitongYutong.EverybodyChachapark.member;

import com.DuTongChitongYutong.EverybodyChachapark.response.ResponseInfo;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
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

    @PostMapping("/signup")
    public ResponseEntity postMember (@RequestBody MemberDto.Post post) {

        Member createdMember = memberService.createMember(mapper.memberToMemberPostDto(post));

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(createdMember), "회원 가입 되었습니다.", HttpStatus.CREATED, null),HttpStatus.CREATED);
        //return new ResponseEntity(ResponseDto.success(createdMember, "회원 가입 되었습니다.", HttpStatus.CREATED), HttpStatus.CREATED);
    }
}
