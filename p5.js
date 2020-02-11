const p5 = require('p5');
const palettes = require('nice-color-palettes/1000');
const Mira = require('./lib/mira');

const width = window.innerWidth;
const height = window.innerHeight;

const sketch = (p) => {
	const mira = new Mira(25);
	mira.maxIteration = 10000;

	window.p = p;
	window.mira = mira;

	mira.a = 0.31;
	mira.b = 1;
	mira.x = 12;
	mira.y = 0;

	// const palette = palettes[randomInt(0, palettes.length - 1)];
	const palette = palettes[7];

	let colorIndex = 0;
	let xoff = 0.0;
	let yoff = 0.0;

  p.setup = () => {
		
		p.createCanvas(width, height);
		p.background('black');
		
		p.colorMode(p.HSB, 255);
		p.textSize(10);

		const saveButton = p.createButton('save');
		saveButton.position(10, 10);
		saveButton.mousePressed(() => p.saveCanvas(`${mira.a}-${mira.b}`, 'png'));

		const runBtn = p.createButton('run');
		runBtn.position(10 + runBtn.width, 10);
		runBtn.mousePressed(() => {
			mira.reset();
			p.background('black');
			sketch.loop();
		});
  }
	
  p.draw = () => {
		const { x, y } = mira.nextIteration();
		if (mira.maxIterationReached() ) {
			p.noLoop();
		}
		colorIndex = ( colorIndex + palette.length - 1 ) % palette.length;

		p.noStroke();
		const black = p.color('black');
		black.setAlpha(255);
		p.fill('black');
		p.rect(10, 30, 100, 100);

		p.fill('white');
		p.text( `${mira.iteration} of ${mira.maxIteration}`, 10, 30, 100, 100);
		
		xoff += 0.01;
		yoff += 0.01;

		let xNoiseVal = p.noise(xoff);
		let yNoiseVal = p.noise(yoff);
		
		const color = p.color(palette[colorIndex]);
		color.setAlpha(p.map(yNoiseVal, 0, 1, 0, 255));

		p.translate(width / 2, height / 2);
		p.stroke(color);

		p.strokeWeight(p.map(xNoiseVal, 0, 1, 1, 10 ));
		// p.strokeWeight(1);
		p.point(x, y);

		// p.beginShape(p.LINES);
		// p.strokeWeight(1);
		// color.setAlpha(50);
		// p.stroke(color);
		// p.vertex(x, y);
		// p.vertex(x + 10, y + 10);

		// p.endShape();
	}
}

const P5 = new p5(sketch);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

