import GuiCircle from "./gui-circle.js";
import GuiRectangle from "./gui-rectangle.js";
import GuiButton from "./gui-button.js";
import Config from "./config.js";

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
    closeButtonAction = null,
    moveButtonAction = null
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
    this.moveButtonAction = moveButtonAction;

    this.isTitleEditing = false;
    this.input = null;
    this.titlePadding = 60;
    this.moveButtonOffsetX = (2 * this.titlePadding) / 3;
    this.moveButtonOffsetY = this.height / 2;

    this.editTitleButton = new GuiButton(
      p,
      new GuiRectangle(
        p,
        x + this.titlePadding,
        y,
        width - this.titlePadding,
        this.height,
        Config.colors.invisibleButton
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
        x + this.titlePadding / 3,
        y + this.height / 2,
        8,
        Config.colors.closeButton
      ),
      "×",
      16,
      () => this.closeButtonAction && this.closeButtonAction()
    );
    this.moveButton = new GuiButton(
      p,
      new GuiCircle(
        p,
        x + this.moveButtonOffsetX,
        y + this.moveButtonOffsetY,
        8,
        Config.colors.moveButton
      ),
      "⇄",
      14,
      null,
      null,
      () => this.moveButtonAction && this.moveButtonAction()
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
    this.moveButton.display();

    if (this.isTitleEditing && this.input) {
      this.title = this.input.value();
    }
  }

  createInputField() {
    this.isTitleEditing = true;
    if (!this.input) {
      this.input = this.p.createInput(this.title);
      this.input.position(this.x + this.titlePadding, this.y + 5);
      this.input.style("font-size", this.textSize + "px");
      this.input.size(this.width - 1.2 * this.titlePadding, this.height - 14);

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

  move(x, y, parentWindow) {
    // We need to keep the mouse on the move button.
    let offsetX = x - this.moveButtonOffsetX;
    let offsetY = y - this.moveButtonOffsetY;
    // Calculate the delta between the new position and the old position,
    // while taking into account the move button offset.
    let deltaX = offsetX - this.x;
    let deltaY = offsetY - this.y;
    // Move the title bar, buttons, and the parent window by the delta.
    this.editTitleButton.moveDelta(deltaX, deltaY);
    this.closeButton.moveDelta(deltaX, deltaY);
    this.moveButton.moveDelta(deltaX, deltaY);
    parentWindow.moveDelta(deltaX, deltaY);
    this.x += deltaX;
    this.y += deltaY;
  }

  handleMousePressed() {
    this.editTitleButton.handleMousePressed();
    this.closeButton.handleMousePressed();
    this.moveButton.handleMousePressed();
  }

  handleMouseDragged() {
    this.moveButton.handleMouseDragged();
  }

  handleMouseReleased() {
    this.moveButton.handleMouseReleased();
    this.closeButton.handleMouseReleased();
    this.editTitleButton.handleMouseReleased();
  }
}
