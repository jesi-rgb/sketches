// let font;
let offset = 0;
let palette = ["#3fc1c9", "#f5f5f5", "#fc5185"];

// function preload() {
//   font = loadFont("../SF-Mono-Regular.otf");
// }
window.$attributes = {
  // here define the token features
  ole: 3,
};

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class Hexagon {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  display() {
    stroke(this.color);
    strokeWeight(this.radius / 30);
    this.color.setAlpha(80);
    fill(this.color);
    polygon(this.x, this.y, this.radius, 6);
  }

  breathe(frameCount) {
    this.radius += sin(frameCount / 20) * 0.04;
  }
}

function setup() {
  randomSeed(inputSeed);
  console.log(inputSeed);

  looping = false;
  saving = false;
  noLoop();

  w = min(windowHeight, windowWidth);
  console.log(w);
  createCanvas(w, w);

  background(24);
  hexs = tilePlaneHex(w * 0.1);

  //   recursiveHexs(hexs, 5);
}

function draw() {
  colorMode(RGB);
  background(24);

  hexs.map((h) => h.display());
  hexs.map((h) => h.breathe(frameCount));

  //   addHandle();
  if (saving) save("frame" + frameCount + ".png");
}

function tilePlaneHex(radius) {
  l = radius;
  b = Math.sqrt(radius ** 2 - (l / 2) ** 2);
  dy = 2 * b;
  dx = radius + l / 2;

  hexs = [];
  for (let i = offset; i < width / dx - offset + 1; i++) {
    for (let j = offset; j < height / dy - offset + 1; j++) {
      if (i % 2 == 0) {
        y = j * dy;
      } else {
        y = b + j * dy;
      }
      x = i * dx;
      hexs.push(
        new Hexagon(
          x,
          y,
          radius,
          color(palette[int(random(0, palette.length))])
        )
      );
    }
  }
  console.log(hexs.length);

  return hexs;
}

function recursiveHexs(hexs, n = 2) {
  if (n > 0) {
    hexs.forEach((h) => {
      hexs.push(
        new Hexagon(
          h.x,
          h.y,
          h.radius - Math.log(n * 10),
          color(random(palette))
        )
      );
    });
    recursiveHexs(hexs, n - 1);
  }
  console.log(hexs.length);
}

////////////////////////////
function addHandle() {
  fill(40);
  stroke(250);
  strokeWeight(4);
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
