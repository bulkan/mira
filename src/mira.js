function Mira(scale = 10) {
  this.a = 0.16;
  this.b = 0.9998;
  this.x = 0;
  this.y = 9;

  this.iteration = 0;
  this.maxIteration = 1000;
  this.scale = scale;
}


Mira.prototype.maxIterationReached = function maxIterationReached() {
  return this.iteration >= this.maxIteration + 1;
};

const fx = function(a, x) {
  const x2 = x * x;
  const top = 2 * (1 - a) * x2;
  const bottom = 1 + x2;
  return ( a * x ) + ( top / bottom );
}

Mira.prototype.nextIteration = function nextIteration() {
  this.iteration++;

  const prevX = this.x;

  this.x = this.b * this.y + fx(this.a, prevX);
this.y = -prevX + fx(this.a, this.x);

  return {
    x: this.x * this.scale,
    y: this.y * this.scale
  };
};

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

module.exports = { Mira, mira };