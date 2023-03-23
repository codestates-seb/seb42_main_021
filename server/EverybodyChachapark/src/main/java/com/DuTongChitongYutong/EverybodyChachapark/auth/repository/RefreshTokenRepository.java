package com.DuTongChitongYutong.EverybodyChachapark.auth.repository;

import com.DuTongChitongYutong.EverybodyChachapark.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Repository
public class RefreshTokenRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtTokenizer jwtTokenizer;

    public void save(String email, String refreshToken){
        redisTemplate.opsForValue().set(
                email, refreshToken, jwtTokenizer.parseClaims(refreshToken).getExpiration().getTime() - new Date().getTime(),
                TimeUnit.MINUTES
        );
    }

    public String findBy(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteBy(String key) {
        redisTemplate.delete(key);
    }

    public void setBlackList(String accessToken) {
        Claims claims = jwtTokenizer.parseClaims(accessToken);
        Date expiration = claims.getExpiration();

        redisTemplate.opsForValue().set(
                accessToken, "logout", expiration.getTime() - new Date().getTime(),
                TimeUnit.MINUTES
        );
    }
}
