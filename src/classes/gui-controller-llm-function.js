import GuiController from "./gui-controller";
import GuiControllerTypes from "./gui-controller-types";
import { VsPinTypes } from "./vs-pin-types";
import VsNode from "./vs-node";
import VsNodeTypes from "./vs-node-types";
import { LlmProviders } from "./llm-providers";
import promptForFunction from "./llm-function-prompt";

export default class GuiControllerLlmFunction extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);

    this.inferenceButton = this.p.createButton("🪄");
    this.inferenceButton.mousePressed(() => this.createFunctionNode());

    this.providerSelect = this.p.createSelect();
    Object.keys(LlmProviders).forEach((key) => {
      this.providerSelect.option(key);
    });

    this.userPrompt = this.p.createElement("textarea");
    // make the textarea element non-resizable
    this.userPrompt.style("resize", "none");

    this.llmFunction = this.p.createElement("textarea");
    // make the textarea element non-resizable and read-only
    this.llmFunction.style("resize", "none");
    this.llmFunction.attribute("readonly", true);

    // create VsNode of type Function and configure it.
    this.node = new VsNode(VsNodeTypes.Function);
  }

  async createFunctionNode() {
    const llmProvider = this.providerSelect.value();
    const result = await promptForFunction(
      this.userPrompt.value(),
      llmProvider
    );

    if (result && result.success) {
      this.valueIsValid = true;

      const newFunctionWindow = this.createNewWindow(
        GuiControllerTypes.UserFunction,
        `${result.functionName} (${llmProvider})`
      );
      const newGuiController = newFunctionWindow.getGuiController();

      newGuiController.setOutputPinSelect(VsPinTypes[result.output.type]);
      newGuiController.setUserDefinedFunction(result.functionBody);

      result.inputs.forEach((inputPinData) => {
        newGuiController.addInputPin(
          VsPinTypes[inputPinData.type],
          inputPinData.name
        );
      });

      newGuiController.configureNode();
      this.llmFunction.value(
        `Successfully created ${result.functionName}!\n\n${result.typedFunctionSignature}`
      );
    } else {
      this.valueIsValid = false;
      this.llmFunction.value("Error: " + JSON.stringify(result));
    }
  }

  inputResized() {
    // Set the input's width and height properties to the input elements width and height
    this.userPrompt.width = this.userPrompt.elt.offsetWidth;
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
    this.inferenceButton.position(x + 310, y + 15);
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
