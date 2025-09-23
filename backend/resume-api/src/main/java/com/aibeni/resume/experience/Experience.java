package com.aibeni.resume.experience;

import com.aibeni.resume.profile.Profile;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "experience")
public class Experience {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    private String company;
    private String role;
    private String location;

    private LocalDate startDate; // yyyy-MM-dd
    private LocalDate endDate;   // null = настоящее время

    @Column(length = 2000)
    private String description;

    // getters/setters
    public Long getId() { return id; }
    public Profile getProfile() { return profile; }
    public void setProfile(Profile profile) { this.profile = profile; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
