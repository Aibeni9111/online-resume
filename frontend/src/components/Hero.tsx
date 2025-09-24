import type { ProfileDto } from "../types";
import cv from '../assets/cv.pdf';
import Taalaibekov_Aibek from '../assets/Taalaibekov_Aibek.png';

export function Hero({ profile }: { profile: ProfileDto }) {
    const contactHref = profile.email ? `mailto:${profile.email}` : "#contacts";
    const websiteHref = profile.website || undefined;

    return (
        <section id="main" className="relative overflow-hidden pb-28 pt-24">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/40 via-white/10 to-transparent dark:from-white/5 dark:via-transparent" />

            <div className="container-p relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-10">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="badge">{profile.location || "Available Worldwide"}</span>
                        {profile.website && (
                            <a
                                href={profile.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 transition hover:text-indigo-600 dark:text-white dark:hover:text-white"
                            >
                                Portfolio -&gt;
                            </a>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h1 className="space-y-2 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl md:leading-[1.05] dark:text-white">
                            <span className="block text-base font-semibold uppercase tracking-[0.55em] text-slate-500 dark:text-white">
                                Hello, I'm
                            </span>
                            <span className="block bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                                {profile.fullName}
                            </span>
                        </h1>

                        {profile.headline && (
                            <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-white">
                                {profile.headline}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href={cv} download>CV herunterladen</a>
                        <a href={contactHref} className="glass-button" data-variant="ghost">
                            Schreib mir!
                        </a>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="surface p-5">
                            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-white">
                                Email
                            </span>
                            <a
                                href={profile.email ? `mailto:${profile.email}` : undefined}
                                className="mt-2 block truncate text-lg font-semibold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-white"
                            >
                                {profile.email || "Not provided"}
                            </a>
                        </div>
                        <div className="surface p-5">
                            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-white">
                                Phone
                            </span>
                            <a
                                href={profile.phone ? `tel:${profile.phone.replace(/\s+/g, "")}` : undefined}
                                className="mt-2 block text-lg font-semibold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-white"
                            >
                                {profile.phone || "Not provided"}
                            </a>
                        </div>
                        <div className="surface p-5 sm:col-span-2 lg:col-span-1">
                            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-white">
                                GitHub
                            </span>
                            <a
                                href={profile.github || undefined}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 block truncate text-lg font-semibold text-slate-900 transition hover:text-indigo-600 dark:text-white dark:hover:text-white"
                            >
                                {profile.github || "Not provided"}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="surface relative mx-auto w-full max-w-[420px] overflow-hidden p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.32),_transparent_70%)]" />
                            < img src = {Taalaibekov_Aibek}
                            alt={profile.fullName}
                            className="relative z-10 mx-auto h-[320px] w-auto object-contain drop-shadow-[0_25px_70px_rgba(15,23,42,0.3)]"
                        />
                    </div>

                    <div className="absolute -right-10 top-10 hidden w-52 gap-2 rounded-3xl border border-white/40 bg-white/80 p-4 text-sm shadow-xl backdrop-blur-xl animate-[float-slow_9s_ease-in-out_infinite] dark:border-white/10 dark:bg-white/10 lg:flex">
                        <div>
                            <div className="text-xs uppercase tracking-[0.45em] text-slate-500 dark:text-white">Status</div>
                            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                                Ich bin offen für neue berufliche Herausforderungen!
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-12 left-6 hidden w-60 rounded-3xl border border-white/40 bg-white/85 p-5 shadow-xl backdrop-blur-xl animate-[float-slow_10s_ease-in-out_infinite] dark:border-white/10 dark:bg-white/10 md:block">
                        <div className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white">Based in</div>
                        <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                            {profile.location || "Remote"}
                        </div>
                        {websiteHref && (
                            <a
                                href={websiteHref}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:gap-3 dark:text-white"
                            >
                                Visit website -&gt;
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}