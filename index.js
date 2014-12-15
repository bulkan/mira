/* global document, requestAnimationFrame */

var PIXI = require('pixi.js');
var Color = require('color');

var width = window.innerWidth ;
var height = window.innerHeight;

//var renderer = new PIXI.autoDetectRenderer(width, height);
var renderer = new PIXI.CanvasRenderer(width, height);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage();
var graphics = new PIXI.Graphics();

var b = 0.9998;
var a = 0.16;
var c = 2 - 2 * a;
var x = 0;
var j = 0;
var y =  6;
var gen = 0;

var scale = 20;

var textFont = { font: "10px Arial", fill: "white"};

var conditionsText = new PIXI.Text("a: " + a + " b: " + b, textFont);
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


function draw(){
  gen++;

  debugText.setText("iteration: " + gen);

  var z = x;
  x = b * y + j;

  j = a * x + c * Math.pow(x, 2) / (1+ Math.pow(x, 2));
  y = j - z;

  var xp = (x * scale) + width / 2;
  var yp= (y * scale) + height / 2;

  var ratio = (lineDistance({x: xp, y: yp}, midPoint) / maxDistanceToCenter);

  circle = graphics.drawCircle(xp, yp, 2);

  if(gen % 500 === 0){
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


requestAnimationFrame(draw);
