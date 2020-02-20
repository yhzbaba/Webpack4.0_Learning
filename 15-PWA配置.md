就是你打开一个页面成功
然后服务器突然挂掉了
这个时候你还能凭本地缓存等打开之前打开过的网页
这个就叫 PWA

## 实现方法

谷歌已经写过一个插件了
安装

```
npm i workbox-webpack-plugin -D
```

然后在 webpack.prod.js 中引入插件

```javascript
const WorkboxPlugin = require("workbox-webpack-plugin");

plugins: [
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
  })
]; //service worker
```

然后在 index.js 中注册:

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service-worker registed");
      })
      .catch(error => {
        console.log(error);
      });
  });
}
```
