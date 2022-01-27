// ffmpeg command used: ffmpeg -i frame%05d.png -i palette.png -frames:v 35 -vf scale=650:650 ../outputs/output_2.gif

let offset = 200;
var spacing = 100;
let fontMono;

function preload() {
  fontMono = loadFont("SF-Mono-Regular.otf");
}

function setup() {
  w = min(windowWidth, windowHeight) - 100;
  wx = w;
  wy = w;
  createCanvas(wx, wy);
}

function draw() {
  background(24, 60);
  stroke(255);

  makeGrid(offset, spacing, frameCount);
  drawLines(offset, spacing, frameCount);
  // saveFrames("renders/clocks" + frameCount, "png", 15, 30);
  textFont(fontMono);
  textSize(40);
  noStroke();
  fill(255, 40);
  // var tw_handle = text("@jesi_rgb", 0, 0);
  // tw = textWidth(tw_handle);
  textAlign(RIGHT, BASELINE);
  text("@jesi_rgb", w - 50, w - 50);
  save(`frame${frameCount}.png`);
}

function drawLines(offset, spacing, f) {
  var angle = 0;
  for (let j = offset; j < w - offset - spacing; j += spacing) {
    for (let i = offset; i < w - offset; i += spacing) {
      angle = (PI / 5) * sin(f / 30 + j * 0.01);
      stroke(map(angle, -(PI / 5), PI / 5, 100, 200));
      strokeWeight(map(angle, -(PI / 5), PI / 5, 1, 2));
      push();
      translate(i, j + spacing / 2);
      rotate(angle);
      line(0, -spacing / 2, 0, spacing / 2);
      pop();
    }
  }
}

function makeGrid(offset, spacing, f) {
  for (let j = offset; j < w - offset; j += spacing) {
    for (let i = offset; i < w - offset; i += spacing) {
      stroke(127);
      strokeWeight(2);
      point(i, j);
    }
  }
}
