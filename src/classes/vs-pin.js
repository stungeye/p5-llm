import VsPinTypes from "./vs-pin-types.js";
import { v4 as uuidv4 } from "uuid";

export class Pin {
  constructor(type) {
    if (!Object.values(VsPinTypes).includes(type)) {
      throw new Error("Invalid pin type");
    }
    this.id = uuidv4();
    this.type = type;
    this.value = null;
    this.node = null;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setNode(node) {
    this.node = node;
  }

  getNode() {
    return this.node;
  }
}

export class VsInputPin extends Pin {
  constructor(type) {
    super(type);
  }
}

export class VsOutputPin extends Pin {
  constructor(type) {
    super(type);
  }
}
