# Development 和 Production 模式的区分打包

开发环境中 SourceMap 非常全
打包时不会压缩

生产环境中 SourceMap 会很简洁
代码被压缩

创建两个文件 webpack.dev.js 和 webpack.prod.js
然后在 package.json 中

```json
"scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```

# 将 dev 与 prod 共同的配置项写入 webpack.common.js 中

npm i webpack-merge -D
然后

```javascript
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map"
};

module.exports = merge(commonConfig, prodConfig);
```

dev 同理。
