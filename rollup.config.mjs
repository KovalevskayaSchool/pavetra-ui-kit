import path from "node:path";
import { fileURLToPath } from 'node:url';

import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import replace from "@rollup/plugin-replace";
import postcss from 'rollup-plugin-postcss'
import fg from "fast-glob";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// import packageJson from "./package.json";

const components = fg.sync(["src/lib/*/index.ts"], {
  onlyFiles: true,
  ignore: ["src/lib/index.ts", "src/lib/*/stories/*"],
  unique: true,
});

const plugins = [
  resolve(),
  commonjs(),
  terser(),
  postcss({
    modules: true,
    config: {
      path: path.join(__dirname, "./postcss.config.cjs"),
    },
    extract: true,
    extract: path.resolve('dist/bundle.css')
  }),
  replace({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
  external(),
];

const config = {
  input: path.resolve("src", "lib/index.ts"),
  output: [
    {
      format: "esm",
      sourcemap: true,
      dir: "dist",
      //  preserveModules: true,
    },
    // {
    //   format: 'cjs',
    //   sourcemap: true,
    //   dir: 'dist',
    // },
    // {
    //   dir: "dist",
    //   sourcemap: true,
    //   format: "cjs",
    // },
  ],
  plugins: [
    ...plugins,
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
  ],
  external: [
    "react",
    "react-dom",
    "classnames",
    "react-aria",
    "react-stately",
    "@kovalevskayaschool/pavetra-icons",
    "date-fns/*",
    "react-popper",
  ],
};

const mapCmp = components.reduce((acc, item) => {
  const parsedFiled = path.parse(item);
  const folder = parsedFiled.dir.split("/").at(-1);
  const pathToFile = path.resolve(parsedFiled.dir) + "/" + parsedFiled.base;
  return {
    ...acc,
    [folder]: pathToFile,
  };
}, {});

// const getFileName = (componentFile) => {
//   const folders = componentFile.split('/');
//   const folder = folders[folders.length - 2];
//   return folder;
// };

// const configCmps = {
//   input: mapCmp,
//   output: [
//     {
//       dir: 'dist/lib',
//       format: 'esm',
//       sourcemap: true,
//     },
//     {
//       dir: 'dist/lib',
//       format: 'cjs',
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     ...plugins,
//     typescript({
//       tsconfig: './tsconfig.build.json',
//       declaration: true,
//       declarationDir: `dist`,
//       sourceMap: true,
//     }),
//   ],
// };

const buildComponent = ({ inputFile, name }) => {
  return {
    input: inputFile,
    output: [
      {
        dir: `dist/${name}/index.js`,
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      // {
      //   dir: `dist/${name}`,
      //   format: 'cjs',
      //   exports: 'named',
      //   sourcemap: true,
      // },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: "./tsconfig.build.json",
        // declaration: true,
        // declarationDir: 'dist',
      }),
    ],
    external: ["react", "react-dom"],
  };
};

const componentsConfigs = components.map((item) => {
  const parsedFiled = path.parse(item);
  const folder = parsedFiled.dir.split("/").at(-1);
  const pathToFile = path.resolve(parsedFiled.dir) + "/" + parsedFiled.base;
  return buildComponent({ inputFile: pathToFile, name: folder });
});

// const defaultConfig = {
//   input: {
//     index: path.resolve('src', 'lib/index.ts'),
//     ...mapCmp,
//   },
//   output: [
//     {
//       dir: 'dist',
//       format: 'esm',
//       exports: 'named',
//     },
//   ],
// };

const configTypes = {
  input: "dist/lib/index.d.ts",
  output: {
    file: "dist/index.d.ts",
    format: "esm",
    external: [/\.css$/],
    plugins: [dts()],
  },
};
// export default componentsConfigs;
export default config;
