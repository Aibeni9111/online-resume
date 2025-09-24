// src/api.ts
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";

/** Расширяем конфиг Axios для счётчика ретраев (без any). */
interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    __retryCount?: number;
}

const BASE_URL = import.meta.env.VITE_API_URL as string | undefined;


const baseURL =
    BASE_URL ??
    (import.meta.env.DEV ? "/api" : (() => { throw new Error("VITE_API_URL is not set"); })());

export const api = axios.create({
    baseURL,
    withCredentials: false,           // кросс-домен без cookie
    timeout: 30_000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/** Неблокирующая задержка */
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Решаем, ретраить ли ошибку (таймаут/сеть/5xx: 502–504) */
function isRetriableAxiosError(err: unknown): err is AxiosError {
    if (!isAxiosError(err)) return false;
    const isTimeout = err.code === "ECONNABORTED";
    const isNetwork = typeof err.message === "string" && err.message.includes("Network Error");
    const status = err.response?.status ?? 0;
    const isTransientHttp = status === 502 || status === 503 || status === 504;
    return isTimeout || isNetwork || isTransientHttp;
}

/** Интерцептор с ретраями до 3 попыток, backoff 1s→2s→4s (с лёгким джиттером) */
api.interceptors.response.use(
    // успешный ответ пропускаем
    (res) => res,
    // ошибка → возможно ретраим
    async (error: unknown) => {
        if (!isRetriableAxiosError(error)) {
            // не axios-ошибка или не ретраибельная — пробрасываем
            return Promise.reject(error);
        }

        // Берём конфиг и увеличиваем счётчик
        const cfg: RetryAxiosRequestConfig | undefined = error.config;
        if (!cfg) return Promise.reject(error);

        const prev = cfg.__retryCount ?? 0;
        if (prev >= 3) {
            return Promise.reject(error);
        }

        const next = prev + 1;
        cfg.__retryCount = next;

        // экспоненциальный бэкофф с небольшим джиттером (до +200мс)
        const baseDelay = Math.min(1000 * 2 ** (next - 1), 6000);
        const jitter = Math.floor(Math.random() * 200);
        await sleep(baseDelay + jitter);

        // Повторяем запрос с исходным конфигом
        return api(cfg);
    }
);

// Полезно: в DEV включить лёгкий лог (необязательно)
if (import.meta.env.DEV) {
    api.interceptors.request.use((cfg) => {
        // eslint-disable-next-line no-console
        console.debug("[api] →", cfg.method?.toUpperCase(), cfg.baseURL, cfg.url);
        return cfg;
    });
    api.interceptors.response.use(
        (res) => {
            // eslint-disable-next-line no-console
            console.debug("[api] ←", res.status, res.config.url);
            return res;
        },
        (err) => {
            // eslint-disable-next-line no-console
            console.debug("[api] ✖", isAxiosError(err) ? err.response?.status : "non-axios error", err.config?.url);
            return Promise.reject(err);
        }
    );
}

export default api;
