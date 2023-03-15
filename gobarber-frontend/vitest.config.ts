import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    silent: true,
    include: ['**/*.spec.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './.vitest/setup.ts',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov', 'html'],
    },
  },
});
