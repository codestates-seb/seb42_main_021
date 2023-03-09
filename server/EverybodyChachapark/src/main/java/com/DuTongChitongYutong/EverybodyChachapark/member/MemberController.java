package com.DuTongChitongYutong.EverybodyChachapark.member;

import com.DuTongChitongYutong.EverybodyChachapark.dto.ResponseDto;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@CrossOrigin
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

        return new ResponseEntity(new ResponseDto<>(mapper.createMemberToMemberResponseDto(createdMember), 201, "회원 가입 되었습니다.", null),HttpStatus.CREATED);
        //return new ResponseEntity(ResponseDto.success(createdMember, "회원 가입 되었습니다.", HttpStatus.CREATED), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity updateMember(@Valid @RequestBody MemberDto.Patch patch) {
        memberService.updateMember(mapper.memberToMemberPatchDto(patch));
        return new ResponseEntity(ResponseDto.success(null, "회원 정보가 변경되었습니다.", HttpStatus.OK), HttpStatus.OK);
    }

    @GetMapping("/mypage")
    public ResponseEntity getMember () {
        Member findMember = memberService.findByEmail();
        MemberDto.Response response = mapper.memberToMemberResponseDto(findMember);
        return new ResponseEntity(ResponseDto.success(response, "Mypage", HttpStatus.OK), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember (HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        memberService.deleteMember(request);
        return new ResponseEntity(ResponseDto.success(null, "정상적으로 회원 탈퇴가 되었습니다.",HttpStatus.OK), HttpStatus.OK);
    }
}
