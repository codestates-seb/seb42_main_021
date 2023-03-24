package com.DuTongChitongYutong.EverybodyChachapark.auth.hendler;

import com.DuTongChitongYutong.EverybodyChachapark.auth.repository.RefreshTokenRepository;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtTokenizer;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.CustomAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Oauth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberService memberService;
    private final RefreshTokenRepository refreshTokenRepository;

    public Oauth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils customAuthorityUtils,
                                      MemberService memberService, RefreshTokenRepository refreshTokenRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.memberService = memberService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        saveMember(email);
        redirect(request, response, email);
    }

    private void saveMember(String email) {
        Member member = new Member(email);
        String password = "123456789";
        String nickname = email;
        member.setPassword(password);
        member.setNickname(nickname);
        memberService.createMember(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String email) throws IOException {
        Member member = new Member(email);

        String accessToken = delegateAccessToken(member);
        String refreshToken =  delegateRefreshToken(member);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member) {
        List<String> roles = List.of("USER");
        member.setRoles(roles);
        String accessToken = jwtTokenizer.generateAccessToken(member);
        return "Bearer " + accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String refreshToken = jwtTokenizer.generateRefreshToken(member);
        refreshTokenRepository.save(member.getEmail(), refreshToken);
        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(80)
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
