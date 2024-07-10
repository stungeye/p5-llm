export default class Circle {
  constructor(
    p,
    x,
    y,
    radius,
    defaultStroke = null,
    defaultFill = null,
    hoverStroke = null,
    hoverFill = null
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.defaultStroke = defaultStroke;
    this.defaultFill = defaultFill;
    this.hoverStroke = hoverStroke;
    this.hoverFill = hoverFill;
  }

  display() {
    this.p.push();
    if (this.isHovered()) {
      if (this.hoverStroke) {
        this.p.stroke(this.hoverStroke);
      } else {
        this.p.noStroke();
      }

      if (this.hoverFill) {
        this.p.fill(this.hoverFill);
      } else {
        this.p.noFill();
      }
    } else {
      if (this.defaultStroke) {
        this.p.stroke(this.defaultStroke);
      } else {
        this.p.noStroke();
      }

      if (this.defaultFill) {
        this.p.fill(this.defaultFill);
      } else {
        this.p.noFill();
      }
    }

    this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    this.p.pop();
  }

  isHovered() {
    let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
    return d < this.radius;
  }
}
