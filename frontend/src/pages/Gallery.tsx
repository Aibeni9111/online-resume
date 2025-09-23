// src/pages/Gallery.tsx
import { Link } from "react-router-dom";

// ВАЖНО: из src/pages → поднимаемся на уровень вверх к src/assets
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";

const IMAGES = [p1, p2, p3];

export default function Gallery() {
    return (
        <div className="min-h-screen">
            <header className="container-p py-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Fotogalerie</h1>
                <Link
                    to="/"
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                    Home Page
                </Link>
            </header>

            <main className="container-p pb-14">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {IMAGES.map((src, i) => (
                        <a
                            key={i}
                            href={src}
                            target="_blank"
                            rel="noreferrer"
                            className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-md transition
                         dark:border-neutral-800 dark:bg-neutral-900"
                            title={`gallery-${i + 1}`}
                        >
                            <img src={src} alt={`Photo ${i + 1}`} loading="lazy" />
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}
