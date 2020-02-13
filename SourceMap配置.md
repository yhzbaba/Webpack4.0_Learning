## entry 与 output 配置

```javascript
entry:{
  main:'./src/index.js',
  sub:'./src/index.js'
}
//这是个占位符 将会打成main.js与sub.js
output:{
  publicPath:'http://cdn.com.cn',
  filename:'[name].js',
  path:path.resolve(\_\_dirname,'dist');
}
```

publicPath 好让后台也能用静态资源

## source-map

现在知道 dist 目录下 bundle.js 文件出错
SourceMap 是一个映射关系，他知道 dist 目录下 bundle.js96 行实际对应 src 目录下第一行

当前其实是 index.js 第一行出错了

使用:

```javascript
devtool: "source-map";
```

### inline-source-map

当把 source-map 改为 inline-source-map 时，map 会被变成 base64 字符串放到 bundle.js 底部

### cheap-inline-source-map

加了 cheap- 以后,错误只会精确到行 不会精确到列了
而且 cheap- 只管业务代码，依赖代码不管

### module-

就把依赖的代码也进行映射

### eval

通过 eval 的执行形式进行映射
针对复杂代码就不太精确
但是最快

### 实践

mode 为 development 时，devtool 设为"cheap-module-eval-source-map" 又快又准
mode 为 production 时，devtool 设为"cheap-module-source-map" 提示效果会更好
