import { useState } from "react";
import type { ReactNode } from "react";
import type { ProfileDto } from "../types";

type ContactItem = {
    icon: ReactNode;
    label: string;
    value: string;
    href?: string;
    canCopy?: boolean;
};

function MailIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 7 7.5 6 7.5-6" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.6 4.8c.3-.6.9-.8 1.6-.7l2.3.4c.6.1 1 .5 1.1 1.1l.3 2.1c.1.6-.1 1.1-.6 1.5l-1 .8c.9 1.8 2.4 3.2 4.2 4.2l.8-1c.4-.5.9-.7 1.5-.6l2.1.3c.6.1 1 .5 1.1 1.1l.4 2.3c.1.6-.1 1.3-.7 1.6l-1.8 1c-.5.3-1.2.3-1.7.1-6.2-2.5-9.9-6.1-12.4-12.4-.2-.5-.2-1.2.1-1.7l1-1.8Z"
            />
        </svg>
    );
}

function MapPinIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
            <circle cx="12" cy="11" r="2.5" />
        </svg>
    );
}

function GithubIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M12 1.75c-5.66 0-10.25 4.59-10.25 10.25 0 4.53 2.94 8.37 7.02 9.73.51.09.7-.22.7-.5 0-.25-.01-.96-.01-1.89-2.85.62-3.45-1.24-3.45-1.24-.46-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.52 1.03 1.52 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.64-1.33-2.28-.26-4.68-1.14-4.68-5.06 0-1.12.4-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .86-.28 2.8 1.05a9.58 9.58 0 0 1 2.55-.34c.86 0 1.73.11 2.55.34 1.94-1.34 2.79-1.05 2.79-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.94-2.4 4.79-4.7 5.05.36.31.68.92.68 1.86 0 1.35-.01 2.44-.01 2.78 0 .27.18.6.7.5 4.06-1.36 7-5.2 7-9.73C22.25 6.34 17.66 1.75 12 1.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function ContactCard({ item }: { item: ContactItem }) {
    const [copied, setCopied] = useState(false);
    const isExternal = item.href?.startsWith("http");

    const handleCopy = async () => {
        if (!item.value) return;
        try {
            await navigator.clipboard.writeText(item.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {
            setCopied(false);
        }
    };

    const content = (
        <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-white">
                {item.label}
            </div>
            <div className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-white">
                {item.value || "Not available"}
            </div>
        </div>
    );

    return (
        <div className="surface flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-600 dark:text-white">
                    {item.icon}
                </span>
                {item.href ? (
                    <a
                        href={item.href}
                        className="block min-w-0"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                    >
                        {content}
                    </a>
                ) : (
                    content
                )}
            </div>

            {item.canCopy && item.value && (
                <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-xl border border-slate-200/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-indigo-400/60 hover:text-indigo-600 dark:border-slate-700 dark:text-white dark:hover:text-white"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            )}
        </div>
    );
}

export function ContactSection({ profile }: { profile: ProfileDto }) {
    const phoneClean = (profile.phone || "").replace(/\s+/g, "");

    const contacts: ContactItem[] = [
        {
            icon: <MailIcon />,
            label: "Email",
            value: profile.email,
            href: profile.email ? `mailto:${profile.email}` : undefined,
            canCopy: true,
        },
        {
            icon: <PhoneIcon />,
            label: "Phone",
            value: profile.phone,
            href: phoneClean ? `tel:${phoneClean}` : undefined,
            canCopy: true,
        },
        {
            icon: <MapPinIcon />,
            label: "Location",
            value: profile.location || "Remote",
        },
        {
            icon: <GithubIcon />,
            label: "GitHub",
            value: profile.github,
            href: profile.github || undefined,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                {contacts.map((item) => (
                    <ContactCard key={item.label} item={item} />
                ))}
            </div>

            <div className="surface flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-white">
                        zusammenarbeiten
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-white">
                        Die Arbeit in leistungsorientierten Teams, die Qualität und termingerechte Lieferung priorisieren, entspricht meiner Arbeitsweise. Für weitere Informationen stehe ich gerne zur Verfügung – ich melde mich binnen 24 Stunden zurück.
                    </p>
                </div>
                <a href={profile.email ? `mailto:${profile.email}` : undefined} className="glass-button">
                    E-Mail schreiben
                </a>
            </div>
        </div>
    );
}