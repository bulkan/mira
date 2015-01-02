/* global document, requestAnimationFrame */

var PIXI = require('pixi.js');
var Color = require('color');

var DAT = require('dat-gui');

var Mira = require('./lib/mira');

var width = window.innerWidth ;
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

var debugText = new PIXI.Text("", textFont);

debugText.position.x = 20;
debugText.position.y = 20;

stage.addChild(debugText);

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

var maxDistanceToCenter = lineDistance({x: 0, y: 0}, {x: midX, y: midY});

var circle;

var gui = new DAT.GUI();
gui.add(mira, 'b', 0, 1).step(0.0001);

function draw(){
  conditionsText.setText("a: " + mira.a + " b: " + mira.b, textFont);

  debugText.setText("iteration: " + mira.gen);

  var point = mira.nextIteration();

  var ratio = (lineDistance(point, midPoint) / maxDistanceToCenter);

  circle = graphics.drawCircle(point.x, point.y, 2);

  if(mira.gen % 500 === 0){
    cl = cl.saturate(ratio * 1).mix(Color('green'), 0.1);
    graphics.beginFill(parseInt(cl.hexString().replace(/^#/,''), 16));
  }

  renderer.render(stage);
  requestAnimationFrame(draw);
}

function lineDistance(point1, point2){
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return xs + ys;
}


//requestAnimationFrame(draw);
