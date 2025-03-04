
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api/': {
        target: "https://mern-ecommerce-7-xiy6.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
