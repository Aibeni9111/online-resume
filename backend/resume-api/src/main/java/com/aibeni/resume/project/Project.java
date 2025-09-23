package com.aibeni.resume.project;

import com.aibeni.resume.profile.Profile;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="project")
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=160)
    private String title;             // Название проекта

    @Column(length=400)
    private String summary;           // Короткое описание

    @Column(length=300)
    private String url;               // Ссылка (GitHub/Live)

    @Column(length=200)
    private String stack;             // Стек: "Java, Spring Boot, React"

    private LocalDate startedAt;      // Когда начал
    private LocalDate finishedAt;     // Когда закончил (optional)

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="profile_id")
    private Profile profile;
}
