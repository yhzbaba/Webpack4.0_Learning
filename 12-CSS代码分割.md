## 安装插件

```
npm install mini-css-extract-plugin -D
```

## 在打包文件中引入

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//plugins中
new MiniCssExtractPlugin({
  filename:"[name].css",
  chunkFilename:"[name].chunk.css"
});

//module中
有关scss、css的最后一个插件"style-loader"
换成 MiniCssExtractPlugin.loader
```

然后记得在 package.json 中 sideEffects 写上

```
"sideEffects": [
  "*.css"
]
```

这个插件还有一个功能,如果引入了多个 css 文件，会给你打包汇总到一个文件中去

## 打包后压缩

即代码压缩与合并

这也需要一个插件 optimize-css-assets-webpack-plugin

先安装(npm)

然后引入插件

```javascript
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
```

然后在 optimization 中写入

```javascript
optimization: {
  minimizer: [new OptimizeCssAssetPlugin({})];
}
```
