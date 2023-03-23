package com.DuTongChitongYutong.EverybodyChachapark.domain.member.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.dto.MemberDto;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.mapper.MemberMapper;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.response.SingleResponseDto;
import com.DuTongChitongYutong.EverybodyChachapark.util.UriCreator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity postMember (@Valid @RequestBody MemberDto.Post post) {
        Member createdMember = memberService.createMember(mapper.memberPostDtoToMember(post));
        return new ResponseEntity(new SingleResponseDto<>(mapper.createMemberToMemberResponseDto(createdMember)),HttpStatus.CREATED);
    }

    @PatchMapping("/info")
    public ResponseEntity updateMemberInfo(@Valid @RequestBody MemberDto.Patch patch) {
        Member updatedMember = memberService.updateMemberInfo(mapper.memberPatchDtoToMember(patch));
        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(updatedMember)), HttpStatus.OK);
    }

    @PatchMapping("/profile-image")
    public ResponseEntity updateMemberImage(@RequestPart(name = "profileImageFile", required = false) MultipartFile profileImageFile) {
        Member updatedMember = memberService.updateMemberImage(profileImageFile);
        return new ResponseEntity(new SingleResponseDto<>(mapper.memberToMemberResponseDto(updatedMember)), HttpStatus.OK);
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
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/logout")
    public ResponseEntity logout (HttpServletRequest request) {
        memberService.logout(request);
        return new ResponseEntity(HttpStatus.OK);
    }
}
