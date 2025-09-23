import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // <= СЮДА ПРИЕЗЖАЕТ URL с Vercel
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});
