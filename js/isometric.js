let spacing = 40;
let offset = 100;

class Grid {
  constructor(w = windowWidth, h = windowHeight, spacing = 20, offset = 100) {
    this.w = w;
    this.h = h;
    this.spacing = spacing;
    this.offset = offset;
    this.grid = [];
    for (let x = this.offset; x < this.w - this.offset; x += this.spacing) {
      let row = [];
      for (let y = this.offset; y < this.h - this.offset; y += this.spacing) {
        row.push(1);
      }
      this.grid.push(row);
    }
  }

  display() {
    stroke(250);
    strokeWeight(6);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] && (i + this.grid.length * j) % 2 != 0) {
          point(i * this.spacing + this.offset, j * this.spacing + this.offset);
        }
      }
    }
  }
}

function setup() {
  w = min(windowWidth, windowHeight);
  wx = w;
  wy = w;
  createCanvas(wx, wy);

  g = new Grid(w, w, spacing, offset);
}

function draw() {
  background(24);
  g.display();
  noLoop();
}
