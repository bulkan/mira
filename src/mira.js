const fx = function(a, x) {
  const x2 = x * x;
  const top = 2 * (1 - a) * x2;
  const bottom = 1 + x2;
  return ( a * x ) + ( top / bottom );
}

function* mira(params) {
  const { 
    a = 0.16,
    b = 0.9998,
    x = 0.0,
    y = 0.0,
    maxIteration = 10000,
    scale = 10
  } = params;

  let xn = x;
  let yn = y;

  for (let i = 0; i < maxIteration; i++) {
    const prevX = xn;

    xn = b * yn + fx(a, prevX);
    yn = -prevX + fx(a, xn);

    yield {
      current: i,
      point: {
        x: xn * scale,
        y: yn * scale 
      }
    };
  }

}

module.exports = { mira };