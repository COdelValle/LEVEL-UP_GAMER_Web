import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test:{
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  },
  server: {
    port: 5175,
    host: true // Permite acceso desde la red
  },
  // Esta configuración es crucial para SPA
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
