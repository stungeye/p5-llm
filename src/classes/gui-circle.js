export default class Circle {
  constructor(p, x, y, radius, colors) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colors = colors;
  }

  display() {
    this.p.push();
    this.colors.setColors(
      this.p,
      this.isHovered(),
      this.p.mouseIsPressed && this.isHovered()
    );

    this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    this.p.pop();
  }

  isHovered() {
    let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
    return d < this.radius;
  }
}
