package com.DuTongChitongYutong.EverybodyChachapark.domain.member.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.dto.MemberDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.mapper.MemberMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.util.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;

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

        Member createdMember = memberService.createMember(mapper.memberPostDtoToMember(post));
        //URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        //return ResponseEntity.created(location).build();
        return new ResponseEntity(new SingleResponseDto<>(mapper.createMemberToMemberResponseDto(createdMember)),HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity updateMember(@Valid @RequestBody MemberDto.Patch patch) {
        Member updatedMember = memberService.updateMember(mapper.memberPatchDtoToMember(patch));
        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(updatedMember)), HttpStatus.OK);
    }

    @GetMapping("/mypage/{member-id}")
    public ResponseEntity getMember (@PathVariable ("member-id") long memberId) {
        Member findMember = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponseDto(findMember);
        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember (HttpServletRequest request) {
        //String accessToken = request.getHeader("Authorization").substring(7);
        memberService.deleteMember(request);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
