const DAT = require("dat.gui");

const makeGui = (config) => {
  const gui = new DAT.GUI();

  const miraFolder = gui.addFolder("Mira function params");
  miraFolder.open();
  miraFolder.add(config.mira, "a", -10, 10, 0.00001);
  miraFolder.add(config.mira, "b", -10, 10, 0.00001);
  miraFolder.add(config.mira, "x", -35.56, 35.56, 0.01);
  miraFolder.add(config.mira, "y", -20, 20, 0.01);
  miraFolder.add(config.mira, "scale", -100, 100, 1);
  
  miraFolder.add(config.mira, "maxIteration");

  const pixels = gui.addFolder("Point size");
  pixels.add(config.point, "min", 0, 10);
  pixels.add(config.point, "max", 0, 10);
  
  
  const colorFolder = gui.addFolder("Palette");
  colorFolder.addColor(config.palette, 0);
  colorFolder.addColor(config.palette, 1);
  colorFolder.addColor(config.palette, 2);
  colorFolder.addColor(config.palette, 3);
  colorFolder.open();
  
  return gui;
}



module.exports = { makeGui };
