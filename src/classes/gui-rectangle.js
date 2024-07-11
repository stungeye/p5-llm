export default class Rectangle {
  constructor(p, x, y, width, height, colors, title = "", textSize = 14) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.title = title;
    this.textSize = textSize;
  }

  display(isPressed) {
    this.p.push();
    this.colors.setColors(this.p, this.isHovered(), isPressed);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.textSize(this.textSize);
    this.p.fill(100);
    this.p.noStroke();
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.text(this.title, this.x + this.width / 2, this.y + this.height / 2);
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
