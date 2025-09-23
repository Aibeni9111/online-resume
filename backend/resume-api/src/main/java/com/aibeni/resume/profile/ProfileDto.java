package com.aibeni.resume.profile;

public record ProfileDto(
        Long id, String fullName, String headline, String summary,
        String email, String phone, String location, String website, String github
) {
    public static ProfileDto from(Profile p) {
        return new ProfileDto(
                p
                        .getId(), p.getFullName(), p.getHeadline(), p.getSummary(),
                p.getEmail(), p.getPhone(), p.getLocation(), p.getWebsite(), p.getGithub()
        );
    }
}
