import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/swiftshop/', // Adjust to match your Heroku app name
  build: {
    outDir: '../server/public', // Output directory relative to the client directory
    assetsDir: '.', // Assets directory relative to the outDir
  },
  server: {
    port: 4242,
    // client/vite.config.js
    proxy: {
      '/config': 'http://localhost:5252',
      '/create-payment-intent': 'http://localhost:5252',
      '/products-data': 'http://localhost:5252',
      '/update-payment-intent': 'http://localhost:5252',
    },
  },
});
