const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist", //服务器根路径
    open: true, //开启服务器时自动打开浏览器访问服务地址
    proxy: {
      "/api": "http://localhost:3000"
    },
    port: 8090,
    hot: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(commonConfig, devConfig);
