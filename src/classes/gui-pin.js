import { VsInputPin, VsOutputPin } from "./vs-pin";
import Config from "./config";

export default class GuiPin {
  constructor(p, pin) {
    this.p = p;
    this.pin = pin;
    this.colors = Config.colors[pin.getType()];
    this.width = 14;
    this.height = 14;
    this.isPressed = false;
  }

  getPin() {
    this.pin;
  }

  isHovered(x, y) {
    if (this.pin instanceof VsInputPin) {
      return this.p.dist(this.p.mouseX, this.p.mouseY, x, y) < this.width / 2;
    } else if (this.pin instanceof VsOutputPin) {
      return (
        this.p.mouseX > x &&
        this.p.mouseX < x + this.width &&
        this.p.mouseY > y &&
        this.p.mouseY < y + this.height
      );
    } else {
      throw new Error("Attempt to check hover on pin of unknown type");
    }
  }

  display(x, y) {
    this.p.push();
    this.colors.setColors(this.p, this.isHovered(x, y), this.isPressed);
    this.p.strokeWeight(1);
    if (this.pin instanceof VsInputPin) {
      this.p.ellipse(x, y, this.width, this.height);
    } else if (this.pin instanceof VsOutputPin) {
      this.p.rect(x, y, this.width, this.height);
    } else {
      throw new Error("Attempt to display pin of unknown type.");
    }

    if (this.isHovered(x, y)) {
      this.p.textSize(16);
      let outputValue = "" + this.pin.getValue();
      if (this.pin.getType() === "object") {
        outputValue = JSON.stringify(this.pin.getValue(), null, 2);
      }
      const outputWidth = this.p.textWidth(outputValue);
      //output height based on number of newlines in the output value and the ascent/descent of the font
      const outputHeight =
        (this.p.textAscent() + this.p.textDescent()) *
        outputValue.split("\n").length;
      this.p.rect(x + 20, y, outputWidth + 10, outputHeight + 10);
      this.p.noStroke();
      this.p.fill("black");
      this.p.text(outputValue, x + 25, y + 16);
    }
  }

  handleMousePressed(x, y) {
    if (this.isHovered(x, y)) {
      this.isPressed = true;
    }
  }

  handleMouseReleased() {
    this.isPressed = false;
  }
}
