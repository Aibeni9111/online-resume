export type ProfileDto = {
    id: number; fullName: string; headline: string; summary: string;
    email: string; phone: string; location: string; website: string; github: string;
};
export type SkillDto = { id: number; name: string; level: number };
export type ProjectDto = {
    id: number; title: string; summary: string; url: string; stack: string;
    startedAt?: string; finishedAt?: string | null;
};
