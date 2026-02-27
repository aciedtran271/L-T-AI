import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Đổi 'loto' thành tên repo GitHub của bạn (ví dụ: username.github.io/loto)
const repoName = 'loto';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
