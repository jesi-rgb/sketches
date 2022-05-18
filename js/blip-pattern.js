function setup() {
  frameRate(12);
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeWeight(4);
  off = 200;
  spc = 3;
  spc *= 10;
  noLoop();
  looping = false;
}

function draw() {
  background(250, 245, 240);
  drawGrid((pattern = 11));
}

function drawGrid(pattern = 19) {
  i = 0;
  for (x = off; x < w - off; x += spc) {
    for (y = off; y < w - off; y += spc) {
      a = floor(map(sin(frameCount / 100), -1, 1, 2, 20));

      if (i % pattern == floor(frameCount / 5) % pattern) {
        stroke(20, 20, 45);
        strokeWeight(spc);
      } else {
        stroke(20, 20, 45, 160);
        strokeWeight(spc / 2);
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
