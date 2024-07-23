import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";

export default class GuiControllerUserFunction extends GuiController {
  constructor(p, connectionManager) {
    super(p, connectionManager);

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
    this.input.input(() => {
      this.configureNode();
      this.changeValue();
    });

    // create VsNode of type Function and configure it.
    this.node = new VsNode(VsNodeTypes.Function);
    this.configureNode();
  }

  configureNode() {
    // Sets the output pin of the node to the selected pin type
    // This should actually be set by the user in the GUI.
    this.setOutputPin(VsPinTypes[this.select.value()]);

    // Currently sets the operation to a placeholder function that always returns true.
    // Should also set input pins.
    if (this.node) {
      this.node.setOutput(this.outputPin);
      this.node.setOperation(new Function(this.input.value()));
      this.changeValue();
    } else {
      console.log("Node is null when trying to set output pin.");
    }
  }

  inputResized() {
    // Set the input's width and height properties to the input elements width and height
    this.input.width = this.input.elt.offsetWidth;
  }

  changeValue() {
    try {
      this.valueIsValid = this.node.execute();
    } catch (e) {
      console.log("Error executing function:", this.input.value());
      this.valueIsValid = false;
    }
  }

  display() {
    super.display();

    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.valueIsValid) {
      this.p.fill("green");
    } else {
      this.p.fill("red");
    }
    this.p.rect(x, y, width, height);

    this.p.noStroke();
    this.p.fill(0);
    this.p.textSize(15);
    this.p.text("Output:", x + 20, y + 40);
    this.p.pop();
    // Reposition select
    this.select.position(x + 75, y + 20);

    // Resize and reposition input
    this.input.position(x + 20, y + 60);
    this.input.size(width - 50, height - 100);
  }

  destroy() {
    this.select.remove();
    this.input.remove();
  }
}
