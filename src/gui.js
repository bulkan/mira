const DAT = require("dat.gui");

const presetJSON = {
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

const makeGui = (miraConfig, palette) => {
  const gui = new DAT.GUI({ load: presetJSON });

  const miraFolder = gui.addFolder("Mira");
  miraFolder.open();
  miraFolder.add(miraConfig, "a", -10, 10, 0.00001);
  miraFolder.add(miraConfig, "b", -10, 10, 0.00001);
  miraFolder.add(miraConfig, "x", -20, 20, 0.1);
  miraFolder.add(miraConfig, "y", -20, 20, 0.1);
  miraFolder.add(miraConfig, "scale", -100, 100, 1);
  
  miraFolder.add(miraConfig, "maxIteration");

  gui.remember(miraConfig);

  const colorFolder = gui.addFolder("Palette");
  colorFolder.addColor(palette, 0);
  colorFolder.addColor(palette, 1);
  colorFolder.addColor(palette, 2);
  colorFolder.addColor(palette, 3);
  colorFolder.addColor(palette, 4);

  // gui.remember(palette);
  return gui;
}



module.exports = { makeGui };
