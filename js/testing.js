function saveGiff(_fileName, _nDelay, _nFrames, callback) {
  const makeFrame = p5.prototype._makeFrame;
  const cnv = this._curElement.elt;

  let ext = 'png';
  var fileName = _fileName || 'mySketch';

  var fps = 30;
  var nFrames = _nFrames || 30;

  var frameBuffer = [];

  var nDelay = _nDelay || 0;
  var count = nDelay;

  print(fileName, nFrames, nDelay);

  var frameRate = this._frameRate || this._targetFrameRate || 60;
  this.frameCount = nDelay;
  noLoop();

  while (count < nFrames) {
    /* we draw the next frame. this is important, since 
    busy sketches or low end devices might take longer
    to render the frame. So we just wait for the frame
    to be drawn and immediately save it to a buffer and continue
    */
    redraw();
    frameBuffer.push(makeFrame(fileName + count, ext, cnv));
    count++;
    console.log(frameCount);
    console.log('Processing frame ' + count);
  }

  //   if (callback) {
  //     callback(frameBuffer);
  //   } else {
  //     for (const f of frameBuffer) {
  //       print(f.imageData, f.filename, f.ext);
  //       //   p5.prototype.downloadFile(f.imageData, f.filename, f.ext);
  //     }
  //   }

  const extension = 'gif';
  const blob = new Blob([frameBuffer], {
    type: 'image/gif',
  });
  p5.prototype.downloadFile(blob, fileName, extension);

  print('No loop');
  noLoop();
}

function setup() {
  // put setup code here
  createCanvas(600, 600);
}

function draw() {
  // put drawing code here
  background(20);
  //   print(frameRate());

  circle(
    100 * sin(frameCount / 10) + width / 2,
    100 * sin(frameCount / 10) + height / 2,
    10
  );
}

function mousePressed() {
  saveGiff('mySketch', 4, 10);
}
