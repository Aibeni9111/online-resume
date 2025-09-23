import type {ProfileDto} from "../types";
import { LinkButton } from "./ui";
import { useMemo } from "react";

function Avatar({ name }: { name: string }) {
    const initials = useMemo(() => {
        const parts = name.trim().split(/\s+/);
        return (parts[0]?.[0] ?? "").toUpperCase() + (parts[1]?.[0] ?? "").toUpperCase();
    }, [name]);
    return (
        <div className="size-16 rounded-2xl grid place-items-center font-extrabold
                    bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow">
            {initials || "👤"}
        </div>
    );
}

export function ProfileHeader({ profile }: { profile: ProfileDto }) {
    const toggleDark = () => document.documentElement.classList.toggle("dark");

    return (
        <header className="mb-8">
            <div className="flex items-start gap-4">
                <Avatar name={profile.fullName} />
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold tracking-tight">{profile.fullName}</h1>
                    <p className="text-gray-600 dark:text-white">{profile.headline}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                        <LinkButton href={`mailto:${profile.email}`}>✉️ {profile.email}</LinkButton>
                        <LinkButton href={profile.github} target="_blank" rel="noreferrer">🐙 GitHub</LinkButton>
                        {profile.website && (
                            <LinkButton href={profile.website} target="_blank" rel="noreferrer">🌐 Website</LinkButton>
                        )}
                        <button onClick={toggleDark}
                                className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium shadow-sm
                         hover:shadow transition bg-white dark:bg-neutral-900 dark:border-neutral-700">
                            🌓 Theme
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
