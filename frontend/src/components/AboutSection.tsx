export function AboutSection({ text }: { text: string }) {
    const paragraphs = text
        .split(/\n+/)
        .map((chunk) => chunk.trim())
        .filter(Boolean);

    const highlights = [
        {
            title: "Fokus",
            description: "Designsysteme, Product Discovery und begeisternde End-to-End-User-Journeys."
        },
        {
            title: "Toolbox",
            description: "React-Ökosystem, TypeScript, Node.js, gelebte Testkultur sowie enge Zusammenarbeit mit Design-Teams."
        },
        {
            title: "Arbeitsweise",
            description: "Schnell umsetzen, beobachten, iterieren. Erlebnisse schaffen, die messbaren Business-Impact mit echter Nutzerfreude verbinden."
        }
    ];

    return (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <article className="surface p-10">
                <div className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-white">
                    About
                </div>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600 dark:text-white">
                    {paragraphs.length ? (
                        paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    ) : (
                        <p>
                            Produktdenkender Ingenieur, der mühelose Benutzeroberflächen entwickelt, die messbaren Mehrwert für Unternehmen schaffen.
                        </p>
                    )}
                </div>
            </article>

            <aside className="grid gap-4">
                {highlights.map((item) => (
                    <div key={item.title} className="surface p-6">
                        <div className="text-xs font-semibold uppercase tracking-[0.45em] text-indigo-500 dark:text-white">
                            {item.title}
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white">
                            {item.description}
                        </p>
                    </div>
                ))}
            </aside>
        </div>
    );
}