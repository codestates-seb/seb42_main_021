package com.DuTongChitongYutong.EverybodyChachapark.member;

import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
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

        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(createdMember)),HttpStatus.CREATED);
        //return new ResponseEntity(ResponseDto.success(createdMember, "회원 가입 되었습니다.", HttpStatus.CREATED), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity updateMember(@Valid @RequestBody MemberDto.Patch patch) {
        memberService.updateMember(mapper.memberToMemberPatchDto(patch));
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/mypage")
    public ResponseEntity getMember () {
        Member findMember = memberService.findByEmail();
        MemberDto.Response response = mapper.memberToMemberResponseDto(findMember);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember (HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        memberService.deleteMember(request);
        return new ResponseEntity(HttpStatus.OK);
    }
}
