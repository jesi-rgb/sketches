// ffmpeg command used: ffmpeg -i frame%05d.png -i palette.png -frames:v 35 -vf scale=650:650 ../outputs/output_2.gif

let fontMono;
function preload() {
  fontMono = loadFont("SF-Mono-Regular.otf");
}

class Circle {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r / 2;
    this.color = c;
    this.growing = true;
  }

  display() {
    // blendMode(DIFFERENCE);
    // noStroke();
    stroke(this.color);
    strokeWeight(3);
    noFill();
    fill(this.color);
    point(this.x, this.y);
    // line(this.x, this.y, this.x + this.r / 2, this.y);
    circle(this.x, this.y, this.r);
  }

  grow() {
    if (this.growing) this.r += 0.5;
  }

  touchedCircle(circles, padding) {
    if (this.growing) {
      circles.forEach((c) => {
        if (c.x != this.x && c.y != this.y) {
          var rDist = dist(c.x, c.y, this.x, this.y);
          var rSum = c.r / 2 + this.r / 2;

          if (rDist < rSum + padding) {
            this.growing = false;
          }
        }
      });
    }
  }

  touchedEdges(minW, maxW, minH, maxH) {
    if (
      this.x + this.r / 2 >= maxW ||
      this.x - this.r / 2 <= minW ||
      this.y + this.r / 2 >= maxH ||
      this.y - this.r / 2 <= minH
    )
      this.growing = false;
  }

  update() {
    this.x += random() * sin(frameCount / 30);
    this.y += random() * sin(frameCount / 30);
    // console.log(random() * sin(frameCount / 1000));
    // this.r += pow(this.x - this.y, 2);
  }
}

// global vars
let w;
let circles = [];
let offset = 200;

function setup() {
  w = min(windowWidth, windowHeight) - 100;
  wx = w;
  wy = w;
  //   frameRate(3);
  colorMode(HSB);
  createCanvas(wx, wy);

  generateCirclesOneByOne(1000);
  circles.map((c) => c.display());
}

function draw() {
  noLoop();
  blendMode(BLEND);
  background(0, 15, 15);
  //   drawFrame();
  //   generateCirclesStep();

  //   circles.map((c) => c.update());

  circles.map((c) => c.display());
  //   circles.map((c) => c.grow());
  //   circles.map((c) =>
  //     c.touchedEdges(offset, width - offset, offset, height - offset)
  //   );

  //   circles.map((c) => c.touchedCircle(circles, 10));
  //   noLoop();

  addHandle();
  //   save(`frame${frameCount}.png`);
}

function generateCircles(n) {
  for (let i = 0; i < n; i++) {
    let randomX, randomY;
    let numTries = 100;
    let n = 0;
    do {
      randomX = random(offset, w - offset);
      randomY = random(offset, w - offset);
      n++;
    } while (checkOverlap(randomX, randomY) && n < numTries);

    if (n != numTries)
      circles.push(new Circle(randomX, randomY, 10, color(255, 255, 0)));
  }
}

function generateCirclesOneByOne(n) {
  for (let i = 0; i < n; i++) {
    const numTries = 10;
    var nt = 0;

    do {
      randomX = random(offset, w - offset);
      randomY = random(offset, w - offset);
      nt++;
    } while (checkOverlap(randomX, randomY) && nt < numTries);

    if (nt == numTries) {
      console.log("skip");
      continue;
    }

    var c = new Circle(randomX, randomY, 1, color(255, 255, 0));

    while (c.growing) {
      c.grow();
      c.touchedEdges(offset, w - offset, offset, w - offset);
      c.touchedCircle(circles, 10);
    }

    const paletteWidth = 5;
    const randomH = random(0, 360 - paletteWidth);
    // console.log(randomH + " -> " + (randomH + paletteWidth));
    c.color = color(
      map(c.r, 1, 100, randomH, randomH + paletteWidth),
      map(c.x, offset, w - offset, 0, 100),
      100
    );

    circles.push(c);
  }
}

function generateCirclesStep() {
  if (frameCount % 100 == 0) {
    let randomX, randomY;
    let numTries = 100;
    let n = 0;
    do {
      randomX = random(offset, w - offset);
      randomY = random(offset, w - offset);
      n++;
    } while (checkOverlap(randomX, randomY) && n < numTries);

    if (n != numTries)
      circles.push(new Circle(randomX, randomY, 0, color(255, 255, 0)));
  }
}

function generateCircleOnClick() {
  circles.push(new Circle(mouseX, mouseY, 1, color(255, 255, 0)));
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    save(`frame${new Date().getSeconds()}.png`);
  }
}

function checkOverlap(randomX, randomY) {
  var overlaps = [];

  if (circles.length > 1) {
    circles.forEach((c) => {
      var d = dist(c.x, c.y, randomX, randomY);
      overlaps.push(d > c.r / 2);
    });

    return overlaps.includes(false);
  } else return false;
}

function drawFrame() {
  stroke(240);
  noFill();
  rect(offset, offset, w - 2 * offset, w - 2 * offset);
}

function addHandle() {
  textFont(fontMono);

  textSize(40);
  noStroke();
  fill(255, 150);

  textAlign(RIGHT, BASELINE);
  text("@jesi_rgb", w - 50, w - 50);
}
