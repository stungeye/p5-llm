import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";

export default class GuiControllerUserFunction extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);

    this.outputPinTypeSelect = this.p.createSelect();
    this.outputPinTypeSelect.changed(() => {
      this.configureNode();
    });

    this.inputPinTypeSelect = this.p.createSelect();

    Object.keys(VsPinTypes).forEach((key) => {
      this.outputPinTypeSelect.option(key);
      this.inputPinTypeSelect.option(key);
    });

    this.newInputPinName = this.p.createInput();
    this.newInputPinButton = this.p.createButton("+");

    this.newInputPinButton.mousePressed(() => this.newInputPin());

    this.userDefinedFunction = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.userDefinedFunction.style("resize", "none");
    this.userDefinedFunction.input(() => {
      this.configureNode();
      this.changeValue();
    });

    // create VsNode of type Function and configure it.
    this.node = new VsNode(VsNodeTypes.Function);
    this.configureNode();
  }

  newInputPin() {
    if (
      this.addInputPin(
        VsPinTypes[this.inputPinTypeSelect.value()],
        this.newInputPinName.value()
      )
    ) {
      // Clear input if pin was successfully added.
      this.newInputPinName.value("");
      this.configureNode();
    }
  }

  updateOutputPinType() {
    const newPinType = VsPinTypes[this.outputPinTypeSelect.value()];
    if (this.outputGuiPin && this.outputGuiPin.pin.getType() === newPinType) {
      return;
    }

    if (this.outputGuiPin) {
      const connections =
        this.guiConnectionManager.connectionManager.getConnectionsForPin(
          this.outputGuiPin.pin
        );
      if (connections.length > 0) {
        if (
          confirm(
            "Changing the output pin will remove all connections. Are you sure you want to continue?"
          )
        ) {
          this.guiConnectionManager.removeConnections(connections);
        } else {
          // reset the select to the previous value
          this.outputPinTypeSelect.value(
            Object.keys(VsPinTypes).find(
              (key) => VsPinTypes[key] === this.outputGuiPin.pin.getType()
            )
          );
          return;
        }
      }
    }

    this.setOutputPin(newPinType);
  }

  configureNode() {
    this.updateOutputPinType();

    if (this.node) {
      // Set the operation while splatting out the input pin names:
      try {
        this.node.setOperation(
          new Function(
            ...this.getInputPinNames(),
            this.userDefinedFunction.value()
          )
        );
        this.changeValue();
      } catch (e) {
        console.log("Error setting operation:", e);
      }
    } else {
      console.log("Node is null when trying to set output pin.");
    }
  }

  inputResized() {
    // Set the input's width and height properties to the input elements width and height
    this.userDefinedFunction.width = this.userDefinedFunction.elt.offsetWidth;
  }

  changeValue() {
    try {
      this.valueIsValid = this.node.execute();
    } catch (e) {
      console.log(
        "Error executing function:",
        this.userDefinedFunction.value()
      );
      this.valueIsValid = false;
    }
  }

  display() {
    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.valueIsValid) {
      this.p.fill("#E0FFE0");
    } else {
      this.p.fill("#FFE0E0");
    }
    this.p.rect(x, y, width, height);

    this.p.noStroke();
    this.p.fill(0);
    this.p.textSize(15);
    this.p.text("Output:", x + 20, y + 35);
    this.p.text("Input:", x + 20, y + 75);
    this.p.pop();

    // Reposition selects and button
    this.outputPinTypeSelect.position(x + 75, y + 20);
    this.inputPinTypeSelect.position(x + 75, y + 60);
    this.newInputPinName.position(x + 165, y + 60);
    this.newInputPinName.size(110, 20);
    this.newInputPinButton.position(x + 290, y + 60);

    // Resize and reposition input
    this.userDefinedFunction.position(x + 20, y + 100);
    this.userDefinedFunction.size(width - 50, height - 150);

    super.display();
  }

  destroy() {
    super.destroy();
    this.outputPinTypeSelect.remove();
    this.inputPinTypeSelect.remove();
    this.newInputPinName.remove();
    this.newInputPinButton.remove();
    this.userDefinedFunction.remove();
  }
}
