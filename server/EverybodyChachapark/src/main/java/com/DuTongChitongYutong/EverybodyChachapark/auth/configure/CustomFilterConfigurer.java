package com.DuTongChitongYutong.EverybodyChachapark.auth.configure;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.auth.hendler.MemberAuthenticationFailureHandler;
import com.DuTongChitongYutong.EverybodyChachapark.auth.hendler.MemberAuthenticationSuccessHandler;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtAuthenticationFilter;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtTokenizer;
import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtVerificationFilter;
import com.DuTongChitongYutong.EverybodyChachapark.auth.repository.RefreshTokenRepository;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.CustomAuthorityUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@AllArgsConstructor
public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;


    @Override
    public void configure(HttpSecurity builder) {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenizer, refreshTokenRepository);
        jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
        jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

        JwtVerificationFilter jwtVerificationFilter =
                new JwtVerificationFilter(jwtTokenizer, authorityUtils, refreshTokenRepository, memberRepository);

        builder
                .addFilter(jwtAuthenticationFilter)
                .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
    }
}
