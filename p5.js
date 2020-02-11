const p5 = require('p5');
const palettes = require('nice-color-palettes/1000');
const Mira = require('./lib/mira');

const width = window.innerWidth;
const height = window.innerHeight;

const initializer = (sketch) => {
	const mira = new Mira(25);
	mira.maxIteration = 30000;

	
	mira.a = 0.4;
	mira.b = 1;
	mira.x = 12;
	mira.y = 0;

	// const palette = palettes[randomInt(0, palettes.length - 1)];
	const palette = palettes[7];

	let colorIndex = 0;
	let xoff = 0.0;
	let yoff = 0.0;

  sketch.setup = () => {
		
		sketch.createCanvas(width, height);
		sketch.background('black');
		// sketch.blendMode(sketch.REMOVE);
		
		sketch.colorMode(sketch.HSB, 255);
		sketch.textSize(10);

		button = sketch.createButton('save');
		button.position(10, 10);
		button.mousePressed(() => sketch.saveCanvas(`${mira.a}-${mira.b}-(${mira.x}-${mira.y})`, 'png'));
  }
	
  sketch.draw = () => {
		const { x, y } = mira.nextIteration();

		sketch.noStroke();
		const black = sketch.color('black');
		black.setAlpha(255);
		sketch.fill('black');
		sketch.rect(10, 30, 100, 100);

		sketch.fill('white');
		sketch.text( `${mira.iteration} of ${mira.maxIteration}`, 10, 30, 100, 100);
		
		xoff += 0.1;
		yoff += 0.1;

		let xNoiseVal = sketch.noise(xoff);
		let yNoiseVal = sketch.noise(yoff);
		
		const color = sketch.color(palette[colorIndex]);
		color.setAlpha(255 * yNoiseVal);

		sketch.translate(width / 2, height / 2);
		sketch.stroke(color);

		sketch.strokeWeight(sketch.map(xNoiseVal, 0, 1, 1, 3 ));
		// sketch.point(sketch.noise(x) * x, y);
		sketch.point(x, y);

		if (mira.maxIterationReached() ) {
			sketch.noLoop();
		}

		colorIndex = ( colorIndex + palette.length - 1 ) % palette.length;
	}
}



const P5 = new p5(initializer);


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

