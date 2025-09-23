package com.aibeni.resume.skill;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="skills")
public class Skill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="profile_id", nullable=false)
    private Long profileId;

    @Column(nullable=false, length=120)
    private String name;

    @Column(nullable=false)
    private int level; // 0..100
}
