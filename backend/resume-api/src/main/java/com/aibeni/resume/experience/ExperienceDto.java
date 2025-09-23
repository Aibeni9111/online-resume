package com.aibeni.resume.experience;

public record ExperienceDto(
        Long id,
        String company,
        String role,
        String location,
        String startDate, // ISO yyyy-MM-dd
        String endDate,   // nullable
        String description
) {
    public static ExperienceDto from(Experience e) {
        return new ExperienceDto(
                e.getId(),
                e.getCompany(),
                e.getRole(),
                e.getLocation(),
                e.getStartDate() != null ? e.getStartDate().toString() : null,
                e.getEndDate() != null ? e.getEndDate().toString() : null,
                e.getDescription()
        );
    }
}
