const DAT = require("dat.gui");

const presets = {
  preset: 'Default',
  remembered: {
    Defaut: {},
    Preset1: {
      "0": { a: 0.31, b: 1.0, x: 12.0, y: 0.0, maxIteration: 10000 },
      "1": {
        "0": "#d1313d",
        "1": "#e5625c",
        "2": "#f9bf76",
        "3": "#8eb2c5",
        "4": "#615375"
      }
    },
    Preset2: {
      "0": { a: 0.4, b: 1.0, x: 12.0, y: 0.0, maxIteration: 10000 },
      "1": {
        "0": "#d1313d",
        "1": "#e5625c",
        "2": "#f9bf76",
        "3": "#8eb2c5",
        "4": "#615375"
      }
    },
    Preset3: {
      "0": { a: 0.7, b: 0.9998, x: 9.0, y: 0.0, maxIteration: 10000 },
      "1": {
        "0": "#d1313d",
        "1": "#e5625c",
        "2": "#f9bf76",
        "3": "#8eb2c5",
        "4": "#615375"
      }
    },
    Preset4: {
      "0": { a: 0.7, b: 0.9998, x: 12.1, y: 0.0, maxIteration: 10000 },
      "1": {
        "0": "#d1313d",
        "1": "#e5625c",
        "2": "#f9bf76",
        "3": "#8eb2c5",
        "4": "#615375"
      }
    },
    Preset5: {
      "0": { a: 0.7, b: 0.9998, x: 15.0, y: 0.0, maxIteration: 10000 },
      "1": {
        "0": "#d1313d",
        "1": "#e5625c",
        "2": "#f9bf76",
        "3": "#8eb2c5",
        "4": "#615375"
      }
    },
  }
};

const makeGui = (config) => {
  const gui = new DAT.GUI({ load: presets });
  gui.useLocalStorage = true;

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
  colorFolder.addColor(config.palette, 4);
  colorFolder.open();
  
  gui.remember(config);
  return gui;
}



module.exports = { makeGui };
