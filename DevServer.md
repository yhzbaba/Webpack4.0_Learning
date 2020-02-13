## 法一

webpack --watch

## 法二 webpack-dev-server

自动重新打包，并且自动刷新网页

安装 webpack-dev-server

```
npm i webpack-dev-server-D
```

然后 scripts 加上

```
"start":"webpack-dev-server"
```

配置 webpack-dev-server

```javascript
devServer:{
  contentBase: "./dist",     //指定启动的服务器根路径在哪里
  open: true                 //启动时会自动打开浏览器，自动访问服务器地址
  proxy:{
    "/api": "http://localhost:3000"      //跨域代理
  },
  port: 8090      //开启服务的端口号
}
```

# 自己写一个监听功能的服务器

安装

```
npm install express webpack-dev-mideleware -D
```

```javascript
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const config = require("./webpack.config");

//返回编译器 编译器执行一次 就会帮你打包一次
//在node中使用webpack
const complier = webpack(config);

const app = express();

app.use(
  //这个东西就能监听改动了!
  webpackDevMiddleWare(complier, {
    publicPath: config.output.publicPath
  })
);

app.listen(3000, () => {
  console.log("server is running at 3000");
});
```

## Command Line Interface

webpack --config webpack.config.js

## Node.js API

```javascript
webpack(
  {
    // Config Object
  },
  (err, status) => {
    if (err || statud.hasErrors()) {
      // handle errors here
    }
    // Done processing
  }
);
```
