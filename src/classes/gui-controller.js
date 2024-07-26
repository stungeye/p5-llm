import { VsOutputPin, VsInputPin } from "./vs-pin";
import GuiPin from "./gui-pin";

export default class GuiController {
  constructor(p, guiConnectionManager) {
    this.p = p;
    this.parentWindow = null;
    this.guiConnectionManager = guiConnectionManager;
    this.node = null;
    this.outputGuiPin = null;
    this.inputGuiPins = [];
  }

  setParentWindow(window) {
    this.parentWindow = window;
  }

  setOutputPin(pinType) {
    if (this.outputGuiPin && this.outputGuiPin.pin.getType() === pinType) {
      return;
    } else if (this.outputGuiPin) {
      // Remove connections associated with the output pin.
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
          return;
        }
      }
    }

    let outputPin = new VsOutputPin(pinType);
    this.outputGuiPin = new GuiPin(
      this.p,
      outputPin,
      this.guiConnectionManager
    );

    if (this.node) {
      this.node.setOutput(outputPin);
    }
  }

  addInputPin(pinType, name) {
    if (name.length === 0) return false;
    if (this.node) {
      if (this.node.doesInputNameExist(name)) return false;
    }

    const newPin = new VsInputPin(pinType, name);
    this.inputGuiPins.push(
      new GuiPin(this.p, newPin, this.guiConnectionManager)
    );

    console.log("created input pin ", newPin);
    console.log("Node: ", this.node);

    if (this.node) {
      this.node.addInput(newPin);
    }

    return true;
  }

  getInputPinNames() {
    return this.node
      ? this.node.getInputs().map((inputPin) => inputPin.name)
      : [];
  }

  removeInputPin(pin) {
    this.inputGuiPins = this.inputGuiPins.filter(
      (inputGuiPin) => inputGuiPin.pin !== pin
    );
    if (this.node) {
      this.node.removeInputPin(pin);
    }
  }

  getHoveredPin() {
    const windowDimensions = this.parentWindow.getControllerWindowDimensions();

    if (this.outputGuiPin) {
      const [x, y] = this.getOutputLocation(windowDimensions);
      if (this.outputGuiPin.isHovered(x, y)) {
        return this.outputGuiPin;
      }
    }

    for (let i = 0; i < this.inputGuiPins.length; i++) {
      const inputGuiPin = this.inputGuiPins[i];
      const [x, y] = this.getInputLocation(windowDimensions, i);
      if (inputGuiPin.isHovered(x, y)) {
        return inputGuiPin;
      }
    }

    return null;
  }

  getOutputLocation(windowDimensions) {
    const [x, y, width, _h] = windowDimensions;
    return [x + width, y + 10];
  }

  getInputLocation(windowDimensions, index) {
    const [x, y, _w, _h] = windowDimensions;
    return [x - 8, y + 25 * (index + 1)];
  }

  getAllPinsWithLocations() {
    const windowDimensions = this.parentWindow.getControllerWindowDimensions();
    const pins = [];

    if (this.outputGuiPin) {
      const [x, y] = this.getOutputLocation(windowDimensions);
      pins.push([this.outputGuiPin, x, y]);
    }

    this.inputGuiPins.forEach((inputGuiPin, index) => {
      const [x, y] = this.getInputLocation(windowDimensions, index);
      pins.push([inputGuiPin, x, y]);
    });

    return pins;
  }

  display() {
    const windowDimensions = this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    if (this.outputGuiPin) {
      const [x, y] = this.getOutputLocation(windowDimensions);
      this.outputGuiPin.display(x, y);
    }

    if (this.inputGuiPins.length > 0) {
      this.inputGuiPins.forEach((inputGuiPin, index) => {
        const [x, y] = this.getInputLocation(windowDimensions, index);
        inputGuiPin.display(x, y);
      });
    }

    if (this.node) {
      const [x, y, _, height] = windowDimensions;
      this.node.display(this.p, x, y + height + 15);
    }
    this.p.pop();
  }

  handleMousePressed() {
    const windowDimensions = this.parentWindow.getControllerWindowDimensions();
    if (this.outputGuiPin) {
      const [x, y] = this.getOutputLocation(windowDimensions);
      this.outputGuiPin.handleMousePressed(x, y);
    }
    this.inputGuiPins.forEach((inputGuiPin, index) => {
      const [x, y] = this.getInputLocation(windowDimensions, index);
      inputGuiPin.handleMousePressed(x, y);
    });
  }

  handleMouseReleased() {
    if (this.outputGuiPin) {
      this.outputGuiPin.handleMouseReleased();
    }
    this.inputGuiPins.forEach((inputGuiPin) => {
      inputGuiPin.handleMouseReleased();
    });
  }

  destroy() {
    // Remove all connections associated with the pins
    if (this.outputGuiPin) {
      this.guiConnectionManager.removeConnections(
        this.guiConnectionManager.connectionManager.getConnectionsForPin(
          this.outputGuiPin.pin
        )
      );
    }

    this.inputGuiPins.forEach((inputGuiPin) => {
      this.guiConnectionManager.removeConnections(
        this.guiConnectionManager.connectionManager.getConnectionsForPin(
          inputGuiPin.pin
        )
      );
    });
  }

  // Methods to be overridden by child classes for specific functionalities
  execute() {}
}
