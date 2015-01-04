/* global document, requestAnimationFrame */

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

var textFont = { font: "10px Arial", fill: "white"};

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

function draw(){
  conditionsText.setText(util.format(
    "max iteration:%s iteration: %s\na: %s\nb: %s\nx: %s\ny: %s", mira.maxIteration, mira.iteration, mira.a, mira.b, mira.x, mira.y
  ), textFont);

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
var controllers = [];

controllers.push(gui.add(mira, 'a'));
controllers.push(gui.add(mira, 'b'));
controllers.push(gui.add(mira, 'x'));
controllers.push(gui.add(mira, 'y'));
controllers.push(gui.add(mira, 'maxIteration'));

var restartCtrl = gui.add(mira, 'restart')


restartCtrl.onFinishChange(function(){
  graphics.clear();
  var cl = Color("#FFCC00");
  graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));

  mira.reset();
  setTimeout(function(){
    mira.restart = false;
    restartCtrl.updateDisplay();
    draw();
  }, 100);
});

draw();
