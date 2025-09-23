/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // читаем .env.* и переменные окружения

  return {
    plugins: [react()],
    // dev = '/', prod для GitHub Pages = '/online-resume/' (подадим через CI)
    base: env.VITE_BASE ?? '/',

    server: {
      host: 'localhost',
      port: 5173,
      strictPort: true,
      proxy: {
        // в DEV все вызовы на /api уйдут на локальный бэкенд 8080
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
