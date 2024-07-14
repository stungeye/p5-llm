import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";

export default class GuiControllerConstant extends GuiController {
  constructor(p, selectionManager) {
    super(p, selectionManager);

    this.select = this.p.createSelect();
    Object.keys(VsPinTypes).forEach((key) => {
      this.select.option(key);
    });

    this.select.changed(() => {
      this.setOutputPin(VsPinTypes[this.select.value()]);
    });

    this.input = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.input.style("resize", "none");
    this.input.input(() => this.changeValue());

    // create VsNode of type Function with and output node of the selected type
    this.node = new VsNode(VsNodeTypes.Function);
    this.setOutputPin(VsPinTypes[this.select.value()]);
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
      this.p.fill("green");
    } else {
      this.p.fill("red");
    }
    this.p.rect(x, y, width, height);
    this.p.pop();

    const zindex = this.parentWindow.guiManager.indexOfWindow(
      this.parentWindow
    );
    this.select.style("z-index", zindex + 1);
    this.input.style("z-index", zindex + 1);

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
