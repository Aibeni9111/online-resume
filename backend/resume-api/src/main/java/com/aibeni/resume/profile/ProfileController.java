package com.aibeni.resume.profile;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/profile", produces = MediaType.APPLICATION_JSON_VALUE)
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
