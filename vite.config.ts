import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Đổi 'L-T-AI' nếu đổi tên repo (URL: username.github.io/L-T-AI)
const repoName = 'L-T-AI';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
