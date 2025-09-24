package com.aibeni.resume.project;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<List<ProjectDto>> list(@PathVariable Long profileId) {
        var items = repo.findByProfileIdOrderByStartedAtDescIdDesc(profileId)
                .stream().map(ProjectDto::from).toList();
        return ResponseEntity.ok(items);
    }
}
