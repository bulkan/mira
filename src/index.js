const p5 = require("p5");
const palettes = require("nice-color-palettes/1000");
const { mira } = require("./mira");
const { makeGui } = require('./gui');

const sketch = p => {
  const paletteIndex = randomInt(0, palettes.length - 1);
  // const palette = palettes[7];
  // const paletteIndex = 96;
  const palette = Object.assign({}, palettes[paletteIndex]);
  const paletteLength = Object.values(palette).length;

  p.print(`Current palette ${paletteIndex} of 1000`, Object.values(palette));

  const miraConfig = {
    a: -0.41,
    b: 1,
    x: 12.0,
    y: 0.0,
    maxIteration: 10000,
    scale: 25
  };

  const pointConfig = {
    min: 1,
    max: 5
  };
  
  const guiConfig = {
    mira: miraConfig,
    point: pointConfig,
    palette
  };

  let miraGenerator = mira(miraConfig);
  let colorIndex = 0;
  let xoff = 0.0;
  let yoff = 0.0;

  const reset = () => {
    p.background("black");
    p.loop();
    miraGenerator = mira(miraConfig);
  }

  p.setup = () => {
    const gui = makeGui(guiConfig);

    Object.keys(gui.__folders).forEach(folder => {
       gui.__folders[folder].__controllers.forEach(ctrl => {
        ctrl.onChange(() => reset());
      });
    });

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background("black");

    p.colorMode(p.HSB, 255);
    p.textSize(10);

    const saveButton = p.createButton("save");
    saveButton.position(10, 10);
    saveButton.mousePressed(() => {
      const { a, b, x, y, scale } = miraConfig;
      p.pop();
      p.noStroke();
      p.fill("white");
      p.text(`a=${a}, b=${b}`, 10, 50, 100, 100);
      p.text(`x=${x}, y=${y}, scale=${scale}`, 10, 60, 100, 100);
      p.saveCanvas(`${a}-${b}`, "png")
    });

    const runBtn = p.createButton("run");
    runBtn.position(10 + saveButton.width, 10);
    runBtn.mousePressed(() => reset());
  };

  p.draw = () => {
    const mira = miraGenerator.next().value;

    if (!mira) {
      p.noLoop();
      return;
    }

    p.push();
    const { current, point: {x, y }} = mira;

    colorIndex = (colorIndex + paletteLength - 1) % paletteLength;

    p.noStroke();
    const black = p.color("black");
    black.setAlpha(255);
    p.fill("black");
    p.rect(10, 30, 100, 100);

    p.fill("white");
    p.text(`${current} of ${miraConfig.maxIteration}`, 10, 30, 100, 100);

    xoff += 0.001;
    yoff += 0.1;

    let xNoiseVal = p.noise(xoff);
    let yNoiseVal = p.noise(yoff);

    const color = p.color((Object.values(palette)[colorIndex]));
    color.setAlpha(p.map(yNoiseVal, 0, 1, 0, 255));

    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    p.stroke(color);

    p.strokeWeight(p.map(xNoiseVal, 0, 1, pointConfig.min, pointConfig.max));
    p.point(x, y);

    // p.beginShape(p.LINES);
    // p.strokeWeight(0.5);
    // color.setAlpha(50);
    // p.stroke(color);
    // p.vertex(x, y);
    // p.vertex(x + 10, y + 10);

    // p.endShape();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background("black");
  }
};

const P5 = new p5(sketch);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
