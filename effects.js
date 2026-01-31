function runawayEffect(btn) {
  btn.style.position = "absolute";
  btn.style.left = Math.random() * 80 + "%";
  btn.style.top = Math.random() * 80 + "%";
}

function sizeEffect(btn, grow = true) {
  const scale = grow ? 1.1 : 0.9;
  btn.style.transform = `scale(${scale})`;
}