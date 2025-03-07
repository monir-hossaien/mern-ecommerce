
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api/': {
  //       target: "https://mern-ecommerce-sable-kappa.vercel.app",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   headers: {
  //     'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  //     'Pragma': 'no-cache',
  //     'Expires': '0',
  //   },
  // },
})
