var ls;
var coreY;

function setup() {
  createCanvas(windowWidth, windowHeight - 45);

  this.ls = [];
  this.coreY = height * 0.7;

  let n1Input = select('#n1Input');
  n1Input.size(width * 0.6);
  n1Input.value('1.00');

  let n2Input = select('#n2Input');
  n2Input.size(width * 0.6);
  n2Input.value('1.00');

  n1Input.input(this.updateN1);
  n2Input.input(this.updateN2);

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

function updateN1() {
  let n1Input = select('#n1Input');
  let n1 = n1Input.value() / 100.0;
  let tmp = select('#n1Value');
  tmp.html("n1 : " + n1);
}

function updateN2() {
  let n2Input = select('#n2Input');
  let n2 = n2Input.value() / 100.0;
  let tmp = select('#n2Value');
  tmp.html("n2 : " + n2);
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    this.ls.push(new Source(mouseX, mouseY, this.coreY));
    this.ls[this.ls.length - 1].setIndexes(select('#n1Input').value(), select('#n2Input').value());
  }
}
