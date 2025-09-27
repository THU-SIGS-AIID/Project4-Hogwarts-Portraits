import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config; react plugin is optional for JSX transform in dev tools
export default defineConfig({
  plugins: [react()],
})

