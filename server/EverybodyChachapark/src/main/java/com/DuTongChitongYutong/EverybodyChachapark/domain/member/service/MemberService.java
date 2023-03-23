package com.DuTongChitongYutong.EverybodyChachapark.domain.member.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.image.facade.FacadeImage;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.BusinessLogicException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.ExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.exception.SecurityAuthException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.SecurityAuthExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtTokenizer;
import com.DuTongChitongYutong.EverybodyChachapark.auth.repository.RefreshTokenRepository;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final FacadeImage facadeImage;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickName(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        member.setProfileImg(facadeImage.makeProfileImage());

        Member savedMember = memberRepository.save(member);

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
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_VALID));
    }

    //테스트
    public Member findByToken(HttpServletRequest request) {
        String token = getAccessToken(request);
        Claims claims = jwtTokenizer.parseClaims(token);

        Date expiration = claims.getExpiration();
        if (expiration.before(new Date())) {
            throw new SecurityAuthException(SecurityAuthExceptionCode.TOKEN_NOT_FOUND);
        }

        String email = claims.get("email", String.class);
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
        String accessToken = getAccessToken(request);

        Member findMember = findByEmail();

        memberRepository.delete(findMember);

        refreshTokenRepository.deleteBy(findMember.getEmail());
        refreshTokenRepository.setBlackList(accessToken);
    }

    @Transactional
    public void logout (HttpServletRequest request) {
        String accessToken = getAccessToken(request);
        String email = getCurrentMemberEmail();
        // 로그아웃 요청이 들어오면 기존 토큰 블랙리스트 처리
        refreshTokenRepository.setBlackList(accessToken);
        // refresh 토큰도 제거
        refreshTokenRepository.deleteBy(email);
    }

    @Transactional(readOnly = true)
    public List<Member> getVerifiedMembers(Set<Long> memberIds) {

        List<Member> members = memberRepository.findAllById(memberIds);

        if (members.size() != memberIds.size()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        return members;
    }

    private String getAccessToken(HttpServletRequest request) {
        return request.getHeader("Authorization").substring(7);
    }

}
