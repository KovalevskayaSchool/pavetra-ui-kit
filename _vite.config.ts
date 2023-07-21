import { resolve, parse } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import lightningcss from "vite-plugin-lightningcss";
import dts from "vite-plugin-dts";
import * as packageJson from "./package.json";
import fg from "fast-glob";

const components = fg.sync(["src/components/*/**/index.ts"], {
  onlyFiles: true,
  ignore: [],
  unique: true,
});

const getFileName = (componentFile) => {
  const parsedFiled = parse(componentFile);
  const folders = componentFile.split("/");
  const folder = folders[folders.length - 2];
  if (folder === "components") {
    return "index";
  }
  return folder;
};

const entries = components.map((cmp) => resolve(cmp));

export default defineConfig({
  css: {
    modules: {
      generateScopedName: "ks-[local]_[hash:base64:2]",
      globalModulePaths: [/\.m\.css$/],
    },
  },
  plugins: [
    dts(),
    react(),
    lightningcss({
      browserslist: ">= 0.25%",
      minify: true,
    }),
  ],
  build: {
    outDir: "./dist",
    lib: {
      entry: [...entries, resolve("src", "components/index.ts")],
      name: "PavetraUIKit",
      formats: ["es", "cjs"],
      // fileName(format, entryName) {
      //   console.log({ format, entryName });
      //   return `${format}/${entryName}.js`;
      // },
    },
    rollupOptions: {
      //  input: [...entries, resolve('src', 'components/index.ts')],
      external: [...Object.keys(packageJson.peerDependencies)],
      // output: [
      //   {
      //     dir: 'dist/es',
      //     format: 'es',
      //     entryFileNames: (chunkInfo) => {
      //       const name = getFileName(chunkInfo.facadeModuleId);
      //       return `${name}/${name}.js`;
      //     },
      //   },
      //   {
      //     dir: 'dist',
      //     format: 'cjs',
      //     entryFileNames: (chunkInfo) => {
      //       const name = getFileName(chunkInfo.facadeModuleId);
      //       return `${name}/${name}.cjs`;
      //     },
      //   },
      // ],
    },
  },
});
