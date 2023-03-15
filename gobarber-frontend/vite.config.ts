import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    svgr(),
    react({
      plugins: [['@swc/plugin-styled-components', {}]],
    }),
  ],
});
