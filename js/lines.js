// let font;
let palettes;
let palette;

let offset = 100;
// function preload() {
//   font = loadFont("../SF-Mono-Regular.otf");
// }

function setup() {
  w = min(windowHeight, windowWidth);
  createCanvas(w, w);

  if (!seed) {
    seed = random(0, 999999);
  } else {
    seed = hashCode(seed);
  }

  randomSeed(seed);
  print(seed);
  noLoop();

  palettes = [
    {
      bg: color(20, 20, 45),
      main: color(250, 245, 240),
      accent: color(244, 164, 171),
    },
    {
      bg: color(20, 18, 4),
      main: color(238, 42, 16),
      accent: color(220, 208, 188),
    },
    {
      bg: color(106, 127, 98),
      main: color(200, 198, 175),
      accent: color(215, 208, 200),
    },
    {
      bg: color(33, 28, 29),
      main: color(5, 142, 217),
      accent: color(244, 235, 217),
    },
    {
      bg: color(245, 243, 246),
      main: color(64, 69, 79),
      accent: color(187, 78, 164),
    },
    {
      bg: color(81, 75, 35),
      main: color(101, 104, 57),
      accent: color(203, 201, 173),
    },
    {
      bg: color(49, 57, 60),
      main: color(33, 118, 255),
      accent: color(174, 218, 254),
    },
    {
      bg: color(110, 68, 255),
      main: color(184, 146, 255),
      accent: color(255, 194, 226),
    },
    {
      bg: color(15, 32, 46),
      main: color(195, 60, 84),
      accent: color(215, 207, 7),
    },
    {
      bg: color(35, 0, 7),
      main: color(217, 131, 36),
      accent: color(215, 207, 7),
    },
    {
      bg: color(238, 240, 242),
      main: color(20, 20, 20),
      accent: color(205, 162, 19),
    },
    {
      bg: color(172, 195, 166),
      main: color(20, 20, 20),
      accent: color(164, 14, 76),
    },
    {
      bg: color(48, 26, 75),
      main: color(109, 177, 191),
      accent: color(255, 234, 236),
    },
  ];
  palette = random(palettes);
  //   palette = palettes[1];
  //   palette = palettes[palettes.length - 1];
}

function draw() {
  colorMode(RGB);
  background(palette.bg);

  perlinGradientSquare(0, 0, width, height, (power = 0.4));
  lines();
}

function lines() {
  blendMode(BLEND);
  //exposed parameters
  streamWidth = int(random(1, 800));

  buffY = random(5, 50);
  buffX = random(1, 20);

  minStrokeWidth = 0.7;
  maxStrokeWidth = map(buffX, 1, 20, 0.7, 8);

  accentChance = random(0.9, 0.999);
  minLineLength = random(5, 10);
  maxLineLength = random(minLineLength + 10, w / 2);

  print(streamWidth, buffX, buffY, accentChance);

  x = 0;

  push();
  translate(w / 2 + streamWidth / 4, w / 2 - streamWidth);
  rotate(radians(45));

  while (x < streamWidth) {
    h = -w;
    while (h < w * random(0, 2)) {
      if (random() > accentChance) {
        stroke(palette.accent);
      } else {
        c = color(palette.main);
        c.setAlpha(255);
        stroke(c);
      }

      delta_h = random(minLineLength, maxLineLength);

      end_point = h + delta_h;

      strokeW = map(
        delta_h,
        minLineLength,
        maxLineLength,
        minStrokeWidth,
        maxStrokeWidth
      );
      strokeWeight(strokeW);

      line(x, h, x, end_point);

      h += delta_h + buffY;
    }
    x += buffX;
  }

  pop();
}

function perlinGradientSquare(x_min, y_min, w, h, power = 3, minAlpha = 10) {
  x_max = x_min + w;
  y_max = y_min + h;

  interpolator = d3.interpolateRgb(palette.bg, palette.main);
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      c = color(interpolator(random(random(random(0, 0.3)))));

      set(x, y, c);
    }
  }
  updatePixels();
}

function advancedGradientSquare(x_min, y_min, w, h, power = 0, minAlpha = 40) {
  x_max = x_min + w;
  y_max = y_min + h;
  iterations = 450000;
  for (a = 0; a < iterations; a++) {
    x = random(x_min, x_max);
    y = random(y_min, y_max);
    _alpha = pow(y / y_max, power);
    // _alpha = minAlpha + pow(x / x_max, power);

    alpha_v = map(_alpha, 0, pow(1, power), 80, 150);
    noStroke();
    c = color(palette.main);
    c.setAlpha(alpha_v);
    // blendMode(SCREEN);
    fill(c);
    circle(x, y, 0.3 + 1 / sqrt(4 * a));
  }
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
}
function keyPressed() {
  console.log(key);
  switch (key) {
    // pressing the 's' key

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

function hashCode(str) {
  return str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      5
    );
}
