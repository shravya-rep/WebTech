import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/processdata': 'http://localhost:8080',
      '/autocomplete': 'http://localhost:8080',
      '/storedata':    'http://localhost:8080',
      '/loaddata':     'http://localhost:8080',
      '/deletedata':   'http://localhost:8080',
      '/loadacity':    'http://localhost:8080',
    }
  }
})
