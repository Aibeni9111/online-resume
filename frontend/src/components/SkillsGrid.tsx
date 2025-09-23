import { useEffect, useState } from "react";
import type { SkillDto } from "../types";

export function SkillsGrid({ skills }: { skills: SkillDto[] }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 150);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => {
                const percentage = Math.max(0, Math.min(100, skill.level ?? 0));
                const gauge = `conic-gradient(from 0deg, #6366f1 ${percentage * 3.6}deg, rgba(99,102,241,0.15) ${
                    percentage * 3.6
                }deg 360deg)`;
                return (
                    <div
                        key={skill.id}
                        className="surface group p-6 opacity-0 animate-[fade-up_0.6s_ease-out_forwards]"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                                <p className="mt-2 text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-white dark:group-hover:text-white">
                                    Confidence score
                                </p>
                            </div>
                            <div className="relative h-16 w-16 shrink-0">
                                <div className="absolute inset-0 rounded-full bg-slate-200/80 p-[3px] dark:bg-slate-700/40">
                                    <div className="h-full w-full rounded-full" style={{ background: gauge }} />
                                </div>
                                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/50">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-[width] duration-700 ease-out"
                                style={{ width: animate ? `${percentage}%` : "0%", transitionDelay: `${index * 70}ms` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}