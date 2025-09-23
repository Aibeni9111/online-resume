import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { api } from "./api";
import type { ExperienceDto, ProfileDto, ProjectDto, SkillDto } from "./types";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { SkillsGrid } from "./components/SkillsGrid";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { AboutSection } from "./components/AboutSection";
import { Timeline } from "./components/Timeline";
import { ContactSection } from "./components/ContactSection";
import { AuroraBackground } from "./components/AuroraBackground";

import Gallery from "./pages/Gallery";

import p1 from './assets/p1.png'


function Home() {
    const [profile, setProfile] = useState<ProfileDto | null>(null);
    const [skills, setSkills] = useState<SkillDto[]>([]);
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [experience, setExperience] = useState<ExperienceDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const profileId = 1;
        (async () => {
            try {
                setError(null);
                const [profileRes, skillsRes, projectsRes, experienceRes] = await Promise.all([
                    api.get<ProfileDto>(`/api/profile/${profileId}`),
                    api.get<SkillDto[]>(`/api/skills/${profileId}`),
                    api.get<ProjectDto[]>(`/api/projects/${profileId}`),
                    api.get<ExperienceDto[]>(`/api/experience/${profileId}`),
                ]);
                setProfile(profileRes.data);
                setSkills(skillsRes.data);
                setProjects(projectsRes.data);
                setExperience(experienceRes.data);
            } catch (err: any) {
                console.error(err);
                const message = err?.message || "Beim Laden des Profils ist ein Fehler aufgetreten.";
                setError(message);
            }
        })();
    }, []);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50/60 text-center dark:bg-slate-950/80">
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Das Profil konnte nicht geladen werden.</p>
                    <p className="text-sm text-slate-600 dark:text-white">{error}</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50/60 text-center dark:bg-slate-950/80">
                <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-white">
                        Wird geladen
                    </span>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Portfolio wird vorbereitet ...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <AuroraBackground />
            <Nav fullName={profile.fullName} />
            <Hero profile={profile} />

            <main className="relative z-10">
                <div className="container-p space-y-24 pb-28">
                    <Section id="about" eyebrow="01" title="Über mich" description="Ein kurzer Einblick, was meine Arbeit antreibt und wie ich Produktgestaltung angehe.">
                        <AboutSection text={profile.summary} />
                    </Section>

                    <Section
                        id="skills"
                        eyebrow="02"
                        title="FÄHIGKEITEN"
                        description="Die Sprachen, Frameworks und Arbeitsweisen, mit denen ich verlässliche Produkte ausliefere."
                    >
                        <SkillsGrid skills={skills} />
                    </Section>

                    <Section
                        id="portfolio"
                        eyebrow="03"
                        title="Ausgewählte Projekte"
                        description="Fallstudien, die Produktdenken, Zusammenarbeit und messbare Ergebnisse zeigen."
                    >
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <Link
                                to="/gallery"
                                className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/10"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_65%)] transition group-hover:opacity-100" />
                                <div className="relative z-10 space-y-4">
                                    <div className="relative h-48 overflow-hidden rounded-2xl">
                                        <img src={p1}
                                        alt="Galerie-Vorschau"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                    </div>
                                    <div className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-white">
                                        Galerie
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-white">
                                        Visuelle Erkundungen
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-white">
                                        Entdecke Fotografie und Designexperimente, die meine Produktarbeit prägen.
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:gap-3 dark:text-white">
                                        Galerie öffnen -&gt;
                                    </span>
                                </div>
                            </Link>

                            <ProjectsGrid projects={projects} />
                        </div>
                    </Section>

                    <Section
                        id="experience"
                        eyebrow="04"
                        title="Erfahrung"
                        description="Stationen, in denen ich mit interdisziplinären Teams ambitionierte Produkte entwickelt habe."
                    >
                        <Timeline items={experience} />
                    </Section>

                    <Section
                        id="contacts"
                        eyebrow="05"
                        title="Kontakt"
                        description="Lass uns gemeinsam etwas Großes anstoßen."
                    >
                        <ContactSection profile={profile} />
                    </Section>
                </div>
            </main>
        </>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
        </Routes>
    );
}