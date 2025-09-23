import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({
    baseURL, // <= СЮДА ПРИЕЗЖАЕТ URL с Vercel
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});
