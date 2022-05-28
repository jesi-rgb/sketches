let font;
let palettes;
let palette;

let offset = 100;
// function preload() {
//   font = loadFont("../SF-Mono-Regular.otf");
// }

function setup() {
  randomSeed(inputSeed);
  console.log(inputSeed);
  looping = false;
  saving = false;
  noLoop();
  w = min(windowHeight, windowWidth);
  print(w - offset);
  createCanvas(w, w);

  palettes = [
    {
      bg: color(20, 20, 45),
      main: color(250, 245, 240, 100),
      accent: color(244, 164, 171),
    },
    {
      bg: color(20, 18, 4),
      main: color(238, 42, 16, 100),
      accent: color(84, 68, 43),
    },
    {
      bg: color(106, 127, 98),
      main: color(200, 198, 175, 200),
      accent: color(215, 208, 200),
    },
    {
      bg: color(33, 28, 29),
      main: color(5, 142, 217, 200),
      accent: color(244, 235, 217),
    },
    {
      bg: color(245, 243, 246),
      main: color(64, 69, 79, 200),
      accent: color(187, 78, 164),
    },
    {
      bg: color(81, 75, 35),
      main: color(101, 104, 57),
      accent: color(203, 201, 173),
    },
  ];
  palette = random(palettes);
  //   palette = palettes[palettes.length - 1];
}

function draw() {
  colorMode(RGB);
  background(palette.bg);
  //   noFill();
  //   stroke(240, 100);
  //   rect(offset, offset, w - 2 * offset, w - 2 * offset);

  lines();
  //   addHandle();
  if (saving) save("frame" + frameCount + ".png");
}

function lines() {
  //exposed parameters
  streamWidth = random(50, 500);
  buffY = random(5, 50);
  buffX = random(1, 10);

  x = 0;

  push();
  translate(w / 2 + streamWidth / 4, w / 2 - streamWidth);
  rotate(radians(45));

  while (x < streamWidth) {
    h = -w;
    while (h < w * 3) {
      if (random() > 0.948) {
        stroke(palette.accent);
      } else {
        stroke(palette.main);
      }

      delta_h = random(10, w / 2);

      end_point = h + delta_h;

      strokeW = map(delta_h, 10, 13, 3, 0.6);
      strokeWeight(strokeW);

      line(x, h, x, end_point);

      h += delta_h + buffY;
    }
    x += buffX;
  }

  pop();
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
    save(`frame_${seed}.png`);
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
