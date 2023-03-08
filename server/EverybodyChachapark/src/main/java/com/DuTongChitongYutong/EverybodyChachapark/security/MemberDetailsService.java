package com.DuTongChitongYutong.EverybodyChachapark.security;

import com.DuTongChitongYutong.EverybodyChachapark.member.Member;
import com.DuTongChitongYutong.EverybodyChachapark.member.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final UserAuthorityUtils userAuthorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, UserAuthorityUtils userAuthorityUtils) {
        this.memberRepository = memberRepository;
        this.userAuthorityUtils = userAuthorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return userAuthorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
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
