import { VsOutputPin, VsInputPin } from "./vs-pin";
import GuiPin from "./gui-pin";

export default class GuiController {
  constructor(p, guiConnectionManager) {
    this.p = p;
    this.parentWindow = null;
    this.guiConnectionManager = guiConnectionManager;
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
    this.outputGuiPin = new GuiPin(
      this.p,
      this.outputPin,
      this.parentWindow,
      this.guiConnectionManager
    );
  }

  addInputPin(pinType, name) {
    if (name.length === 0) return false;
    if (this.inputPins.find((inputPin) => inputPin.name === name)) return false;

    const newPin = new VsInputPin(pinType, name);
    this.inputPins.push(newPin);
    this.inputGuiPins.push(
      new GuiPin(this.p, newPin, this.parentWindow, this.guiConnectionManager)
    );

    this.node.addInput(newPin);

    return true;
  }

  getInputPinNames() {
    return this.inputPins.map((inputPin) => inputPin.name);
  }

  removeInputPin(pin) {
    this.inputPins = this.inputPins.filter((inputPin) => inputPin !== pin);
    this.inputGuiPins = this.inputGuiPins.filter(
      (inputGuiPin) => inputGuiPin.pin !== pin
    );
    this.node.removeInputPin(pin);
  }

  display() {
    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.outputGuiPin) {
      this.outputGuiPin.display(x + width, y + 10);
    }

    if (this.inputGuiPins.length > 0) {
      this.inputGuiPins.forEach((inputGuiPin, index) => {
        inputGuiPin.display(x - 8, y + 25 * (index + 1));
      });
    }

    if (this.node) {
      this.node.display(this.p, x, y + height + 15);
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
