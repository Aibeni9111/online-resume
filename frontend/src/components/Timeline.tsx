import type { ExperienceDto } from "../types";

function formatDate(value?: string | null) {
    if (!value) return "Present";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export function Timeline({ items }: { items: ExperienceDto[] }) {
    if (!items?.length) {
        return <div className="text-slate-500 dark:text-white">Experience timeline.</div>;
    }

    return (
        <div className="relative">
            <span className="timeline-line" />
            <div className="space-y-12">
                {items.map((item, index) => (
                    <div key={item.id} className="relative pl-12">
                        <span className="absolute left-[0.85rem] top-3 h-3 w-3 -translate-x-1/2 rounded-full border border-white/40 bg-white shadow dark:border-white/20 dark:bg-slate-950" />
                        <div
                            className="surface p-6 opacity-0 animate-[fade-up_0.6s_ease-out_forwards]"
                            style={{ animationDelay: `${index * 90}ms` }}
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.role}</h3>
                                    <div className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-white">
                                        {item.company}
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-slate-500 dark:text-white">
                                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                </div>
                            </div>
                            {item.location && (
                                <div className="mt-3 text-sm text-slate-500 dark:text-white">{item.location}</div>
                            )}
                            {item.description && (
                                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-white">{item.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}