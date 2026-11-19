const { resolve } = require("node:path");

module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: resolve(
    __dirname,
    "frontend/src/features/style/global.css",
  ),
};
