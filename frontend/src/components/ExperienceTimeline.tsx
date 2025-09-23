import type {ExperienceDto} from "../types";

function formatPeriod(start?: string, end?: string | null) {
    if (!start) return "";
    const s = new Date(start).toLocaleDateString(undefined, { year: "numeric", month: "short" });
    const e = end ? new Date(end).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";
    return `${s} — ${e}`;
}

export function ExperienceTimeline({ items }: { items: ExperienceDto[] }) {
    return (
        <section className="mb-8 bg-white">
            <h2 className="text-xl font-semibold mb-3">Erfahrung</h2>
            <ul className="border-l-2 border-gray-300 pl-4 space-y-6">
                {items.map(exp => (
                    <li key={exp.id} className="relative">
                        <span className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-500 rounded-full"></span>
                        <div className="bg-white shadow rounded-xl p-4">
                            <h3 className="font-bold">{exp.role} · {exp.company}</h3>
                            <p className="text-sm text-gray-600">{exp.location}</p>
                            <p className="text-xs text-gray-500">{formatPeriod(exp.startDate, exp.endDate)}</p>
                            <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
