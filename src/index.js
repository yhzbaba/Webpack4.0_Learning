// import _ from "lodash";

// console.log(_.join(["a", "b", "c"], "***"));

import test from "./test.js";
import $ from "jquery";
console.log(test.name);

function getComponent() {
  return import(/*webpackChunkName:"lodash"*/ "lodash").then(
    ({ default: _ }) => {
      var element = document.createElement("div");
      element.innerHTML = _.join(["yhz", "hahaha"], "-");
      return element;
    }
  );
}

getComponent().then(element => {
  document.body.appendChild(element);
});
