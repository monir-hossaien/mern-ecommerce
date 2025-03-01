import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api/': {
        target: "https://monirecommerce.vercel.app", // your backend URL on Vercel
        changeOrigin: true,
        secure: false,  // set this to true if using https
        rewrite: (path) => path.replace(/^\/api/, ''),  // optional: rewrite '/api' to '' if needed
      }
    } : {}
  }
});
