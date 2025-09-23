package com.aibeni.resume.skill;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillController {
    private final SkillRepository repo;
    public SkillController(SkillRepository repo) { this.repo = repo; }

    @GetMapping("/skills/{profileId}")
    public List<SkillDto> getByProfile(@PathVariable Long profileId) {
        return repo.findByProfileId(profileId)
                .stream().map(SkillDto::from).toList();
    }
}
