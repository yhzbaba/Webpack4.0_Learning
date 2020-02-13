-D --save-dev
如何让 image 打包后图片名字不变呢?(file-loader)

```javascript
module: {
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          //图片打包后的路径
          outputPath: "images/",
          //placeholder 占位符
          name: "[name].[ext]"
        }
      }
    }
  ];
}
```

占位符:
[name] 文件名
[ext] 扩展名
[hash] 打包出的 hash 值

## url-loader

除了能做 file-loader 能做的事情，还能做别的
options 加一个 limit 如果小于这个值就转成 base64 字符串

## style-loader + css-loader

```javascript
test:/\.css$/,
use:['style-loader','css-loader']
```

### css-loader 配置项

importLoaders 这个选项就是哪怕在 scss 中引入的别的 scss 文件也得从 sass-loader 走起而不是直接进 css-loader
modules 这个选项就是模块化

```javascript
{
  loader:"css-loader",
  options:{
    importLoaders:2,
    modules:true
  }
}
```

模块化

```javascript
import style from "./index.scss";
import createMountain from "./createMountain";
import mountain from "./img/mountain.jpg";

var img = new Image();
img.src = mountain;
img.classList.add(style.mountain);

var root = document.getElementById("root");
root.append(img);

//下面的代码没有引入style.mountain因此样式无效这就是模块化
createMountain();
```

## 解析 scss

安装 sass-loader 以及 node-sass

```javascript
test:/\.scss$/,
use:['style-loader','css-loader','sass-loader']
//loader顺序是从后到前
```

## postcss-loader

配合插件对 css3 新特性进行 IE 等支持 添加厂商前缀

安装 postcss-loader、autoprefixer(插件)

写配置文件 postcss.config.js

```javascript
module.exports = {
  plugins: [require("autoprefixer")]
};
```

```javascript
test:/\.scss$/,
use:['style-loader','css-loader','sass-loader','postcss-loader']
```
