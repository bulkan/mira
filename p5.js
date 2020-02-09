const p5 = require('p5');
const Mira = require('./lib/mira');
const palettes = require('nice-color-palettes');

const width = window.innerWidth;
const height = window.innerHeight;

const initializer = (sketch) => {
	const mira = new Mira(45);
	const palette = palettes[randomInt(0, palettes.length - 1)];

	let currentColor = 0;

	let div;

	let xoff = 0.0;
	let yoff = 0.0;

	
  sketch.setup = () => {
		div =	sketch.createDiv();
    sketch.createCanvas(width, height);
		sketch.background('black');
		sketch.blendMode(sketch.DIFFERENCE);

		sketch.noStroke();
		sketch.colorMode(sketch.HSB, 255);

  }
	
  sketch.draw = () => {
		const { x, y } = mira.nextIteration();
		
		xoff += 0.1;
		yoff += 0.1;

		// let xNoiseVal = sketch.noise(xoff);
		// let yNoiseVal = sketch.noise(yoff);
		
		sketch.translate(width/2, height/2);
		sketch.fill(palette[currentColor]);
		sketch.ellipse(x , y , 4, 4);

		if (mira.maxIterationReached() ) {
			sketch.noLoop();
		}
		currentColor = ( currentColor + palette.length - 1 ) % palette.length;

		div.elt.innerText = `${mira.iteration} of ${mira.maxIteration}  -    ${mira.a} \t b: ${mira.b}`;
  }
}

const P5 = new p5(initializer);


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

