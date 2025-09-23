import { useEffect, useMemo, useState } from "react";
import { toggleTheme } from "../theme";

import logoUrl from '../assets/Logo.png';


type NavProps = {
    fullName?: string;
};

const LINKS = [
    { href: "#main", label: "Main" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contacts", label: "Contacts" },
];

function SunIcon() {
    return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4.5" />
            <path strokeLinecap="round" d="M12 2.5v2.8m0 13.4v2.8m9.2-9.2h-2.8M5.6 12H2.8m14.9-6.3 2-2M6.3 17.7l-2 2m14.9 0-2-2M6.3 6.3l-2-2" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 0 1 11.21 3 6.5 6.5 0 1 0 21 12.79Z" />
        </svg>
    );
}

export function Nav({ fullName }: NavProps) {
    const [active, setActive] = useState("#main");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        const ids = LINKS.map((l) => l.href.slice(1));
        const obs = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 },
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const doc = document.documentElement;
            const total = doc.scrollHeight - window.innerHeight;
            if (total <= 0) {
                setScrollProgress(0);
                return;
            }
            setScrollProgress(Math.min(1, window.scrollY / total));
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const initials = useMemo(() => {
        if (!fullName) return "";
        return fullName
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0]?.toUpperCase())
            .slice(0, 2)
            .join("");
    }, [fullName]);

    const onToggleTheme = () => {
        toggleTheme();
        setIsDark(document.documentElement.classList.contains("dark"));
    };

    return (
        <nav className="sticky top-0 z-50">
            <div className="relative">
                <div className="absolute inset-0 -z-10 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70" />
                <div className="container-p flex h-20 items-center justify-between">
                    <a href="#main" className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow ring-1 ring-slate-900/10 dark:bg-white/10 dark:ring-white/10">
                            <img src={logoUrl} alt="Logo" className="h-7 w-7 object-contain" />
                        </span>
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-slate-500 dark:text-white">
                                PhotoPortflio
                            </span>
                            <span className="text-base font-semibold text-slate-900 dark:text-white">
                                {fullName || "Aibek Taalaibekov"}
                            </span>
                        </div>
                    </a>

                    <div className="hidden lg:flex items-center gap-8">
                        {LINKS.map((link) => {
                            const isActive = active === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-sm font-semibold tracking-wide transition-colors ${
                                        isActive
                                            ? "text-slate-900 dark:text-white"
                                            : "text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute left-0 top-full mt-1 h-[3px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        {initials && (
                            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 text-sm font-semibold tracking-[0.2em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                                {initials}
                            </div>
                        )}
                        <button
                            onClick={onToggleTheme}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300/70 bg-white/80 text-slate-600 shadow-sm transition hover:border-indigo-400/60 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:hover:text-white"
                            aria-label="Toggle color scheme"
                            title="Toggle color scheme"
                            type="button"
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-900/5 dark:bg-white/10">
                    <div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-[transform] duration-300"
                        style={{ transform: `scaleX(${scrollProgress})` }}
                    />
                </div>
            </div>
        </nav>
    );
}