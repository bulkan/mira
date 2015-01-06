/* global document, requestAnimationFrame */
/* jshint newcap: false*/

var PIXI = require('pixi.js');
var Color = require('color');
var DAT = require('dat-gui');
var util = require('util');
var Mira = require('./lib/mira');

var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new PIXI.CanvasRenderer(width, height);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage();
var graphics = new PIXI.Graphics();

var textFont = { font: "12px Arial", fill: "white"};

var mira = new Mira(width, height);
var conditionsText = new PIXI.Text("a: " + mira.a + " b: " + mira.b, textFont);

conditionsText.position.x = 20;
conditionsText.position.y = 30;

stage.addChild(conditionsText);

var cl = Color("#FFCC00");
graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
graphics.blendMode = PIXI.blendModes.ADD;

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
var circle;
var stop = false;

function draw(){
  if (stop){
    return;
  }

  conditionsText.setText(util.format("%s of %s\n\na: %s \t b: %s", mira.iteration, mira.maxIteration, mira.a, mira.b), textFont);

  var point = mira.nextIteration();

  var ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);

  circle = graphics.drawCircle(point.x, point.y, 2);

  if(mira.iteration % 500 === 0){
    cl = cl.saturate(ratio * 1).mix(Color('green'), 0.1);
    graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
  }

  renderer.render(stage);

  if (mira.maxIterationReached()){
    return;
  }

  requestAnimationFrame(draw);
}

var gui = new DAT.GUI();

gui.add(mira, 'a');
gui.add(mira, 'b');

var xCtrl = gui.add(mira, 'x');
var yCtrl = gui.add(mira, 'y');

gui.add(mira, 'maxIteration');

gui.__controllers.forEach(function(ctrl){
  ctrl.onChange(function(){
    stop = true;
  });
});

var y = mira.y;
var x = mira.x;


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


var restartCtrl = gui.add(mira, 'restart')

restartCtrl.onChange(function(){
  graphics.clear();
  var cl = Color("#FFCC00");
  graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
  stop = true;

  mira.reset();

  mira.x = x;
  mira.y = y;
  setTimeout(function(){

    mira.restart = false;
    restartCtrl.updateDisplay();
    stop = false;
    draw();
  });
});

draw();
