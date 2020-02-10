function Mira(scale = 10) {

  this.b = 0.9998;
  this.a = 0.16;
  this.c = 2 - 2 * this.a;
  this.x = 0;
  this.j = 0;
  this.y =  6;
  this.iteration = 0;
  this.maxIteration = 1000;
  this.scale = scale;
}

Mira.prototype.reset = function reset() {
  this.iteration = 0;
  this.j = 0;
  this.c = 2 - 2 * this.a;
};

Mira.prototype.setXY = function setXY(x, y){
  this.x = x;
  this.y = y;
}

Mira.prototype.maxIterationReached = function maxIterationReached() {
  return this.iteration >= this.maxIteration + 1;
}

Mira.prototype.nextIteration = function nextIteration(){
  this.iteration++;

  const z = this.x;
  this.x = this.b * this.y + this.j;

  this.j = this.a * this.x + this.c * Math.pow(this.x, 2) / (1+ Math.pow(this.x, 2));
  this.y = this.j - z;


  return {
    x: (this.x * this.scale),
    y: (this.y * this.scale) 
  };

}



module.exports = Mira;
