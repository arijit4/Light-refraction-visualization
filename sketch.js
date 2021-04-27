let ls;
let coreY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  this.ls = [];
  this.coreY = height * 0.7;
  this.ls.push(new Source(0, height/2, this.coreY));
  this.ls[0].setIndexes(0.11, 1.3);
  
  background(0);
  stroke(0, 0, 25);
  strokeWeight(2);
}

function draw() {
  background(0, 5);
  for (let i = 0; i < this.ls.length; i++) {
    this.ls[i].update();
    this.ls[i].show();
  }
  stroke(255);
  line(0, this.coreY, width, this.coreY);
}

function mouseClicked() {
  this.ls.push(new Source(mouseX, mouseY, this.coreY));
  this.ls[this.ls.length - 1].setIndexes(0.11, 1.3);
}