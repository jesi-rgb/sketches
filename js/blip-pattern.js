function setup() {
  //   frameRate(12);
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeWeight(4);
  off = 100;
  spc = 3;
  spc *= 10;
  noLoop();
  looping = false;
}

function draw() {
  background(250, 245, 240);
  drawGrid((pattern = 18));
}

function drawGrid(pattern = 19) {
  i = 0;
  t = frameCount / 10;
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

      point(y, x);
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
