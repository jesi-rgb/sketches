let offset = 200;
let spacing = 50;

let fontMono;
function preload() {
  fontMono = loadFont("SF-Mono-Regular.otf");
}

class Rectangle {
  constructor(x, y, w, h, c = color(127)) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
  }

  display() {
    stroke(0);
    // line(offset, this.y, this.x, this.y);
    // line(this.x, this.y, width - offset, this.y);
    strokeWeight(5);
    fill(this.color);

    blendMode(HARD_LIGHT);
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
}

let rects = [];
function setup() {
  w = min(windowWidth, windowHeight);
  wx = w;
  wy = w;
  createCanvas(wx, wy);
}

function draw() {
  background(250, 245, 240);
  advancedGradientSquare(0, 0, width, height);
  populateFrame();

  rects.forEach((r) => {
    r.display();
  });

  blendMode(BLEND);
  noLoop();
  //   drawFrame();
  addHandle();
}

function advancedGradientSquare(x_min, y_min, w, h, power = 0, minAlpha = 40) {
  x_max = x_min + w;
  y_max = y_min + h;
  perFrame = 300;
  iterations = 1000;
  for (a = 0; a < iterations; a++) {
    for (i = 0; i < perFrame; i++) {
      x = random(x_min, x_max);
      y = random(y_min, y_max);
      _alpha = pow(y / y_max, power);
      // _alpha = minAlpha + pow(x / x_max, power);

      alpha_v = map(_alpha, 0, pow(1, power), 0, 50);
      c = color(20, 20, 40, alpha_v);
      noStroke();
      fill(c);
      circle(x, y, 1 + (1 / sqrt(4 * a)) * 5);
    }
  }
}

function populateFrame() {
  const totalArea = pow(width - offset, 2);
  var area = 0;
  var i = 0;
  while (area <= totalArea) {
    var x, y;
    do {
      x = random(offset, width - offset);
      y = random(offset, height - offset);
    } while (checkPointInEveryRect());

    var w = min(abs(x - offset), abs(x - (width - offset))) * 2;
    var h = min(abs(y - offset), abs(y - (height - offset))) * 2;

    area += w * h;
    i++;

    rects.push(
      //   new Rectangle(x, y, w, h, color(map(i, 0, 6, 0, 255), 20, 20, 160))
      new Rectangle(x, y, w, h, color(20, 20, 20, 160))
    );
  }
}

function testPoint() {
  var x = random(offset, width - offset);
  var y = random(offset, height - offset);

  if (checkPointInRect(x, y, rects[0])) stroke(255, 0, 0);
  else stroke(0, 255, 0);

  strokeWeight(10);
  point(x, y);
}

function createRects(n = 1) {
  for (let i = 0; i < n; i++) {
    var w = random(100, 300);
    var h = random(100, 300);
    var x = random(offset + w / 2, width - offset - w / 2);
    var y = random(offset + h / 2, height - offset - h / 2);

    rects.push(new Rectangle(x, y, w, h));
  }

  console.log(checkOverlap(rects[0], rects[1]));
}

function checkPointInEveryRect(x, y) {
  var mask = [];
  rects.forEach((r) => {
    mask.push(checkPointInRect(x, y, r));
  });

  return mask.includes(true);
}

function checkPointInRect(x, y, r) {
  rx = r.x - r.w / 2;
  ry = r.y - r.h / 2;
  rx1 = r.x + r.w / 2;
  ry1 = r.y + r.h / 2;

  return x > rx && x < rx1 && y > ry && y < ry1;
}

function checkOverlap(r1, r2) {
  return !(
    r1.x > r2.x + r2.w ||
    r2.x > r1.x + r1.w ||
    r1.y > r2.y + r2.h ||
    r2.y > r1.y + r1.h
  );
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    save(`frame${new Date().getMilliseconds()}.png`);
  }
}

function drawFrame() {
  stroke(240);
  strokeWeight(1);
  noFill();
  rect(offset, offset, w - 2 * offset, w - 2 * offset);
}

function addHandle() {
  textFont(fontMono);

  textSize(15);
  stroke(250, 245, 240);
  fill(24);

  textAlign(RIGHT, BASELINE);
  text("@jesi_rgb", w - 50, w - 50);
}
