## Shimming

意思是垫片???

这个概念比较宽泛

例如
就是说假如你在另一个模块里面也写了\$ 但是到处引入 jquery 不太现实
这个时候需要使用 webpack 自带的 ProvidePlugin 插件,像这样:

```javascript
new webpack.ProvidePlugin({
  $: "jquery"
});
```

当你遇到了\$字符串,打包时就会偷偷帮你在模块中引入 jquery

## 其他用法

### 想让模块中的 this 指向 window 怎么办

下载 imports-loader

```javascript
{
  loader: "imports-loader?this=>window";
}
```
