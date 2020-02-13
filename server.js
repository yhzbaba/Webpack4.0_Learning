const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const config = require("./webpack.config");

//返回编译器 编译器执行一次 就会帮你打包一次
//在node中使用webpack
const complier = webpack(config);

const app = express();

app.use(
  webpackDevMiddleWare(complier, {
    publicPath: config.output.publicPath
  })
);

app.listen(3000, () => {
  console.log("server is running at 3000");
});
