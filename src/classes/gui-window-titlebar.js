export default class GuiWindowTitleBar {
  constructor(p, x, y, width, height, color, title, textSize = 20) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.title = title;
    this.textSize = textSize;

    this.isTitleEditing = false;
    this.input = null;
    this.titlePadding = 34;
  }

  display() {
    this.p.push();
    this.p.textSize(this.textSize);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.fill(this.color);
    this.p.rect(this.x, this.y, this.width, this.height);
    if (this.isTitleHovered() && !this.isTitleEditing) {
      this.p.fill(75);
    } else {
      this.p.fill(0);
    }
    this.p.text(
      this.title,
      this.x + this.titlePadding,
      this.y + this.height / 2
    );

    this.p.fill(235, 150, 150);
    this.p.circle(this.x + this.titlePadding / 2, this.y + this.height / 2, 10);

    this.p.pop();

    if (this.isTitleEditing && this.input) {
      this.title = this.input.value();
    }
  }

  handleMousePressed() {
    if (this.isTitleHovered()) {
      this.createInputField();
    } else {
      this.removeInputField();
    }
  }

  isTitleHovered() {
    return (
      this.p.mouseX > this.x + this.titlePadding &&
      this.p.mouseX < this.x + this.width &&
      this.p.mouseY > this.y &&
      this.p.mouseY < this.y + this.height
    );
  }

  createInputField() {
    this.isTitleEditing = true;
    if (!this.input) {
      this.input = this.p.createInput(this.title);
      this.input.position(this.x + this.titlePadding, this.y + 5);
      this.input.style("font-size", this.textSize + "px");
      this.input.size(this.width - 1.5 * this.titlePadding, this.height - 14);

      this.input.elt.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.removeInputField();
        }
      });

      setTimeout(() => {
        this.input.elt.select();
      }, 0);
    }
  }

  removeInputField() {
    this.isTitleEditing = false;

    if (this.input) {
      this.input.remove();
      this.input = null;
    }
  }

  getTitle() {
    return this.title;
  }
}
