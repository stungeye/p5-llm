export default class GuiButton {
  constructor(p, shape, onClick = null, onMissClick = null, onDragged = null) {
    this.p = p;
    this.shape = shape; // Shape object must have isHovered() and display() methods.
    this.onClick = onClick;
    this.onMissClick = onMissClick;
    this.onDragged = onDragged;

    this.isPressed = false;
  }

  display() {
    this.shape.display(this.isPressed);
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
