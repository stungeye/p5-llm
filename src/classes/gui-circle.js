export default class Circle {
  constructor(p, x, y, radius, colors, title = "", textSize = 14) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colors = colors;
    this.title = title;
    this.textSize = textSize;
  }

  display(isPressed) {
    this.p.push();
    this.colors.setColors(this.p, this.isHovered(), isPressed);
    this.p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    this.p.textSize(this.textSize);
    this.p.fill(100);
    this.p.noStroke();
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.text(this.title, this.x, this.y);
    this.p.pop();
  }

  isHovered() {
    let d = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
    return d < this.radius;
  }
}
