const p5 = require('p5');
const Mira = require('./lib/mira');

const width = window.innerWidth;
const height = window.innerHeight;


const initializer = (sketch) => {
	const mira = new Mira(60);
	let div;

	let xoff = 0.0;
	let yoff = 0.0;
	
  sketch.setup = () => {
		div =	sketch.createDiv();
    sketch.createCanvas(width, height);
		sketch.background('black');
		sketch.blendMode(sketch.SCREEN);
		sketch.fill('#ffcc00');
  }
	
  sketch.draw = () => {
		const { x, y } = mira.nextIteration();
		
		xoff += 0.03;
		yoff += 0.03;

		let xNoiseVal = sketch.noise(xoff);
		let yNoiseVal = sketch.noise(yoff);
		
		sketch.translate(width/2, height/2);
		sketch.ellipse(x * xNoiseVal, y * yNoiseVal, 4, 4);

		if (mira.maxIterationReached() ) {
			sketch.noLoop();
		}

		div.elt.innerText = `${mira.iteration} of ${mira.maxIteration}  -    ${mira.a} \t b: ${mira.b}`;
  }
}

const P5 = new p5(initializer);


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

