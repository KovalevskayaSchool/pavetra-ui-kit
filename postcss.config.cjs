const cssnano = require("cssnano");
const defaultPreset = require("cssnano-preset-lite");

const prodPlugins = [
  require("autoprefixer"),
  cssnano({
    preset: defaultPreset,
  }),
];
let plugins = [
  require("postcss-import"),
  require("@csstools/postcss-oklab-function"),
];

if (process.env.NODE_ENV === "production") {
  plugins = [...plugins, ...prodPlugins]
}

const config = {
  plugins,
};

module.exports = config;
