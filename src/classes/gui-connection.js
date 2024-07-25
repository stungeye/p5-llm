export default class GuiConnection {
  constructor(p, guiConnectionManager, guiInputPin, guiOutputPin) {
    this.p = p;
    this.guiConnectionManager = guiConnectionManager;
    this.guiInputPin = guiInputPin;
    this.guiOutputPin = guiOutputPin;
  }

  display() {
    let startX = this.guiInputPin.x;
    let startY = this.guiInputPin.y;
    let endX = this.guiOutputPin.x;
    let endY = this.guiOutputPin.y;
  }
}
