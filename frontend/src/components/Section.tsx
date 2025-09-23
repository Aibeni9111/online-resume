import type { ReactNode } from "react";

type SectionProps = {
    id: string;
    title?: string;
    eyebrow?: string;
    description?: string;
    children: ReactNode;
    className?: string;
};

export function Section({
                            id,
                            title,
                            eyebrow,
                            description,
                            children,
                            className = "",
                        }: SectionProps) {
    return (
        <section id={id} className={`section ${className}`}>
            {(title || eyebrow || description) && (
                <header className="mb-12 space-y-4">
                    <div className="section-title">
                        {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
                        {title && <span className="section-title__heading">{title}</span>}
                    </div>
                    {description && (
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-white">
                            {description}
                        </p>
                    )}
                </header>
            )}
            {children}
        </section>
    );
}
