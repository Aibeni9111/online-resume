import type { ProjectDto } from "../types";

function formatPeriod(start?: string, finish?: string | null) {
    if (!start) return "";
    const begin = new Date(start);
    const end = finish ? new Date(finish) : null;
    const fmt = (date: Date) =>
        date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
        });
    return end ? `${fmt(begin)} - ${fmt(end)}` : `${fmt(begin)} - now`;
}

export function ProjectsGrid({ projects }: { projects: ProjectDto[] }) {
    if (!projects?.length) {
        return <div className="text-slate-500 dark:text-white">Projects will appear here soon.</div>;
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => {
                const tags = project.stack
                    ? project.stack.split(/[,|]/).map((tag) => tag.trim()).filter(Boolean)
                    : [];

                return (
                    <article
                        key={project.id}
                        className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/75 p-7 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/10"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.22),_transparent_60%)] opacity-80 transition group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_60%)]" />

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-white">
                                        {project.title}
                                    </h3>
                                    {project.summary && (
                                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white">
                                            {project.summary}
                                        </p>
                                    )}
                                </div>
                                <span className="text-3xl font-semibold text-slate-200 dark:text-white">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-white">
                                <span>{formatPeriod(project.startedAt, project.finishedAt)}</span>
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:gap-3 dark:text-white"
                                    >
                                        View project -&gt;
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}