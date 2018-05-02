/* global document, requestAnimationFrame */
/* jshint newcap: false*/

import * as PIXI from 'pixi.js'
import Color from 'color';
import DAT from 'dat-gui';

import Mira from './lib/mira';

const width = window.innerWidth;
const height = window.innerHeight;

const app = new PIXI.Application(width, height);
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

const textFont = { 
  fontSize: "12px",
  fontFamily: "Arial",
  fill: "white"
};

const mira = new Mira(width, height);
const conditionsText = new PIXI.Text("a: " + mira.a + " b: " + mira.b, textFont);

conditionsText.position.x = 20;
conditionsText.position.y = 30;

app.stage.addChild(conditionsText);

var cl = Color("#FFCC00");
graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
graphics.blendMode = PIXI.BLEND_MODES.LIGHTEN;

app.stage.addChild(graphics);

var midX =  width / 2;
var midY = height / 2;

var midPoint = {
  x: midX,
  y: midY
};

function lineDistance(point1, point2){
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return xs + ys;
}

var maxDistanceToCenter = lineDistance({x: 0, y: 0}, midPoint);
var stop = false;

// additional options that is not really part of Mira
// used with dat.gui
mira.circle = true;
//mira.rectangle = false;
mira.pixelSize = 3;

function draw() {
  if (stop) {
    return;
  }

  conditionsText.text = `${mira.iteration} of ${mira.maxIteration}\n\na: ${mira.a} \t b: ${mira.b}`;;

  var point = mira.nextIteration();

  var ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);

  graphics.drawRect(point.x, point.y, mira.pixelSize, mira.pixelSize);
  

  if (mira.iteration % 500 === 0){
    cl = cl.saturate(ratio * 1).mix(Color('green'), 0.1);
    graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
  }

  app.render(app.stage);

  if (mira.maxIterationReached()){
    return;
  }

  return requestAnimationFrame(draw);
}

var gui = new DAT.GUI();

var miraFolder = gui.addFolder('Mira');

miraFolder.add(mira, 'a');
miraFolder.add(mira, 'b');

miraFolder.open();

var xCtrl = miraFolder.add(mira, 'x');
var yCtrl = miraFolder.add(mira, 'y');

miraFolder.add(mira, 'maxIteration');

var pixiController = gui.addFolder('Rendering');

pixiController.add(mira, 'pixelSize');

Object.keys(gui.__folders).forEach(function(folder){
  gui.__folders[folder].__controllers.forEach(function(ctrl){
    ctrl.onChange(function(){
      stop = true;
    });
  });
});

var y = mira.y;
var x = mira.x;

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
  document.querySelector('#reset-btn').onclick = function(){
    graphics.clear();
    var cl = Color("#FFCC00");
    graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
    stop = true;

    mira.setXY(x, y);
    mira.reset();
    setTimeout(function(){

      mira.rerun = false;
      stop = false;
      draw();
    });
  };
});


draw();
