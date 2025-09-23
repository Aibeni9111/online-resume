package com.aibeni.resume.project;

import java.time.LocalDate;

public record ProjectDto(
        Long id,
        String title,
        String summary,
        String url,
        String stack,
        LocalDate startedAt,
        LocalDate finishedAt
) {
    public static ProjectDto from(Project p) {
        return new ProjectDto(
                p.getId(), p.getTitle(), p.getSummary(), p.getUrl(), p.getStack(),
                p.getStartedAt(), p.getFinishedAt()
        );
    }
}
