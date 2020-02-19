## 打包时把 ES6 转为 ES5

# Babel

首先要安装 babel-loader 和@babel/core
后者是 babel 核心库，它能够让 babel 去识别 js 代码里的内容，然后把 js 代码转化成 AST 抽象语法树，
然后把抽象语法树编译成新的语法出来

然后写 config

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }
  ];
}
```

当我们使用 babel-loader 处理 js 文件的时候，babel-loader 只是 webpack 和 babel 做通信的一个桥梁
但实际上 babel-loader 并不会把 ES6 翻译成 ES5
我们需要安装@babel/preset-env 这个里面包含了所有 ES6 翻译成 ES5 的转换规则

然后要做一个配置

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"]
  }
}
```

也可以创建.babelrc 加上 presets 就行

## 变量补充

上面只是语法转换，我们还需要把函数、变量补充到低版本浏览器里
安装：@babel/polyfill
然后在需要的 js 文件头部加上

```javascript
import "@babel/polyfill";
```

但这样引入有点浪费，需要啥就引入啥就行，这时需要配置：

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage"
        }
      ]
    ]
  }
}
```

**设置完 useBuiltIns 以后，js 中的 import 也不用了！**

此外 presets 可以配置 target 参数，根据浏览器支持情况看是不是要转 ES5

## 有效避免 polyfill 的问题(写类库而不是开发的时候用)

polyfill 会全局注入，污染全局变量，而 plugin 是以闭包的形式间接注入

安装@babel/plugin-transform-runtime 和 @babel/runtime 和 @babel/runtime-corejs2

presets 参数换成 plugins 参数(babel-loader 中的 plugins)

```
plugins: [
  [
    "@babel/plugin-transform-runtime",
    {
      corejs: 2,
      helpers: true,
      regenerator: true,
      useESModules: false
    }
  ]
]
```

babel-loader 里面的 options 可以扔到.babelrc 里面去 但是.babelrc 不能写注释

附.babelrc 的内容：(实际上注释要删掉)

```
{
  // presets: [
  //   [
  //     "@babel/preset-env",
  //     {
  //       useBuiltIns: "usage"
  //     }
  //   ]
  // ]
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

最后注意，react 框架代码要额外配置，由于没学 react，先不看了

```url
bilibili.com/video/av82870320?p=19
```
