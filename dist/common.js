(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports) {

console.log("Hello world!");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
      console.log("service-worker registed");
    })["catch"](function (error) {
      console.log(error);
    });
  });
}

/***/ })
]]);