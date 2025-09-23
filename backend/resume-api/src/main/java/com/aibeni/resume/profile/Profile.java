package com.aibeni.resume.profile;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="full_name", nullable=false, length=120)
    private String fullName;

    @Column(name="headline", length=160)
    private String headline;

    @Column(name = "summary", columnDefinition = "text")
    private String summary;

    @Column(name="email", nullable=false, length=160)
    private String email;

    @Column(name="phone", length=60)
    private String phone;

    @Column(name="location", length=120)
    private String location;

    @Column(name="website", length=200)
    private String website;

    @Column(name="github", length=200)
    private String github;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        var now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }
    @PreUpdate
    void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
