## 用 import 语法懒加载

```javascript
async function getComponent() {
  const { default: _ } = await import(/*webpackChunkName:"lodash"*/ "lodash");
  const element = document.createElement("div");
  element.innerHTML = _.join(["yhz", "hahaha"], "-");
  return element;
}

document.addEventListener("click", () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
});
```

指的就是通过 import 异步加载模块,执行 import 的语法的时候才会被加载,这就叫懒加载
这样页面的加载速度就更快了

新版本自动 polyfill

## 打包分析

我们可以借助打包分析的一些工具对我们打包生成的文件进行分析，看打包是否合理

```
webpack分析工具的git仓库:
github.com/webpack/analyse
```

首先要生成打包过程的描述文件
就是将 webpack --config ./build/webpack.dev.js 换成
webpack --profile --json > stats.json --config ./build/webpack.dev.js

然后打开 http://webpack.github.io/analyse/ 扔进去就行

## 异步加载模块的写法

F12 以后 Ctrl+Shift+P 输入 coverage

就是说我们为了提高代码的使用率，交互式的代码可以放到一个单独的模块
然后在使用它的时候异步加载这个模块即可
这也是 splitChunks 中 chunks 默认为 async 的原因
同步的代码去进行代码分割只是提升了缓存性能,并不会很大降低加载页面时间

## Prefetch/Preload

就是说假如所有的异步代码都是你点击的时候才去加载也会有不好的效果

我们要做的事情是,当首页有关的所有逻辑加载完毕的时候,此时网络空闲,偷偷将这些异步代码下载下来

方法:异步引入的时候加上魔法注释

```
/* webpackPrefetch:true */
```

#### webpackPrefetch 与 webpackPreload 的区别

前者是等待网络空闲才去加载
后者是与主模块一起加载的
所以最优解是 Prefetch
空闲时才去加载懒加载的文件
