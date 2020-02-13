import style from "./index.scss";
import createMountain from "./createMountain";
import mountain from "./img/mountain.jpg";

var img = new Image();
img.src = mountain;
img.classList.add(style.mountain);

var root = document.getElementById("root");
root.append(img);

createMountain();
