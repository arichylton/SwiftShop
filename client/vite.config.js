import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

let REDIRECT_URI = 'https://swiftshop-a17bbc679c10.herokuapp.com';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4242,
    proxy: {
      '/config': `${REDIRECT_URI}`,
      '/create-payment-intent': `${REDIRECT_URI}`,
      '/products-data': `${REDIRECT_URI}`,
      '/update-payment-intent': `${REDIRECT_URI}`,
    },
  },
});
