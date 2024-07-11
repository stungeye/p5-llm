export default class Rectangle {
  constructor(p, x, y, width, height, colors) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colors = colors;
  }

  display(isPressed) {
    this.p.push();
    this.colors.setColors(this.p, this.isHovered(), isPressed);

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
