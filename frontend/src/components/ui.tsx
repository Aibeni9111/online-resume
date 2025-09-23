// src/components/ui.tsx
import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-semibold mb-3">{children}</h2>;
}

export function Chip({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-700
                      dark:border-white/10 dark:bg-white/10 dark:text-white">
      {children}
    </span>
    );
}

export function LinkButton(props: React.ComponentProps<"a">) {
    const { className = "", ...rest } = props;
    return (
        <a
            {...rest}
            className={
                "inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium shadow-sm " +
                "hover:shadow transition " +
                "dark:bg-white/10 dark:border-white/10 dark:text-white " +
                className
            }
        />
    );
}

export function Card({ children }: { children: ReactNode }) {
    return (
        <article
            className="
        rounded-2xl border p-5 backdrop-blur transition
        bg-white/80 border-gray-200 text-gray-900 shadow-sm
        hover:shadow-md hover:-translate-y-0.5

        dark:bg-white/[0.08] dark:text-white dark:border-white/10
        dark:shadow-[0_0_30px_0_rgba(99,102,241,0.25)]
        dark:hover:shadow-[0_0_45px_0_rgba(99,102,241,0.38)]
      "
        >
            {children}
        </article>
    );
}
