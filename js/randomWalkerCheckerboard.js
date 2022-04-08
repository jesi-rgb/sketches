function setup() {
  //   frameRate(4);

  w = min(windowWidth, windowHeight);
  wx = w;
  wy = w;
  createCanvas(wx, wy);

  let spacing = 100;

  let hexSide = 40;

  let displaySpacingY = spacing;
  let displaySpacingX = spacing * Math.cos(30);
  let offset = 100;
  let MAX_WALKERS = 1;

  g = new makeGrid(wx, wy, spacing, displaySpacingX, displaySpacingY, offset);
  g.initGrid();

  walkers = [];

  colorMode(HSB);

  for (let n = 0; n < MAX_WALKERS; n++) {
    let randomX = int(random(0, g.grid.length));
    let randomY = int(random(0, g.grid[0].length));
    walkers.push(
      new randomWalker(
        randomX,
        randomY,
        spacing,
        displaySpacingX,
        displaySpacingY,
        offset,
        color(random(0, 360), 60, 100)
      )
    );
  }

  gm = new gridManager(g, walkers);

  background(24);
}

function draw() {
  background(24, 5);
  g.display();

  gm.display();
  gm.updateGrid();

  //save(`frame_${frameCount}.png`); // <--
}

// class definition

function randomWalker(
  x,
  y,
  spacing,
  displaySpacingX,
  displaySpacingY,
  offset,
  colour
) {
  this.currX = x;
  this.currY = y;
  this.colour = colour;

  this.spacing = spacing;
  this.displaySpacingX = displaySpacingX;
  this.displaySpacingY = displaySpacingY;
  console.log(this.displaySpacingY, this.spacing);
  this.offset = offset;

  this.path = []; // this will help remember the path
  this.drawPath = [];

  this.advance = function (grid) {
    // add current position to the path array

    // move and update position
    opts = this.getOptions(grid);
    choice = random(opts);

    if (choice) {
      this.path.push({ dx: this.currX, dy: this.currY });
      this.drawPath.push({ dx: this.currX, dy: this.currY });

      this.currX = choice.dx;
      this.currY = choice.dy;

      return { dx: this.currX, dy: this.currY };
    } else {
      backtracked = this.path.pop();

      if (backtracked) {
        this.currX = backtracked.dx;
        this.currY = backtracked.dy;
      }
    }
  };

  this.getOptions = function (grid) {
    options = [];

    if (this.currX + 1 < grid.length - 1) {
      if (grid[this.currX + 1][this.currY])
        options.push({ dx: this.currX + 1, dy: this.currY });
    }

    if (this.currX - 1 > 0) {
      if (grid[this.currX - 1][this.currY])
        options.push({ dx: this.currX - 1, dy: this.currY });
    }

    // +x +y
    if (this.currX + 1 < grid.length - 1 && this.currY + 1 < grid[0].length) {
      if (grid[this.currX + 1][this.currY + 1])
        options.push({ dx: this.currX + 1, dy: this.currY + 1 });
    }

    // -x -y
    if (this.currX - 1 > 0 && this.currY - 1 > 0) {
      if (grid[this.currX - 1][this.currY - 1])
        options.push({ dx: this.currX - 1, dy: this.currY - 1 });
    }

    // +x -y
    if (this.currX + 1 < grid.length && this.currY - 1 > 0) {
      if (grid[this.currX + 1][this.currY - 1])
        options.push({ dx: this.currX + 1, dy: this.currY - 1 });
    }

    // -x +y
    if (this.currX - 1 > 0 && this.currY + 1 < grid[0].length) {
      if (grid[this.currX - 1][this.currY + 1])
        options.push({ dx: this.currX - 1, dy: this.currY + 1 });
    }

    return options;
  };

  this.display = function () {
    for (let n = 0; n < this.drawPath.length - 1; n++) {
      stroke(this.colour);
      strokeWeight(3);
      //   if (
      //     dist(
      //       this.drawPath[n].dx * this.spacing + this.offset,
      //       this.drawPath[n].dy * this.spacing + this.offset,
      //       this.drawPath[n + 1].dx * this.spacing + this.offset,
      //       this.drawPath[n + 1].dy * this.spacing + this.offset
      //     ) < 40
      //   ) {
      line(
        this.drawPath[n].dx * this.displaySpacingX + this.offset,
        this.drawPath[n].dy * this.displaySpacingY + this.offset,
        this.drawPath[n + 1].dx * this.displaySpacingX + this.offset,
        this.drawPath[n + 1].dy * this.displaySpacingY + this.offset
      );
      //   }
    }
  };
}

function makeGrid(w, h, spacing, displaySpacingX, displaySpacingY, offset) {
  this.w = w;
  this.h = h;
  this.spacing = spacing;
  this.displaySpacingX = displaySpacingX;
  this.displaySpacingY = displaySpacingY;
  this.offset = offset;
  this.grid = [];

  this.initGrid = function () {
    for (
      let x = this.offset;
      x < this.w - this.offset;
      x += this.displaySpacingX
    ) {
      row = [];
      for (
        let y = this.offset;
        y < this.h - this.offset;
        y += this.displaySpacingY
      ) {
        row.push(1);
      }
      this.grid.push(row);
    }
  };

  this.display = function () {
    colorMode(RGB);
    strokeWeight(5);
    stroke(250, 90);
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        // if (this.grid[i][j]) {

        strokeWeight(1);
        point(
          i * this.displaySpacingX + this.offset,
          j * this.displaySpacingY + this.offset
        );
        // }
      }
    }
  };
}

//grid manager
function gridManager(grid, walkers) {
  this.grid = grid;
  this.walkers = [...walkers];

  for (let n = 0; n < this.walkers.length; n++) {
    this.grid.grid[walkers[n].currX][walkers[n].currY] = 0;
  }

  this.updateGrid = function () {
    for (let n = 0; n < this.walkers.length; n++) {
      toCheck = this.walkers[n].advance(this.grid.grid);
      if (toCheck) {
        this.grid.grid[toCheck.dx][toCheck.dy] = 0;
      }
    }
  };

  this.display = function () {
    for (let n = 0; n < walkers.length; n++) {
      walkers[n].display();
    }
  };
}
