package com.DuTongChitongYutong.EverybodyChachapark.security.repository;

import com.DuTongChitongYutong.EverybodyChachapark.security.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Repository
public class RefreshTokenRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtTokenizer jwtTokenizer;

    public RefreshTokenRepository(RedisTemplate<String, String> redisTemplate, JwtTokenizer jwtTokenizer) {
        this.redisTemplate = redisTemplate;
        this.jwtTokenizer = jwtTokenizer;
    }

    public void save(String email, String refreshToken){
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey);
        redisTemplate.opsForValue().set(
                email, refreshToken, claims.getBody().getExpiration().getTime() - new Date().getTime(), TimeUnit.MILLISECONDS
        );
    }



    public String findBy(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteBy(String key) {
        redisTemplate.delete(key);
    }

    public void setBlackList(String accessToken) {
        String base64EncodedSecretKey = jwtTokenizer.getSecretKey();
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(base64EncodedSecretKey.getBytes(StandardCharsets.UTF_8))
                .build().parseClaimsJws(accessToken);
        Date expiration = claims.getBody().getExpiration();
        redisTemplate.opsForValue().set(accessToken, "logout", expiration.getTime() - new Date().getTime(),
                TimeUnit.MILLISECONDS);
    }
}
