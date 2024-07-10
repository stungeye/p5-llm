export default class Rectangle {
  constructor(
    p,
    x,
    y,
    width,
    height,
    defaultStroke,
    defaultFill,
    hoverStroke,
    hoverFill
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.defaultStroke = defaultStroke;
    this.defaultFill = defaultFill;
    this.hoverStroke = hoverStroke;
    this.hoverFill = hoverFill;
  }

  display(isHovered) {
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

    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.pop();
  }

  isHovered() {
    return (
      this.p.mouseX > this.x &&
      this.p.mouseX < this.x + this.width &&
      this.p.mouseY > this.y &&
      this.p.mouseY < this.y + this.height
    );
  }
}
