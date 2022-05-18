function setup() {
  //   frameRate(12);
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeWeight(4);
  spc = 5;
  spc *= 10;
  off = 50 + spc;
  noLoop();
  looping = false;
  saving = false;
}

function draw() {
  background(250, 245, 240);

  gridPatternBased();

  if (saving) save("frame" + frameCount + ".png");
}

function gridSineBased() {
  i = 0;
  t = frameCount / 20;
  for (x = off; x < w - off; x += spc) {
    for (y = off; y < w - off; y += spc) {
      rate = x / 2 + y / 2 + t;

      if (i % 2 == 0) {
        val = sin(rate);
      } else {
        val = cos(rate);
      }

      str_w = map(val, -1, 1, spc / 2, spc);
      str_alpha = map(val, -1, 1, 40, 255);
      strokeWeight(str_w);
      stroke(20, 20, 45, str_alpha);

      point(x, y);
      i++;
    }
  }
}
function gridPatternBased(pattern = 19) {
  i = 0;
  t = frameCount / 20;
  for (x = off; x < w - off; x += spc) {
    for (y = off; y < w - off; y += spc) {
      for (p = 0; p < pattern; p++) {
        if ((i + p) % pattern == floor(t) % pattern) {
          _alpha = map(p, 0, pattern, 255, 0);
          str_w = map(p, 0, pattern, spc, spc / 10);
          stroke(20, 20, 45, _alpha);
          strokeWeight(str_w);
        }
      }

      point(x, y);
      i++;
    }
  }
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    save(`frame_${new Date().getMilliseconds()}`);
  }

  if (mouseButton === LEFT) {
    print(looping);
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
