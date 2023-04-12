import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lightningcss from 'vite-plugin-lightningcss';

export default defineConfig({
  css: {
    modules: {
      generateScopedName: 'ks-[local]_[hash:base64:2]',
      globalModulePaths: [/\.m\.css$/],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-syntax-import-assertions"]
      }
    }),
    lightningcss({
      browserslist: '>= 0.25%',
    }),
  ],
});
