function setup() {
  //   frameRate(4);
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  strokeWeight(4);
  spc = w / 23;
  off = w / 10;
  noLoop();
  looping = false;
  saving = false;
  angle = 0;
  pattern = 11;
}

function draw() {
  background(250, 245, 240);

  gridPatternBased((pattern = 4));

  if (saving) save("frame" + frameCount + ".png");
}

function gridSineBased() {
  i = 0;
  t = frameCount / 30;
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

function gridDistBased() {
  i = 0;
  t = frameCount / 20;
  radius = 300;

  var x_c = width / 2 + radius * cos(angle);
  var y_c = height / 2 + radius * sin(angle);

  angle += 0.02;

  //   stroke(255, 0, 0);
  //   point(x_c, y_c);

  for (x = off; x < w - off; x += spc) {
    for (y = off; y < w - off; y += spc) {
      d_1 = dist(x, y, x_c, y_c);
      d_2 = dist(x, y, width - x_c, height - y_c);

      d_s_1 = t + d_1 / 20;
      d_s_2 = t + d_2 / 20;

      if (i % 2 == 0) {
        val = sin(d_s_1);
      } else {
        val = cos(d_s_2);
      }

      str_w = map(val, -1, 1, spc / 2, spc);
      str_alpha = map(val, -1, 1, 0, 255);
      strokeWeight(str_w);
      stroke(20, 20, 45, str_alpha);

      point(x, y);
      i++;
    }
  }
}
function gridPatternBased(pattern = 19) {
  i = 0;
  t = frameCount;
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
    save(`frame_${pattern}`);
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
    frameRate(15);
    // frameCount = 0;
    saving = !saving;
    looping = !looping;

    if (looping) loop();
  }
}
