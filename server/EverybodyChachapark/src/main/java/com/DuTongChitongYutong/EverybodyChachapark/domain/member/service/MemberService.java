package com.DuTongChitongYutong.EverybodyChachapark.domain.member.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.security.utils.CustomAuthorityUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final FacadeImage facadeImage;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, FacadeImage facadeImage) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.facadeImage = facadeImage;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        member.setProfileImg(facadeImage.makeProfileImage());

        Member savedMember = memberRepository.save(member);
        //publisher.publishEvent(new MemberRegistrationApplicationEvent(this, savedMember));

        return savedMember;
    }

    public Member updateMemberInfo(Member member) {
        Member findMember = findByEmail();

        if (member.getPassword() != null) {
            findMember.setPassword(passwordEncoder.encode(member.getPassword()));
        }

        Optional.ofNullable(member.getNickname()).ifPresent(username -> findMember.setNickname(username));
        verifyExistsNickName(member.getNickname());
        Optional.ofNullable(member.getComment()).ifPresent(comment -> findMember.setComment(comment));

        return memberRepository.save(findMember);
    }
    
    public Member updateMemberImage(MultipartFile profileImageFile) {
        Member findMember = findByEmail();

        if(!profileImageFile.isEmpty()) { // 이미지 변경
            String imageURL = findMember.getProfileImg();
            facadeImage.deleteImage(imageURL);

            imageURL = facadeImage.createImageURL(profileImageFile);
            findMember.setProfileImg(imageURL);
        }

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember (long memberId) {
        Member authMember = findByEmail();

        Member member = authMember.getMemberId() == memberId ? authMember : findVerifiedMember(memberId);

        return member;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public boolean verifyAskedMember(long memberId1, long memberId2) { // 작성자 검증
        return memberId1 == memberId2;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    private void verifyExistsNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NICKNAME_EXISTS);
    }

    public Member findByEmail() {
        String email = getCurrentMemberEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public String getCurrentMemberEmail() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Transactional
    public Member findByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void deleteMember(HttpServletRequest request) {
        //String accessToken = request.getHeader("Authorization").substring(7);
        Member findMember = findByEmail();

        memberRepository.delete(findMember);
    }


}
