import GuiCircle from "./gui-circle.js";
import GuiRectangle from "./gui-rectangle.js";
import GuiButton from "./gui-button.js";

export default class GuiWindowTitleBar {
  constructor(
    p,
    x,
    y,
    width,
    height,
    color,
    title,
    textSize = 20,
    closeButtonAction = null
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.title = title;
    this.textSize = textSize;
    this.closeButtonAction = closeButtonAction;

    this.isTitleEditing = false;
    this.input = null;
    this.titlePadding = 34;

    this.editTitleButton = new GuiButton(
      p,
      new GuiRectangle(
        p,
        x + this.titlePadding,
        y,
        width - this.titlePadding,
        this.height
      ),
      "",
      0,
      () => this.createInputField(),
      () => this.removeInputField()
    );
    this.closeButton = new GuiButton(
      p,
      new GuiCircle(
        p,
        x + this.titlePadding / 2,
        y + this.height / 2,
        8,
        p.color(235, 150, 150),
        p.color(235, 150, 150),
        p.color(100),
        p.color(245, 70, 70)
      ),
      "×",
      16,
      () => this.closeButtonAction && this.closeButtonAction()
    );
  }

  display() {
    this.p.push();
    this.p.textSize(this.textSize);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.fill(this.color);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.p.fill(0);
    this.p.text(
      this.title,
      this.x + this.titlePadding,
      this.y + this.height / 2
    );
    this.p.pop();

    this.editTitleButton.display();
    this.closeButton.display();

    if (this.isTitleEditing && this.input) {
      this.title = this.input.value();
    }
  }

  handleMousePressed() {
    this.editTitleButton.handleMousePressed();
    this.closeButton.handleMousePressed();
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
