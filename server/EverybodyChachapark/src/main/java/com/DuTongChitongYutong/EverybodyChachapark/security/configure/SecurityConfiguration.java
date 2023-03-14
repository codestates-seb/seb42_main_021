package com.DuTongChitongYutong.EverybodyChachapark.security.configure;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository.MemberRepository;
import com.DuTongChitongYutong.EverybodyChachapark.security.hendler.MemberAccessDeniedHandler;
import com.DuTongChitongYutong.EverybodyChachapark.security.hendler.MemberAuthenticationEntryPoint;
import com.DuTongChitongYutong.EverybodyChachapark.security.hendler.MemberAuthenticationFailureHandler;
import com.DuTongChitongYutong.EverybodyChachapark.security.hendler.MemberAuthenticationSuccessHandler;
import com.DuTongChitongYutong.EverybodyChachapark.security.jwt.JwtAuthenticationFilter;
import com.DuTongChitongYutong.EverybodyChachapark.security.jwt.JwtTokenizer;
import com.DuTongChitongYutong.EverybodyChachapark.security.jwt.JwtVerificationFilter;
import com.DuTongChitongYutong.EverybodyChachapark.security.service.MemberDetailsService;
import com.DuTongChitongYutong.EverybodyChachapark.security.utils.CustomAuthorityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@CrossOrigin
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberDetailsService memberDetailsService;
    private final ObjectMapper mapper;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberDetailsService memberDetailsService, ObjectMapper mapper) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberDetailsService = memberDetailsService;
        this.mapper = mapper;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()

                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())

                .and()
                .apply(new CustomFilterConfigurer(jwtTokenizer, authorityUtils, memberDetailsService, mapper))

                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/members/signup").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/mypage").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/carts").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/carts").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/reviews").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/reviews/*").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/reviews/*").hasRole("USER")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization", "Refresh"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
