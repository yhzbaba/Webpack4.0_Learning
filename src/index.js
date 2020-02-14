import "./style.css";

var btn = document.createElement("button");
document.body.appendChild(btn);
btn.innerHTML = "Add!";

btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};
