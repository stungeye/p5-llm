export default class VsConnection {
  constructor(outputPin, inputPin) {
    if (outputPin.type !== inputPin.type) {
      throw new Error("Type mismatch");
    }
    this.outputPin = outputPin;
    this.inputPin = inputPin;
  }

  propagate() {
    console.log(
      `Propagating from ${this.outputPin.getNode().id} to ${
        this.inputPin.getNode().id
      }`
    );
    console.log(`Propagating value is ${this.outputPin.getValue()}`);
    this.inputPin.setValue(this.outputPin.getValue());
  }
}
