let font;
let offset = 0;
let palette = ["#303030", "#04e695", "#f8f8f8"];
function preload() {
  font = loadFont("../SF-Mono-Regular.otf");
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    let sx2 = x + cos(a + angle) * radius;
    let sy2 = y + sin(a + angle) * radius;
    fill(random(palette));
    //   line(x, y, sx, sy);
    beginShape();
    vertex(x, y);
    vertex(sx, sy);
    vertex(sx2, sy2);
    endShape(CLOSE);
  }
}

class Hexagon {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  display() {
    fill(this.color);

    stroke(0);
    strokeWeight(0.2);
    polygon(this.x, this.y, this.radius, 6);

    strokeWeight(0.4);
    noFill();
    ellipse(this.x, this.y, this.radius);
  }
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
  hexs = tilePlaneHex(90);
}

function draw() {
  colorMode(RGB);
  background(24);

  hexs.map((h) => h.display());

  addHandle();
  if (saving) save("frame" + frameCount + ".png");
}

function tilePlaneHex(radius) {
  l = radius;
  b = Math.sqrt(radius ** 2 - (l / 2) ** 2);
  dy = 2 * b;
  dx = radius + l / 2;

  hexs = [];
  for (let i = offset; i < width / dx - offset + radius; i++) {
    for (let j = offset; j < height / dy - offset + radius; j++) {
      if (i % 2 == 0) {
        y = j * dy;
      } else {
        y = b + j * dy;
      }
      x = i * dx;
      hexs.push(new Hexagon(x, y, radius, color("#AAAAAAA5")));
    }
  }

  return hexs;
}

////////////////////////////
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
      console.log("looping");
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
