export class Circle {
  c; x; y; radius; dx; dy; colorArray = [];
  constructor(context, x, y, radius, dx, dy) {
    this.c = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.getRandomColor();
  }

  draw = (index) => {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.c.strokeStyle = this.colorArray[index];
    this.c.fillStyle = this.colorArray[index];
    this.c.fill();
    this.c.stroke();
  }

  update = (index) => {
    //to hit the right edge of the circle we need to add radius to the x
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = - this.dx;
    }

    //to hit the bottom edge of the circle we need to add radius to the y
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = - this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw(index);
  }

  getRandomColor() {
    for (let index = 0; index < 200; index++) {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 18)];
      }
      this.colorArray.push(color)
    }
  }
}
