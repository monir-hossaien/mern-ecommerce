import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'https://mern-ecommerce-7-xiy6.onrender.com',  // API endpoint for your backend
        changeOrigin: true,
        secure: false
      }
    },
    port: 4173, // Use Render's assigned PORT or default to 4173
    host: '0.0.0.0', // Bind to all network interfaces
  },
  preview: {
    allowedHosts: ['monir-ecommerce-ysm9.onrender.com'], // Add the allowed host
  }
});
