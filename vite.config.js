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
    port: 5175,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
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
