## 自动搞出一个 index.html

安装 html-webpack-plugin

```
npm install html-webpack-plugin -D
```

然后在 webpack.config.js 中引入:

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

html-webpack-plugin 会在打包结束后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中

template 参数是指模板 以参数中的 html 文件作为模板生成，第二步才把 bundle.js 注入到 html 中

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  })
];
```

## 每次打包把原来的 dist 文件夹删掉

npm install clean-webpack-plugin -D

在打包之前运行此插件

删掉的正是 output.path 里面的东西!!!

```javascript
const CleanWebpackPlugin = require("clean-webpack-plugin");

plugins: [new CleanWebpackPlugin.CleanWebpackPlugin()];
```
