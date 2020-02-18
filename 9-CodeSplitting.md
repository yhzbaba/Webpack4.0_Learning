# Webpack 和 Code Splitting

什么是代码分割?联系是什么?

## 引出

首先安装 lodash 引入工具库 然后我们有十万行业务逻辑
那么会把工具库和 yhz.js 统一打包到一个 js 中
实际上会有一个潜在的问题
假设 lodash 有 1Mb 业务逻辑也有 1Mb
如果不加压缩，打包后就是 2Mb
那么如果用户访问时就要加载 2Mb 的文件才能展示页面

## 问题

1 打包时间很大，加载时间很长
2 lodash 这种第三方库我们一般不会改动，但业务逻辑经常改动
改动后用户重新访问页面，又要加载 2Mb 的内容

## 解决方案

### 自己做 手动代码分割 搞成两个文件

```javascript
//lodash.js
import _ from "lodash";
window._ = _;

//index.js
console.log(_.join(["a", "b", "c"], "***")); //我们不再需要引入了
```

然后 webpack 配置多入口打包即可

当页面业务逻辑发生变化时，只要加载 index.js 即可

## Webpack 中的 Code Splitting(同步代码的代码分割)

有了这个，对代码进行拆分，那么用户体验会更好，而且 Webpack 中代码分割更简单、智能

首先我们还是让库和业务逻辑写在同一个文件中,并且用同步的方式引入

然后修改 webpack.common.js,在与 plugins、module 同级的地方添加配置:

```javascript
optimization: {
  splitChunks: {
    chunks: "all";
  }
}
```

那么打包的时候如果看到了公用的库引入，就会自动拆分出 vendors~[name].js 文件出来

## 异步的代码分割

异步载入组件方式不用配置 optimization 也会自动代码分割

```javascript
//index.js
function getComponent() {
  return import("lodash").then(({ default: _ }) => {
    var element = document.createElement("div");
    element.innerHTML = _.join(["yhz", "hahaha"], "-");
    return element;
  });
}

getComponent().then(element => {
  document.body.appendChild(element);
});
```
