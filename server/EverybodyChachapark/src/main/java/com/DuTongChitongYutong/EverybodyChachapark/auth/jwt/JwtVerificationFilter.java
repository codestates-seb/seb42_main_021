package com.DuTongChitongYutong.EverybodyChachapark.auth.jwt;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.exception.SecurityAuthExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.exception.SecurityAuthException;
import com.DuTongChitongYutong.EverybodyChachapark.auth.repository.RefreshTokenRepository;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.CustomAuthorityUtils;
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
        } catch (SecurityAuthException e) {
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
        String accessToken = request.getHeader("Authorization").substring(7);
        String refreshToken = request.getHeader("Refresh");

        if (refreshTokenRepository.findBy(accessToken) != null) {
            throw new SecurityAuthException(SecurityAuthExceptionCode.MEMBER_LOGOUT);
        }

        Claims refreshTokenClaims = null;

        try {
            refreshTokenClaims = jwtTokenizer.parseClaims(refreshToken);
            return jwtTokenizer.parseClaims(accessToken);
        } catch (ExpiredJwtException ee) {
            // access-token이 만료되면 자동으로 header에 새로운 토큰을 응답해주는 로직, RefreshController 사용 후 활용하지 않는 기능
            /*if (refreshTokenClaims != null) {
                String findRefreshToken = refreshTokenRepository.findBy(refreshTokenClaims.getSubject());

                if (refreshToken.equals(findRefreshToken)) {
                    Member findMember = memberRepository.findByEmail(refreshTokenClaims.getSubject()).orElse(null);
                    String newAccessToken = jwtTokenizer.generateAccessToken(findMember);
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    return jwtTokenizer.parseClaims(newAccessToken);
                }
            }*/
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
