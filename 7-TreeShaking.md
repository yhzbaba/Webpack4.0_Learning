## 存在的问题

当我们的一个 JS 文件引入另一个 JS 模块时，webpack 默认会把引入的模块所有的内容都打包到主 JS 文件
这样显然是不合理的(就算你只引入了其中的一个功能它也会帮你全部打包进来)

## TreeShaking 摇树

一个模块好比一棵树
引入的东西才打包，不引入的东西去掉(摇晃掉)

**注意 TreeShaking 只支持 ES Module 的引入 即类似于 import {...} from './.."**
require 这种是 commonJS 的做法，不能支持

## 配置过程

development 模式默认没有 TreeShaking
因此要在与 modules、plugins 同级的地方配置:

```javascript
optimization: {
  usedExports: true;
}
```

然后在 package.json 中配置:

```json
"sideEffects": false
```

但是如果有类似于@babel/polly-fill 这种模块需要特殊处理的

```json
"sideEffects": ["@babel/polly-fill"]
```

这是因为,类似于@babel/polly-fill 这种模块不会导出任何东西
而是在 windows.Promise 这种挂载全局变量
那么 TreeShaking 会认为你没有导出任何东西那么就不需要打包你，这样会有错误

```txt
类似的文件还有："*.css" "*.scss"等等
```

## 注意

在开发环境情况下只会打个额外注释说"exports used:add"而不是去掉多余的东西
那是因为开发环境下我们如果需要用到 SourceMap 的话行号映射会出错

在生产环境下 optimization:{usedExports:true}不用写了
但是 sideEffects:["@babel/polly-fill"]这种还是要写的
