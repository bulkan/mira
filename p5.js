const p5 = require('p5');
const Mira = require('./lib/mira');
const palettes = require('nice-color-palettes');

const width = window.innerWidth;
const height = window.innerHeight;

const initializer = (sketch) => {
	const mira = new Mira(45);
	const palette = palettes[randomInt(0, palettes.length - 1)];

	let colorIndex = 0;
	let xoff = 0.0;
	let yoff = 0.0;


  sketch.setup = () => {
    sketch.createCanvas(width, height);
		sketch.background('black');
		// sketch.blendMode(sketch.DIFFERENCE);

		sketch.colorMode(sketch.HSB, 255);
		sketch.textSize(10);
  }
	
  sketch.draw = () => {
		const { x, y } = mira.nextIteration();

		sketch.noStroke();
		sketch.fill('black');
		sketch.rect(10, 30, 100, 100);

		sketch.fill('white');
		sketch.text( `${mira.iteration} of ${mira.maxIteration}`, 10, 30, 100, 100);
		
		xoff += 0.01;
		yoff += 0.1;

		let xNoiseVal = sketch.noise(xoff);
		let yNoiseVal = sketch.noise(yoff);
		
		sketch.translate(width/2, height/2);
		sketch.stroke(palette[colorIndex]);
		// sketch.fill(palette[colorIndex]);

		sketch.strokeWeight(xNoiseVal * 10);
		sketch.alpha(10 * yNoiseVal);
		sketch.point(x, y, 2);

		if (mira.maxIterationReached() ) {
			sketch.noLoop();
		}

		colorIndex = ( colorIndex + palette.length - 1 ) % palette.length;
	}
	
	sketch.windowResized = () => {
		// const { windowWidth, windowHeight } = sketch;
		// sketch.resizeCanvas(windowWidth, windowHeight);
	}
}

const P5 = new p5(initializer);


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

