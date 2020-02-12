const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    yhz: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
