import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30000, // 30s вместо 8s
});

// Простой retry на холодный старт/сеть (до 3 попыток, с задержкой)
api.interceptors.response.use(undefined, async (error: AxiosError) => {
    const cfg = error.config as any;
    const retriable =
        error.code === 'ECONNABORTED' ||
        error.message?.includes('Network Error') ||
        (error.response?.status && [502, 503, 504].includes(error.response.status));

    if (!retriable) throw error;

    cfg.__retryCount = (cfg.__retryCount || 0) + 1;
    if (cfg.__retryCount > 3) throw error;

    const delayMs = Math.min(1000 * 2 ** (cfg.__retryCount - 1), 6000);
    await new Promise(r => setTimeout(r, delayMs));
    return api(cfg);
});
