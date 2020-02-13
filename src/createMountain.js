import mountain from "./img/mountain.jpg";

function createMountain() {
  var img = new Image();
  img.src = mountain;
  img.classList.add(mountain);
  var root = document.getElementById("root");
  root.append(img);
}

export default createMountain;
