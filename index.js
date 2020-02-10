/* global document, requestAnimationFrame */
/* jshint newcap: false*/

const PIXI = require('pixi.js');
const Color = require('color');
const DAT = require('dat-gui');
const Mira = require('./lib/mira');

const width = window.innerWidth;
const height = window.innerHeight;

const app = new PIXI.Application({ width, height });
// app.ticker.add(draw);

document.body.appendChild(app.view);

const stage = app.stage;
const graphics = new PIXI.Graphics();

const textFont = { 
  font: "12px Arial",
  fill: "white"
};

var mira = new Mira(width, height);
var conditionsText = new PIXI.Text("a: " + mira.a + " b: " + mira.b, textFont);

conditionsText.position.x = 20;
conditionsText.position.y = 30;

stage.addChild(conditionsText);

let cl = Color("#FFCC00");
graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
// graphics.blendMode = PIXI.BLEND_MODES.LIGHTEN;

stage.addChild(graphics);

const midX =  width / 2;
const midY = height / 2;

// var midPoint = {
//   x: midX,
//   y: midY
// };

// function lineDistance(point1, point2) {
//   const xs = 0;
//   const ys = 0;

//   xs = point2.x - point1.x;
//   xs = xs * xs;

//   ys = point2.y - point1.y;
//   ys = ys * ys;

//   return xs + ys;
// }

// let maxDistanceToCenter = lineDistance({x: 0, y: 0}, midPoint);
let stop = false;

// additional options that is not really part of Mira
// used with dat.gui
mira.circle = true;
//mira.rectangle = false;
mira.pixelSize = 3;

function draw() {
  if (stop){
    return;
  }

  conditionsText.text = `${mira.iteration} of ${mira.maxIteration}\n\na: ${mira.a} \t b: ${mira.b}`;

  const point = mira.nextIteration();

  // const ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);


  graphics.drawRect(point.x, point.y, mira.pixelSize, mira.pixelSize);
  

  // if(mira.iteration % 500 === 0) {
    // cl = cl.saturate(ratio * 1).mix(Color('green'), 0.1);
    // graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
  // }

  if (mira.maxIterationReached()) {
    return;
  }

  // return requestAnimationFrame(draw);
}

const gui = new DAT.GUI();

const miraFolder = gui.addFolder('Mira');

miraFolder.add(mira, 'a');
miraFolder.add(mira, 'b');

miraFolder.open();

const xCtrl = miraFolder.add(mira, 'x');
const yCtrl = miraFolder.add(mira, 'y');

miraFolder.add(mira, 'maxIteration');

const pixiController = gui.addFolder('Rendering');

pixiController.add(mira, 'pixelSize');

Object.keys(gui.__folders).forEach(function(folder){
  gui.__folders[folder].__controllers.forEach(function(ctrl){
    ctrl.onChange(function(){
      stop = true;
    });
  });
});

const y = mira.y;
const x = mira.x;

// need to manually force an update for x & y
yCtrl.onFinishChange(function(){
  y = yCtrl.initialValue;
  x = this.getValue();
  mira.setXY(x, y);
  this.updateDisplay();
});

yCtrl.onFinishChange(function(){
  y = this.getValue();
  x = xCtrl.initialValue;
  mira.setXY(x, y);
  this.updateDisplay();
});


document.addEventListener("DOMContentLoaded", function() { 
  // draw();

  document.querySelector('#reset-btn').onclick = function() {
    graphics.clear();
    const cl = Color("#FFCC00");
    graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
    stop = true;

    // app.reset();

    mira.setXY(x, y);
    mira.reset();
    // setTimeout(function() {

    //   mira.rerun = false;
    //   stop = false;
    //   // draw();
    // });
  };
});