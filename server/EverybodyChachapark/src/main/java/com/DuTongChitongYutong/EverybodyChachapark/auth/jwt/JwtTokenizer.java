package com.DuTongChitongYutong.EverybodyChachapark.auth.jwt;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {

    private Key key;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public JwtTokenizer(@Value("${jwt.key}") String secretKey) {
        String base64EncodedSecretKey = Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(Member member) {

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, accessTokenExpirationMinutes);

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", member.getRoles());
        claims.put("email", member.getEmail());
        claims.put("nickname", member.getNickname());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(member.getEmail())
                .setSubject(member.getNickname())
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(calendar.getTime())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(Member member) {

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, refreshTokenExpirationMinutes);

        return Jwts.builder()
                .setSubject(member.getEmail())
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(calendar.getTime())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims parseClaims(String jws) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody();
    }

}
