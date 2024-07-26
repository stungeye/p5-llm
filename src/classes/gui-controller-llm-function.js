import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";

export default class GuiControllerLlmFunction extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);

    this.inferenceButton = this.p.createButton("🪄");

    this.userPrompt = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.userPrompt.style("resize", "none");

    this.llmFunction = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.llmFunction.style("resize", "none");
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
    this.userPrompt.width = this.userPrompt.elt.offsetWidth;
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
    this.p.text("Describe Required Action:", x + 20, y + 30);
    this.p.pop();

    // Reposition selects and button
    this.inferenceButton.position(x + 290, y + 15);

    // Resize and reposition input
    this.userPrompt.position(x + 20, y + 60);
    this.userPrompt.size(width - 50, (height - 130) / 2);
    this.llmFunction.position(x + 20, y + (height - 130) / 2 + 85);
    this.llmFunction.size(width - 50, (height - 130) / 2);

    super.display();
  }

  destroy() {
    super.destroy();
    this.inferenceButton.remove();
    this.userPrompt.remove();
  }
}
