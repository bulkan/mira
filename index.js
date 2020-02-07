/* global document, requestAnimationFrame */
/* jshint newcap: false*/

var PIXI = require('pixi.js');
var Color = require('color');
var DAT = require('dat-gui');
var util = require('util');
var Mira = require('./lib/mira');

var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new PIXI.autoDetectRenderer(width, height);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage();
var graphics = new PIXI.Graphics();

var textFont = { 
  font: "12px Arial",
  fill: "white"
};

var mira = new Mira(width, height);
var conditionsText = new PIXI.Text("a: " + mira.a + " b: " + mira.b, textFont);

conditionsText.position.x = 20;
conditionsText.position.y = 30;

stage.addChild(conditionsText);

var cl = Color("#FFCC00");
graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
graphics.blendMode = PIXI.blendModes.LIGHTEN;

stage.addChild(graphics);

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

function draw(){
  if (stop){
    return;
  }

  conditionsText.setText(util.format("%s of %s\n\na: %s \t b: %s", mira.iteration, mira.maxIteration, mira.a, mira.b), textFont);

  var point = mira.nextIteration();

  var ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);

  graphics.drawRect(point.x, point.y, mira.pixelSize, mira.pixelSize);
  

  if(mira.iteration % 500 === 0){
    cl = cl.saturate(ratio * 1).mix(Color('green'), 0.1);
    graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
  }

  renderer.render(stage);

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
    graphics.beginFill(parseInt(cl.hex().replace(/^#/,''), 16));
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
