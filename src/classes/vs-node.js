import { v4 as uuidv4 } from "uuid";
import { VsInputPin, VsOutputPin } from "./vs-pin.js";
import VsNodeTypes from "./vs-node-types.js";

export default class VsNode {
  constructor(type) {
    if (!Object.values(VsNodeTypes).includes(type)) {
      throw new Error(`Invalid node type: ${type}`);
    }

    this.id = uuidv4();
    this.type = type;
    this.inputs = [];
    this.operation = null;
    this.output = null;
  }

  addInput(pin) {
    if (!(pin instanceof VsInputPin)) {
      throw new Error(this.buildErrorString("Invalid input pin."));
    }
    this.inputs.push(pin);
    pin.setNode(this);
  }

  removeInput(pin) {
    if (!(pin instanceof VsInputPin)) {
      throw new Error(this.buildErrorString("Invalid input pin."));
    }
    this.inputs = this.inputs.filter((input) => input.id !== pin.id);
  }

  getInputs() {
    return this.inputs;
  }

  setOutput(pin) {
    if (!(pin instanceof VsOutputPin)) {
      throw new Error(this.buildErrorString("Invalid output pin."));
    }
    pin.setNode(this);
    this.output = pin;
  }

  getOutput() {
    return this.output;
  }

  setOperation(operation) {
    if (this.type !== VsNodeTypes.Function) {
      throw new Error(
        this.buildErrorString("Only function nodes can have operations")
      );
    }
    this.operation = operation;
  }

  execute() {
    if (this.type === VsNodeTypes.Function && this.operation) {
      const inputValues = this.inputs.map((input) => input.getValue());
      console.log(`Executing function node with id ${this.id}`);
      console.log(this.inputs);
      const result = this.operation(...inputValues);
      console.log(`Result of operation: ${result}`);
      if (this.output) {
        console.log("setting output value");
        return this.output.setValue(result);
      }
    } else if (this.type === VsNodeTypes.Function) {
      throw new Error(this.buildErrorString("Operation not set."));
    } else {
      console.log("Not a function node");
      return false;
    }
  }

  buildErrorString(message) {
    return message + ` [${this.type.toString()} node with id ${this.id}]`;
  }

  value() {
    return this.output ? this.output.getValue() : null;
  }

  display(p, x, y) {
    p.push();
    p.translate(x, y);
    p.fill(0);
    p.text(`${this.id} ${this.inputs.length} ${this.output ? 1 : 0}`, 0, 0);
    p.pop();
  }
}
