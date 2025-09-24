package com.aibeni.resume.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "https://aibeni9111.github.io")
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileRepository repo;

    public ProfileController(ProfileRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDto> get(@PathVariable Long id) {
        return repo.findById(id)
                .map(p -> ResponseEntity.ok(ProfileDto.from(p)))
                .orElse(ResponseEntity.notFound().build());
    }
}
