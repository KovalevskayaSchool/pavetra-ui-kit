import path from "node:path";
import fs from "node:fs";
import esbuild from "esbuild";
import fg from "fast-glob";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { transform } from "lightningcss";
import packageJson from "./package.json" assert { type: "json" };

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

const cssPlugin = {
  name: "css",
  setup(build) {
    // Redirect all paths css, scss or sass
    build.onResolve({ filter: /.\.css$/ }, async (args) => {
      const path1 = args.resolveDir.replace("/dist", "");
      const cssFilePath = args.resolveDir + "/" + args.path.replace("./", "");
      // const cssFilePath = path.resolve('src', `components/${}`)
      // let css = await fs.promises.readFile(cssFilePath);
      // css = await esbuild.transform(css, { loader: "css", minify: true });

      // css = await transform({
      //   code: Buffer.from(css),
      //   minify: true,
      // }).code.toString();

      // return { loader: "text", contents: css };
      return { path: path.join(path1, args.path) };
    });
  },
};

const components = fg.sync(["src/lib/*/index.ts", "src/lib/index.ts"], {
  onlyFiles: true,
  ignore: ["src/lib/*/stories/*"],
  unique: true,
});

async function build() {
  try {
    await esbuild
      .build({
        entryPoints: components,
        outdir: "dist/es",
        bundle: true,
        sourcemap: true,
        platform: "neutral", // for ESM
        minify: true,
        splitting: true,
        format: "esm",
        define: { global: "window" },
        target: ["esnext"],
        // treeShaking: true,
        external: Object.keys(packageJson.dependencies).concat(
          Object.keys(packageJson.peerDependencies)
        ),
        plugins: [cssModulesPlugin()],
      })
      .catch(() => process.exit(1));

    // cjs output bundle
    // await esbuild
    //   .build({
    //     entryPoints: components,
    // //    outfile: "dist/cjs/index.cjs.js",
    //     outdir: "dist",
    //     bundle: true,
    //     sourcemap: true,
    //     minify: true,
    //     platform: "node",
    //     target: ["node16"],
    //     plugins: [cssModulesPlugin()],
    //   })
    //   .catch(() => process.exit(1));

    // await new Generator({
    //   entry: "src/lib/index.ts",
    //   output: "dist/index.d.ts",
    // }).generate();
  } catch (error) {
    console.error(error);
  }
}

build();
