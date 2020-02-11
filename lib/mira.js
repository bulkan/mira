function Mira(scale = 10) {
  this.a = 0.16;
  this.b = 0.9998;
  this.x = 0;
  this.y =  9;
  this.iteration = 0;
  this.maxIteration = 1000;
  this.scale = scale;
}

Mira.prototype.reset = function reset() {
  this.iteration = 0;
};

Mira.prototype.setXY = function setXY(x, y){
  this.x = x;
  this.y = y;
}

Mira.prototype.maxIterationReached = function maxIterationReached() {
  return this.iteration >= this.maxIteration + 1;
}

const fx = (a, x) => {
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
    x: (this.x * this.scale),
    y: (this.y * this.scale) 
  };

}

module.exports = Mira;
