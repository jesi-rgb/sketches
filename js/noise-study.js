// let font;
// function preload() {
//   font = loadFont("../SF-Mono-Regular.otf");
// }

function setup() {
  seed = random(1, 10000);
  randomSeed(seed);
  console.log(seed);
  looping = false;
  saving = false;
  noLoop();
  w = min(windowHeight, windowWidth);
  createCanvas(w, w);
  background(250, 245, 240);
}

function draw() {
  //   advancedGradientSquare(0, 0, width, height);
  advancedGradientSquare(0, 0, width, height);

  //   addHandle();
  if (saving) save("frame" + frameCount + ".png");
  noLoop();
}

//////////////////////////////////////////////////////////

function gradientSquare(x_min, x_max, y_min, y_max) {
  print("hola");
  for (x = x_min; x < x_max; x++) {
    for (y = y_min; y < y_max; y++) {
      let chance = random(0.05, 0.9);
      var willDraw = chance * y_max < y;
      if (willDraw) set(x, y, color(0));
    }
  }
  updatePixels();
}

function advancedGradientSquare(x_min, y_min, w, h, power = 2, minAlpha = 0) {
  x_max = x_min + w;
  y_max = y_min + h;
  perFrame = 300;
  iterations = 1000;
  print(power);
  for (a = 0; a < iterations; a++) {
    for (i = 0; i < perFrame; i++) {
      x = random(x_min, x_max);
      y = random(y_min, y_max);
      _alpha = minAlpha + 45 * pow(y / y_max, power);
      //   _alpha = minAlpha + 245 * pow(x / x_max, power);

      alpha_v = map(_alpha, minAlpha, minAlpha + 245 * pow(0.5, power), 255, 0);
      c = color(20, 20, 45, alpha_v);
      noStroke();
      fill(c);
      circle(x, y, 1.5 + (1 / sqrt(3 * a)) * 10);
    }
  }
}

function perlinGradientSquare(x_min, y_min, w, h, power = 3, minAlpha = 10) {
  x_max = x_min + w;
  y_max = y_min + h;
  perFrame = 2000;
  for (i = 0; i < perFrame; i++) {
    x = random(x_min, x_max);
    y = random(y_min, y_max);

    alpha_v = noise(x * (w / 500000), y * (h / 100000), frameCount / 100) * 500;
    c = color(20, 20, 40, alpha_v);

    noStroke();
    fill(c);
    circle(x, y, 2 + (1 / sqrt(4 * frameCount)) * 5);
    // set(x, y, c);
  }
}

function perlinGradientSquare2(x_min, y_min, w, h, power = 3, minAlpha = 10) {
  x_max = x_min + w;
  y_max = y_min + h;
  perFrame = 9000;
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      //   x = random(x_min, x_max);
      //   y = random(y_min, y_max);

      alpha_v =
        noise(x * (w / 500000), y * (h / 100000), frameCount / 100) * 500;
      c = color(20, 20, 40, alpha_v);

      // noStroke();
      // fill(c);
      // circle(x, y, 3 + (1 / sqrt(4 * frameCount)) * 5);
      set(x, y, c);
    }
  }
}

/////////////////////////////////7

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
  console.log(keyCode);
  switch (keyCode) {
    // pressing the 's' key
    case "s":
      frameRate(3);
      frameCount = 0;
      saving = !saving;
      looping = !looping;

      if (looping) loop();
      if (!saving) frameRate(60);
      break;

    case 32:
      print("ass");
      if (looping) {
        noLoop();
        looping = false;
      } else {
        loop();
        looping = true;
      }

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
