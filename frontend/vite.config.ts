
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/online-resume/',       // для GitHub Pages этого репо
  build: { sourcemap: true },
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
}})

