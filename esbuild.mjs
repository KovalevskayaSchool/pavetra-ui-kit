import path from "node:path";
import esbuild from "esbuild";
import fg from "fast-glob";
import dts from "npm-dts";

import packageJson from "./package.json" assert { type: "json" };

const { Generator } = dts;

// let yourPlugin = {
//   name: 'your-plugin',
//   setup(build) {
//     build.onLoad({ ... }, async (args) => {
//       let css = await fs.promises.readFile(args.path)
//       css = await esbuild.transform(css, { loader: 'css', minify: true })
//       return { loader: 'text', contents: css }
//     })
//   },
// }

const components = fg.sync(
  ["src/lib/*/index.ts", "src/lib/index.ts"],
  {
    onlyFiles: true,
    ignore: ["src/lib/*/stories/*"],
    unique: true,
  }
);

async function build() {
  try {
    await esbuild
      .build({
        entryPoints: components,
        outdir: "dist",
        bundle: true,
        sourcemap: true,
        platform: "neutral", // for ESM
        minify: true,
        splitting: true,
        format: "esm",
        define: { global: "window" },
        target: ["esnext"],
        external: Object.keys(packageJson.dependencies).concat(
          Object.keys(packageJson.peerDependencies)
        ),
      })
      .catch(() => process.exit(1));

    // cjs output bundle
    //   await esbuild
    //     .build({
    //       entryPoints: ["src/lib/index.ts"],
    //       outfile: "dist/cjs/index.cjs.js",
    //       bundle: true,
    //       sourcemap: true,
    //       minify: true,
    //       platform: "node",
    //       target: ["node16"],
    //     })
    //     .catch(() => process.exit(1));

    // await new Generator({
    //   entry: "src/lib/index.ts",
    //   output: "dist/index.d.ts",
    // }).generate();
  } catch (error) {
    console.error(error);
  }
}

await build();
