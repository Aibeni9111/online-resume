package com.aibeni.resume.experience;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "https://aibeni9111.github.io")
@RestController
@RequestMapping(value = "/api/experience", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExperienceController {
    private final ExperienceRepository repo;

    public ExperienceController(ExperienceRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<List<ExperienceDto>> list(@PathVariable Long profileId) {
        var items = repo.findByProfileIdOrderByStartDateDesc(profileId)
                .stream().map(ExperienceDto::from).toList();
        return ResponseEntity.ok(items);
    }
}
