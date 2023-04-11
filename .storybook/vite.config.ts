import { defineConfig } from 'vite';
import lightningcss from 'vite-plugin-lightningcss';

export default defineConfig({
  css: {
    modules: {
      generateScopedName: 'ks-[local]_[hash:base64:2]',
      globalModulePaths: [/\.m\.css$/],
    },
  },
  plugins: [
    lightningcss({
      browserslist: '>= 0.25%',
    }),
  ],
});
