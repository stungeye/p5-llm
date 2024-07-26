import GuiController from "./gui-controller";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";
import { LlmProviders, promptForFunction } from "./llm-function-prompt";

export default class GuiControllerLlmFunction extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);

    this.inferenceButton = this.p.createButton("🪄");
    this.inferenceButton.mousePressed(async () => {
      const result = await promptForFunction(
        this.userPrompt.value(),
        this.providerSelect.value()
      );
      if (result) {
        console.log(result);
        if (result.success) {
          this.valueIsValid = true;
          this.llmFunction.value(
            `${result.functionSignature} {\n  ${result.functionBody}\n}`
          );
          this.parentWindow.setTitle(result.functionName);
          this.configureNode(result.output, result.inputs, result.functionBody);
        } else {
          this.valueIsValid = false;
          this.llmFunction.value("// Error: " + JSON.stringify(result));
        }
      }
    });

    this.providerSelect = this.p.createSelect();
    Object.keys(LlmProviders).forEach((key) => {
      this.providerSelect.option(key, LlmProviders[key]);
    });

    this.userPrompt = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.userPrompt.style("resize", "none");

    this.llmFunction = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.llmFunction.style("resize", "none");

    // create VsNode of type Function and configure it.
    this.node = new VsNode(VsNodeTypes.Function);
  }

  updateInputPinTypes(inputPinsData) {
    // Remove current input pins and their associated connections:
    this.inputGuiPins.forEach((inputGuiPin) => {
      const connections =
        this.guiConnectionManager.connectionManager.getConnectionsForPin(
          inputGuiPin.pin
        );
      this.guiConnectionManager.removeConnections(connections);
    });

    inputPinsData.forEach((inputPinData) => {
      console.log(inputPinData);
      this.addInputPin(VsPinTypes[inputPinData.type], inputPinData.name);
    });
  }

  updateOutputPinType(pinTypeKey) {
    const newPinType = VsPinTypes[pinTypeKey];

    if (this.outputGuiPin) {
      const connections =
        this.guiConnectionManager.connectionManager.getConnectionsForPin(
          this.outputGuiPin.pin
        );
      this.guiConnectionManager.removeConnections(connections);
    }

    this.setOutputPin(newPinType);
  }

  configureNode(outputPinData, inputPinsData, operation) {
    this.updateOutputPinType(outputPinData.type);
    this.updateInputPinTypes(inputPinsData);

    if (this.node) {
      // Set the operation while splatting out the input pin names:
      try {
        this.node.setOperation(
          new Function(...this.getInputPinNames(), operation)
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
    this.providerSelect.position(x + 200, y + 15);

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
    this.llmFunction.remove();
    this.providerSelect.remove();
  }
}
