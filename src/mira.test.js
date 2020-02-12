const { Mira, mira } = require("./mira");

const expectedValues = [
  [ 11.097345132743364, -6.636691228938176 ],
  [ 1.727944880369436, -9.438318358722404 ],
  [ -7.7774039210296975, -6.581885624786672 ],
  [ -11.43450999207895, 0.3686927783932914 ],
  [ -7.040092102798793, 7.094579111393557 ],
  [ 2.7532293148858846, 9.49742476734777 ],
  [ 11.952857946943276, 6.20960083990433 ],
  [ 15.171189074526565 ,-0.7356211436565214 ],
  [ 10.481762783858963, -7.239366998610914 ],
  [ 0.6939029507044578, -9.801025299184978 ]
];

describe("mira", () => {
  const miraGenerator = mira({
    a: 0.7,
    b: 0.9998,
    x: 15,
    y: 0,
    maxIteration: 10,
    scale: 1
  });

  it("shall return correct values", () => {
    for (const { current, point } of miraGenerator) {
      const expectedValue = expectedValues[current];
      expect(Object.values(point)).toEqual(expectedValue);
    }
  });
});
