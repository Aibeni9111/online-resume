package com.aibeni.resume.skill;

public record SkillDto(Long id, String name, int level) {
    public static SkillDto from(Skill s) {
        return new SkillDto(s.getId(), s.getName(), s.getLevel());
    }
}
