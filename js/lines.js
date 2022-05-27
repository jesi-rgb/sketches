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
  background(24);
  lines();
  addHandle();
  if (saving) save("frame" + frameCount + ".png");
}

function lines() {
  push();
  translate(w / 2, w / 2);
  rotate(radians(0));
  x1 = y1 = 0;
  x2 = 0;

  stroke(250);
  for (i = 0; i < 100; i++) {
    y2 = i;
    line(x1, y1, x2, y2);
  }
  pop();
}

/////////////////////////////////////////////////// utils

function addHandle() {
  fill(40);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  textFont(font);
  textSize(20);
  text("@jesi_rgb", w - 30, w - 30);
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
  console.log(key);
  switch (key) {
    // pressing the 's' key
    case "s":
      frameRate(3);
      frameCount = 0;
      saving = !saving;
      looping = !looping;

      if (looping) loop();
      if (!saving) frameRate(60);
      break;

    // pressing the '0' key
    case "0":
      frameCount = 0;
      loop();
      noLoop();
      break;

    // pressing the ← key
    case "ArrowLeft":
      frameCount >= 0 ? (frameCount -= 1) : (frameCount = 0);
      noLoop();
      console.log(frameCount);
      break;

    // pressing the → key
    case "ArrowRights":
      frameCount += 1;
      noLoop();
      console.log(frameCount);
      break;

    default:
      break;
  }
}
