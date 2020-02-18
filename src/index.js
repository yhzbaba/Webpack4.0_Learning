// import _ from "lodash";

// console.log(_.join(["a", "b", "c"], "***"));

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
