package com.DuTongChitongYutong.EverybodyChachapark.auth.controller;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtTokenizer;
import com.DuTongChitongYutong.EverybodyChachapark.auth.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RefreshTokenController {

    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    //토큰이 만료되었을 때 refresh 토큰을 검증하여 새로운 access 토큰을 받기위한 로직
    @PostMapping("/refresh")
    public ResponseEntity postRefreshToken (@RequestHeader("Authorization") String accessToken,
                                            @RequestHeader("Refresh") String refreshToken) {
        String rtk = refreshToken;

        if (rtk == null || rtk.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Refresh 토큰을 확인해주세요");
        }

        String atk = accessToken;
        if (atk == null || atk.trim().isEmpty() || atk.equals("Undefined")) {
            atk = "";
        }

        Claims refreshTokenClaims = null;

        try {
            refreshTokenClaims = jwtTokenizer.parseClaims(rtk);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        String findRefreshToken = refreshTokenRepository.findBy(refreshTokenClaims.getSubject());

        if (!rtk.equals(findRefreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        Member findMember = memberRepository.findByEmail(refreshTokenClaims.getSubject()).orElse(null);
        String newAccessToken = jwtTokenizer.generateAccessToken(findMember);
        refreshTokenRepository.deleteBy(rtk);
        refreshTokenRepository.save(rtk, newAccessToken);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + newAccessToken);

        return ResponseEntity.ok().headers(headers).body("Success");
    }
}
