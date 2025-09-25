package com.aibeni.resume.skill;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "https://aibeni9111.github.io")
@RestController
@RequestMapping(value = "/api/skills", produces = MediaType.APPLICATION_JSON_VALUE)
public class SkillController {
    private final SkillRepository repo;
    public SkillController(SkillRepository repo) { this.repo = repo; }

    @GetMapping("/skills/{profileId}")
    public List<SkillDto> getByProfile(@PathVariable Long profileId) {
        return repo.findByProfileId(profileId)
                .stream().map(SkillDto::from).toList();
    }
}
