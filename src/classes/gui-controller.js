import { VsOutputPin } from "./vs-pin";
import GuiPin from "./gui-pin";

export default class GuiController {
  constructor(p, connectionManager) {
    this.p = p;
    this.parentWindow = null;
    this.connectionManager = connectionManager;
    this.node = null;
    this.outputPin = null;
    this.outputGuiPin = null;
    this.inputPins = [];
    this.inputGuiPins = [];
  }

  setParentWindow(window) {
    this.parentWindow = window;
  }

  setOutputPin(pinType) {
    this.outputPin = new VsOutputPin(pinType);
    this.outputGuiPin = new GuiPin(this.p, this.outputPin);
  }

  addInputPin(pin) {
    this.inputPins.push(pin);
    this.inputGuiPins.push(new GuiPin(this.p, pin));
  }

  removeInputPin(pin) {
    this.inputPins = this.inputPins.filter((inputPin) => inputPin !== pin);
    this.inputGuiPins = this.inputGuiPins.filter(
      (inputGuiPin) => inputGuiPin.pin !== pin
    );
  }

  display() {
    const [x, y, width, _] = this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.outputGuiPin) {
      this.outputGuiPin.display(x + width, y + 10);
    }
    this.p.pop();
  }

  handleMousePressed() {
    if (this.outputGuiPin) {
      const [x, y, width, height] =
        this.parentWindow.getControllerWindowDimensions();
      this.outputGuiPin.handleMousePressed(x + width, y + 10);
    }
  }

  handleMouseReleased() {
    if (this.outputGuiPin) {
      this.outputGuiPin.handleMouseReleased();
    }
  }

  // Methods to be overridden by child classes for specific functionalities
  execute() {}
  destroy() {}
}
