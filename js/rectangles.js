let spacing = 30;
let offset = 80;
var xoff = 0.01;

function setup() {
  frameRate(4);

  w = min(windowWidth, windowHeight);
  wx = w;
  wy = w;
  createCanvas(wx, wy);
  frameRate(60);
}

function draw() {
  background(0);
  let buff = map(sin(xoff), 0, 1, 20, 25);
  let h = map(sin(xoff), 0, 1, 180, 359);

  colorMode(HSB);
  stroke(0);
  fill(h, 50, 100);
  for (let i = offset; i < w - offset; i += spacing) {
    for (let j = offset; j < w - offset; j += spacing) {
      rect(i + buff / 2, j + buff / 2, spacing - buff, spacing - buff);
    }
  }

  xoff += 0.01;
}
