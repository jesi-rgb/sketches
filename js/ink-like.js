let offset;
let spacing;
let looping;

let font;
function preload() {
  font = loadFont("../SF-Mono-Regular.otf");
}

function setup() {
  seed = random(1, 10000);
  randomSeed(seed);
  console.log(seed);

  looping = false;
  saving = false;
  noLoop();

  w = min(windowHeight, windowWidth);
  createCanvas(w, w);
  background(24);
}

function draw() {
  colorMode(RGB);
  background(24, 10);
  bigRotatingCircle();
  centerGrowingCircle();

  addHandle();

  if (saving) save("frame" + frameCount + ".png");
}

function bigRotatingCircle() {
  let posX = w / 2;
  let posY = w / 2;
  let radius = 400;
  let noiseRes = 10;
  let speed = frameCount / 100;
  let scale = 20;

  colorMode(HSB);
  for (a = 0; a < TAU; a += TAU / 100) {
    x = posX + radius * cos(a);
    y = posY + radius * sin(a);
    stroke(map(a, 0, TAU, 0, 360), 50, 100);
    // stroke(250);

    size = noise(x * noiseRes + speed, y * noiseRes + speed) * scale;
    strokeWeight(size);
    push();
    translate(posX, posY);
    rotate(speed);
    point(x, y);
    pop();
  }
}

function centerGrowingCircle() {
  let posX = w / 2;
  let posY = w / 2;
  let radius = (0.1 * sin(frameCount / 100) + 0.9) * 100;

  let noiseRes = 10;
  let speed = frameCount / 1000;
  let scale = 10;

  colorMode(HSB);
  for (a = 0; a < TAU; a += TAU / 100) {
    x = posX + radius * cos(a);
    y = posY + radius * sin(a);

    size = noise(x * noiseRes + speed, y * noiseRes + speed) * scale;
    strokeWeight(size);
    stroke(map(a, 0, TAU, 0, 360), 50, 100);
    // stroke(250);

    point(x, y);
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    save(`frame_${new Date().getMilliseconds()}`);
  }

  if (mouseButton === LEFT) {
    if (looping) {
      noLoop();
      looping = false;
    } else {
      loop();
      looping = true;
    }
  }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 83) {
    frameRate(10);
    // frameCount = 0;
    saving = !saving;
    looping = !looping;

    if (looping) loop();
  }
}

function addHandle() {
  fill(40);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  textFont(font);
  textSize(20);
  text("@jesi_rgb", w - 30, w - 30);
}
