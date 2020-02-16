# Hot Module Replacement

## HMR 对 CSS 的作用

我们希望当我们改变样式代码时不要帮我们刷新页面，改变样式就行了

hot 意思是让我们的 webpack-dev-server 开启 Hot Module Replacement 的功能

hotOnly 意思是即便是 HMR 的功能没有生效，我也不让浏览器自动重新刷新

```javascript
devServer:{
  contentBase: './dist',
  open: true,
  port: 8080,
  hot: true,
  hotOnly: true
}
```

然后要引入插件 HotModuleReplacementPlugin 这是一个 webpack 自带的插件，所以只要：

```javascript
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new CleanWebpackPlugin.CleanWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin()
];
```

## HMR 对 JS 的作用

HMR 对 JS 的作用也是类似的 否则当你更新 JS 代码时，整个页面都会刷新
有了 HMR，就能够监听模块变化，单个模块代码发生变化就重新执行该模块的代码

```javascript
import counter from "./counter";
import number from "./number";

counter();
number();

//如果配置了hot属性
if (module.hot) {
  //接受一个参数模块进行监听
  module.hot.accept("./number", () => {
    //这里可以做一些别的事情，例如清楚number模块已有的渲染
    number();
  });
}
```

这段 HMR 代码在引入 css 时不用写，因为引入 css 文件的时候 css-loader 内置了这一段代码
vue-loader 也是一样
react 组件也是一样
其他的例如数据文件需要手动写 module.hot.accept 这段代码
