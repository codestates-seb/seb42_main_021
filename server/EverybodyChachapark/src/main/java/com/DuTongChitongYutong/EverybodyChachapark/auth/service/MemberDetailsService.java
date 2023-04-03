package com.DuTongChitongYutong.EverybodyChachapark.auth.service;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import com.DuTongChitongYutong.EverybodyChachapark.domain.member.service.MemberService;
import com.DuTongChitongYutong.EverybodyChachapark.auth.utils.CustomAuthorityUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberService memberService;
    private final CustomAuthorityUtils authorityUtils;



    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member findedMember = memberService.findByEmail(email);
        return new MemberDetails(findedMember);
    }

    @AllArgsConstructor
    @Getter
    public class MemberDetails implements UserDetails {
        private Member member;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(member.getRoles());
        }

        @Override
        public String getUsername() {
            return member.getEmail();
        }

        @Override
        public String getPassword() {
            return member.getPassword();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

    }

}
