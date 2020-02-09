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


	let vertexCount = 0;
	const MAX_VERTEX = 3;
	
  sketch.setup = () => {
		div =	sketch.createDiv();
    sketch.createCanvas(width, height);
		sketch.background('black');
		// sketch.blendMode(sketch.DIFFERENCE);

		// sketch.noStroke();
		sketch.colorMode(sketch.HSB, 255);

  }
	
  sketch.draw = () => {
		const { x, y } = mira.nextIteration();

		// if (vertexCount === 0) {
		// 	sketch.noFill();
		// 	sketch.beginShape(sketch.LINES);
		// }
		
		// xoff += 0.1;
		// yoff += 0.1;

		// let xNoiseVal = sketch.noise(xoff);
		// let yNoiseVal = sketch.noise(yoff);
		
		sketch.translate(width/2, height/2);
		sketch.stroke(palette[currentColor]);
		sketch.fill(palette[currentColor]);

		// console.log(`vertextCount`, vertexCount);

		// if (vertexCount <= MAX_VERTEX) {
		// 	sketch.vertex(x , y);
		// } 

		// if (vertexCount > MAX_VERTEX) {
		// 	console.log('endShape');
		// 	vertexCount = 0;
		// 	sketch.endShape();
		// }

		sketch.point(x , y , 2, 2);
		vertexCount = vertexCount + 1;

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

