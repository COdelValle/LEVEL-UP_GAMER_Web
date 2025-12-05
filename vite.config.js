import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test:{
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  },
  root: '.',
  server: {
    port: Number(process.env.VITE_DEV_PORT) || 5175,
    // Por seguridad, por defecto limitar a localhost. Para exponer a la red establecer VITE_ALLOW_NETWORK=true
    host: process.env.VITE_ALLOW_NETWORK === 'true' ? true : 'localhost',
    // Proxy para evitar CORS y no exponer el puerto del backend directamente
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
