import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config; react plugin is optional for JSX transform in dev tools
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
  }
})

