import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";

export default class GuiControllerConstant extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);

    this.select = this.p.createSelect();
    Object.keys(VsPinTypes).forEach((key) => {
      this.select.option(key);
    });

    this.select.changed(() => {
      this.configureNode();
    });

    this.input = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.input.style("resize", "none");
    this.input.input(() => this.changeValue());

    // create VsNode of type Function and configure it.
    this.node = new VsNode(VsNodeTypes.Function);
    this.configureNode();
  }

  configureNode() {
    // Sets the output pin of the node to the selected pin type
    this.setOutputPin(VsPinTypes[this.select.value()]);

    // Set the operation of the node to always return the input value.
    if (this.node) {
      this.node.setOutput(this.outputPin);
      this.node.setOperation(() => this.input.value());
      this.valueIsValid = this.node.execute();
    } else {
      console.log("Node is null when trying to set output pin.");
    }
  }

  inputResized() {
    // Set the input's width and height properties to the input elements width and height
    this.input.width = this.input.elt.offsetWidth;
  }

  changeValue() {
    this.valueIsValid = this.node.execute();
  }

  display() {
    super.display();

    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.valueIsValid) {
      this.p.fill("#E0FFE0");
    } else {
      this.p.fill("#FFE0E0");
    }
    this.p.rect(x, y, width, height);
    this.p.pop();

    // Reposition select
    this.select.position(x + 20, y + 20);

    // Resize and reposition input
    this.input.position(x + 20, y + 60);
    this.input.size(width - 50, height - 100);
  }

  destroy() {
    this.select.remove();
    this.input.remove();
  }
}
