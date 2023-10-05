import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 4242,
    // client/vite.config.js

    build: {
      outDir: '/dist',
    },

    proxy: {
      '/config': 'http://localhost:5252',
      '/create-payment-intent': 'http://localhost:5252',
      '/products-data': 'http://localhost:5252',
      '/update-payment-intent': 'http://localhost:5252',
    },
  },
});
