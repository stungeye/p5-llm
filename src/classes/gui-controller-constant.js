import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";
import { VsOutputPin } from "./vs-pin";

export default class GuiControllerConstant extends GuiController {
  constructor(p, selectionManager) {
    super(p, selectionManager);

    this.select = this.p.createSelect();
    Object.keys(VsPinTypes).forEach((key) => {
      this.select.option(key);
    });

    this.select.changed(() => {
      console.log("Select changed", this.select.selected());
      this.addOutputPin();
    });

    this.input = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.input.style("resize", "none");
    this.input.input(() => this.changeValue());

    // create VsNode of type Function with and output node of the selected type
    this.node = new VsNode(VsNodeTypes.Function);
    this.addOutputPin();
  }

  inputResized() {
    // Set the input's width and height properties to the input elements width and height
    this.input.width = this.input.elt.offsetWidth;
  }

  addOutputPin() {
    this.output = new VsOutputPin(VsPinTypes[this.select.value()]);
    this.node.setOutput(this.output);
    this.node.setOperation(() => this.input.value());
    this.valueIsValid = this.node.execute();
  }

  changeValue() {
    this.valueIsValid = this.node.execute();
  }

  display() {
    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.valueIsValid) {
      this.p.fill("green");
    } else {
      this.p.fill("red");
    }
    this.p.rect(x, y, width, height);
    this.p.pop();

    // Reposition select
    this.select.position(x + 20, y + 20);

    // Resize and reposition input
    this.input.position(x + 20, y + 60);
    this.input.size(width - 50, height - 100);

    // display output value
    this.p.push();
    this.p.fill("black");
    this.p.textSize(16);
    this.p.text(`Output: ${this.output.getValue()}`, x + 20, y + 200);
  }

  destroy() {
    this.select.remove();
    this.input.remove();
  }
}
