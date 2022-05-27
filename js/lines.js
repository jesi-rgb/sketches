let font;

let offset = 100;
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
  print(w - offset);
  createCanvas(w, w);
  background(24);
}

function draw() {
  colorMode(RGB);
  background(20, 20, 45);
  //   noFill();
  //   stroke(240, 100);
  //   rect(offset, offset, w - 2 * offset, w - 2 * offset);

  lines();
  addHandle();
  if (saving) save("frame" + frameCount + ".png");
}

function lines() {
  x = offset;
  h = offset;
  buffY = 10;
  buffX = 20;

  while (x < w - offset) {
    h = offset + random(-5, 5);
    while (h < w - offset) {
      strokeWeight(2);

      if (random() > 0.98) {
        stroke(250, 245, 240);
      } else {
        stroke(250, 245, 240, 100);
      }

      delta_h = random(10, w / 6);

      end_point = h + delta_h;
      if (end_point > w - offset) {
        end_point = w - offset + random(-5, 5);
        line(x, h, x, end_point);
        break;
      }

      //   stroke(255, 255, 0);
      //   point(x, h);
      //   stroke(0, 255, 255);
      //   point(x, end_point);

      line(x, h, x, end_point);

      h += delta_h + buffY;
      print("h", h);
    }
    x += buffX;
    print("x", x);
  }
}

/////////////////////////////////////////////////// utils

function addHandle() {
  fill(250, 250, 220);
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
