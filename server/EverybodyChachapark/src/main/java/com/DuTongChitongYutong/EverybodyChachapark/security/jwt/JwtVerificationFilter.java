package com.DuTongChitongYutong.EverybodyChachapark.security.jwt;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.security.exception.AuthExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.security.exception.SecurityAuthException;
import com.DuTongChitongYutong.EverybodyChachapark.security.repository.RefreshTokenRepository;
import com.DuTongChitongYutong.EverybodyChachapark.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final String HEADER_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Claims accessTokenClaims = verifyJws(request, response);
            if (accessTokenClaims != null) {
                setAuthenticationToContext(accessTokenClaims);
            }
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Claims verifyJws(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = request.getHeader("Authorization").substring(HEADER_PREFIX.length());
        String refreshToken = request.getHeader("Refresh");

        if (refreshTokenRepository.findBy(accessToken) != null) {
            throw new SecurityAuthException(AuthExceptionCode.MEMBER_LOGOUT);
        }

        Claims refreshTokenClaims = null;

        try {
            refreshTokenClaims = jwtTokenizer.parseClaims(refreshToken);
            return jwtTokenizer.parseClaims(accessToken);
        } catch (ExpiredJwtException ee) {
            if (refreshTokenClaims != null) {
                String findRefreshToken = refreshTokenRepository.findBy(refreshTokenClaims.getSubject());

                if (refreshToken.equals(findRefreshToken)) {
                    Member findMember = memberRepository.findByEmail(refreshTokenClaims.getSubject()).orElse(null);
                    String newAccessToken = jwtTokenizer.generateAccessToken(findMember);
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    return jwtTokenizer.parseClaims(newAccessToken);
                }
            }
            request.setAttribute("exception", ee);
            return null;
        }
    }

    private void setAuthenticationToContext(Claims claims) {
        String email = (String) claims.get("email");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));

        UsernamePasswordAuthenticationToken token =
                UsernamePasswordAuthenticationToken.authenticated(email, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(token);
    }
}
