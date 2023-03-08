package com.DuTongChitongYutong.EverybodyChachapark.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {
    private final MemberDetailsService memberDetailsService;
    private final PasswordEncoder passwordEncoder;

    public UserAuthenticationProvider(MemberDetailsService memberDetailsService, PasswordEncoder passwordEncoder) {
        this.memberDetailsService = memberDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate (Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication;

        String username = authToken.getName();
        Optional.ofNullable(username).orElseThrow(() -> new UsernameNotFoundException("회원 이름 또는 비밀번호를 찾을 수 없습니다."));

        UserDetails userDetails = memberDetailsService.loadUserByUsername(username);

        String password = userDetails.getPassword();
        verifyCredentials(authToken.getCredentials(), password);

        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        return UsernamePasswordAuthenticationToken.authenticated(username, password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }

    private void verifyCredentials(Object credentials, String password) {
        if (!passwordEncoder.matches((String)credentials, password)) {
            throw new BadCredentialsException("회원 이름 또는 비밀번호가 일치하지 않습니다.");
        }
    }
}
