import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
  css: {
    postcss: path.join(__dirname, "../postcss.config.cjs"),
    modules: {
      generateScopedName: "ks-[local]_[hash:base64:2]",
      globalModulePaths: [/\.m\.css$/],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-syntax-import-assertions"],
      },
    }),
  ],
});
