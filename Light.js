class Source {
  constructor(x, y, surfaceY) {
    this.pos = createVector(x, y);
    this.coreY = surfaceY;

    this.vel = p5.Vector.sub(createVector(width / 2, this.coreY), this.pos);
    this.vel.normalize();

    this.n1 = 1;
    this.n2 = 1;

    this.inClad = (y > surfaceY);
  }

  setVelocity(x, y) {
    this.vel.set(x, y);
  }

  setIndexes(n1, n2) {
    this.n1 = n1;
    this.n2 = n2;
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y >= height) {
      this.pos.y = height - 1;
      this.vel.y *= -1;
    } else if (this.pos.y < 0) {
      this.pos.y = 1;
      this.vel.y *= -1;
    } else if (this.pos.x >= width) {
      this.pos.x = width - 1;
      this.vel.x *= -1;
    } else if (this.pos.x < 0) {
      this.pos.x = 1;
      this.vel.x *= -1;
    }
    // this.pos.add(this.vel);

    if (round(this.pos.y) > this.coreY && !this.inClad) {
      let theta1 = HALF_PI - this.vel.heading();
      let sin_theta2 = this.n1 * sin(theta1) / this.n2;
      
      if (sin_theta2 >= -1 && sin_theta2 <= 1) {
        // regular reflection
        stroke(255, 0, 0);
        
        let y = HALF_PI - asin(sin_theta2);
        this.vel.setHeading(y);
        
        this.inClad = true;
      } else {
        // total internal reflecton
        this.vel.y *= -1;
      }
    } else if (round(this.pos.y) < this.coreY && this.inClad) {
      let theta3 = HALF_PI - this.vel.heading();
      let sin_theta4 = this.n2 * sin(theta3) / this.n1;
      
      if (sin_theta4 >= -1 && sin_theta4 <= 1) {
        // regular reflection
        stroke(0, 0, 255);
        let w = HALF_PI - asin(sin_theta4);
        this.vel.setHeading(-w);
        
        this.inClad = false;
      } else {
        // total internal reflection
        this.vel.y *= -1;
      }
    }
  }

  show() {
    if (this.inClad) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 0, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}