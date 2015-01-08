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
var stop = false;

mira.circle = true;
mira.rectangle = false;

function draw(){
  if (stop){
    return;
  }

  conditionsText.setText(util.format("%s of %s\n\na: %s \t b: %s", mira.iteration, mira.maxIteration, mira.a, mira.b), textFont);

  var point = mira.nextIteration();

  var ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);

  if (mira.circle) {
    graphics.drawCircle(point.x, point.y, 2);
  }
  else if (mira.rectangle){
    graphics.drawRect(point.x, point.y, 13, 13);
  }

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

var miraFolder = gui.addFolder('Mira');

miraFolder.add(mira, 'a');
miraFolder.add(mira, 'b');

miraFolder.open();

var xCtrl = miraFolder.add(mira, 'x');
var yCtrl = miraFolder.add(mira, 'y');

miraFolder.add(mira, 'maxIteration');

var pixiController = gui.addFolder('Rendering');

var circleCtrl = pixiController.add(mira, 'circle');
var rectCtrl = pixiController.add(mira, 'rectangle');

// one or the order rendering option needs to be selected
circleCtrl.onFinishChange(function(){
  rectCtrl.setValue(!this.getValue());
});

rectCtrl.onFinishChange(function(){
  circleCtrl.setValue(!this.getValue());
});

 
gui.__controllers.forEach(function(ctrl){
  ctrl.onChange(function(){
    stop = true;
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

var restartCtrl = gui.add(mira, 'restart')

restartCtrl.onChange(function(){
  graphics.clear();
  var cl = Color("#FFCC00");
  graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
  stop = true;

  mira.setXY(x, y);
  mira.reset();
  setTimeout(function(){

    mira.restart = false;
    restartCtrl.updateDisplay();
    stop = false;
    draw();
  });
});

draw();
