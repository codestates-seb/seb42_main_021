package com.DuTongChitongYutong.EverybodyChachapark.member;

import com.DuTongChitongYutong.EverybodyChachapark.dto.ResponseDto;
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

        return new ResponseEntity(new ResponseDto<>(mapper.memberToMemberResponseDto(createdMember), 201, "회원 가입 되었습니다.", null),HttpStatus.CREATED);
        //return new ResponseEntity(ResponseDto.success(createdMember, "회원 가입 되었습니다.", HttpStatus.CREATED), HttpStatus.CREATED);
    }
}
