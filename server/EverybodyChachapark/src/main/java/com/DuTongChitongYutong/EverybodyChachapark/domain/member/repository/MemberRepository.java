package com.DuTongChitongYutong.EverybodyChachapark.domain.member.repository;

import com.DuTongChitongYutong.EverybodyChachapark.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);
}
