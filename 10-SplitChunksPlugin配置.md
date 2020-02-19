首先第九讲中的代码分割，其实是底层使用了内置的 SplitChunksPlugin

## 修改异步引入模块后打包文件的文件名

这个文件名是按索引来的，类似于 0.js 这种
这时需要魔法注释:

```javascript
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["yhz", "hahaha"], "-");
      return element;
    }
  );
}
```

然后下载 Babel 官方推荐的异步引入模块插件
npm i @babel/plugin-syntax-dynamic-import

然后在.babelrc 中使用此插件

### 第一次打包结果

这次打包结果为 vendors~lodash.js

## 去掉 vendors~ 怎么办?

在 optimization 中的 splitChunks 配置 cacheGroups:

```javascript
optimization: {
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      vendors: false,
      default: false
    }
  }
}
```

### 第二次打包结果

这次显示文件名为 lodash.js,完全与魔法注释中写的内容一样了
这说明,我们在异步引入模块时,虽然不一定需要 optimization 中 splitChunks 的配置,
但是如果你进行了配置,同样是可以影响到打包结果的

## SplitChunksPlugin 配置详解

首先,当我们在 optimization 中的 SplitChunks 配置项写为一个空对象时,会有一个默认的配置替代，即

```javascript
splitChunks: {
  chunks: "async",
  minSize: 0,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}
```

#### chunks

此参数应与 cacheGroups 配合起来用

chunks:"async" 指的是代码分割的时候只对异步引入有效
在 vendors 与 default 都为 false 的情况下,即使设置成 "all" ,同步引入的模块也不一定能被分割,而是走到 cacheGroups 中的 vendors 里的 test，发现这个文件来自于 node_modules(这是显然的因为我们是通过 npm 安装的)
于是这时才会把同步引入的模块分割出去,并且认为这个文件符合 vendors 这个组,那么此时文件名会变成 vendors~yhz.js
其中 yhz 是这个引入模块的入口名字,即 entry 里面的那个入口名
此外,可以在 vendors 中设置 filename 属性,例如 vendors.js,那么打包出来的分割文件名就叫 venders.js

#### minSize

我发现你引入的这个库的大小超过这个值,我才会帮你做代码分割,否则我不做代码分割
然后我在实验中引入自己的一个小模块 test.js 此时会走到 default 里面,也可以再加 filename 属性例如"common.js"

#### maxSize

当被拆解的模块超过这个值，webpack 会尝试更细的代码分割

#### minChunks

当这个模块被引入了超过这个值的次数，webpack 才会将其进行代码分割

#### maxAsyncRequests

同时只能加载这么多文件，默认即可

#### automaticNameDelimiter

文件名 cacheGroup 与 entry 之间的那个连接符

#### reuseExistingChunk

如果一个模块已经被打包过了，那么这一次就会忽略它，而是去复用已经打包好的这部分代码
