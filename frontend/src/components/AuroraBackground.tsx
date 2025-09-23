import type { CSSProperties } from "react";

const layers: Array<{ className: string; style?: CSSProperties }> = [
    {
        className:
            "top-[-25%] left-[8%] w-[42rem] h-[42rem] bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.55),_transparent_65%)]",
        style: { animationDuration: "26s" },
    },
    {
        className:
            "bottom-[-18%] right-[-10%] w-[50rem] h-[50rem] bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.45),_transparent_60%)]",
        style: { animationDelay: "-8s", animationDuration: "32s" },
    },
    {
        className:
            "top-[35%] right-[30%] w-[32rem] h-[32rem] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.38),_transparent_60%)]",
        style: { animationDelay: "-4s", animationDuration: "24s" },
    },
];

export function AuroraBackground() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-transparent to-white/30 dark:from-white/10 dark:to-slate-950" />
            {layers.map((layer, index) => (
                <div
                    key={index}
                    className={
                        "absolute rounded-full blur-3xl opacity-80 mix-blend-screen " +
                        "animate-[aurora_28s_ease-in-out_infinite_alternate] " +
                        layer.className
                    }
                    style={layer.style}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/20 via-transparent to-sky-200/20 dark:from-indigo-500/10 dark:to-sky-500/5" />
        </div>
    );
}
