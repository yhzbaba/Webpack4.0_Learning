const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");

const prodConfig = {
  mode: "production",
  //devtool: "cheap-module-source-map"
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
