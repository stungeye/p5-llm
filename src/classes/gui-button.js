export default class GuiButton {
  constructor(
    p,
    shape,
    title = "",
    textSize = 14,
    onClick = null,
    onMissClick = null,
    onDragged = null
  ) {
    this.p = p;
    this.shape = shape; // Shape object must have isHovered() and display() methods.
    this.title = title;
    this.textSize = textSize;
    this.onClick = onClick;
    this.onMissClick = onMissClick;
    this.onDragged = onDragged;

    this.isPressed = false;
  }

  display() {
    this.shape.display(this.isPressed);

    // Draw the title text
    this.p.push();
    this.p.textSize(this.textSize);
    this.p.fill(100);
    this.p.noStroke();
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.text(this.title, this.shape.x, this.shape.y);
    this.p.pop();
  }

  moveDelta(deltaX, deltaY) {
    this.shape.x += deltaX;
    this.shape.y += deltaY;
  }

  handleMousePressed() {
    if (this.shape.isHovered()) {
      this.isPressed = true;
      this.onClick && this.onClick();
    } else if (!this.shape.isHovered() && this.onMissClick) {
      this.onMissClick();
    }
  }

  handleMouseDragged() {
    if (this.onDragged && this.isPressed) {
      this.onDragged();
    }
  }

  handleMouseReleased() {
    this.isPressed = false;
  }

  setOnClick(callback) {
    this.onClick = callback;
  }

  setOnMissClick(callback) {
    this.onMissClick = callback;
  }
}
