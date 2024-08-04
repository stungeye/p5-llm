import { VsInputPin, VsOutputPin } from "./vs-pin";

export default class GuiConnectionManager {
  constructor(p, guiManager, connectionManager) {
    this.p = p;
    this.guiManager = guiManager;
    this.connectionManager = connectionManager;
    this.creatingConnection = false;
    this.startGuiPin = null;
    this.startX = null;
    this.startY = null;
  }

  display() {
    this.connectionManager.display(this.p, this.p.windowWidth - 300, 50);
    if (this.creatingConnection) {
      this.p.push();
      this.p.stroke(0);
      this.p.strokeWeight(2);
      this.p.line(this.startX, this.startY, this.p.mouseX, this.p.mouseY);
      this.p.pop();
    }

    const guiPins = this.guiManager.getAllPinsWithLocations();
    const connections = this.connectionManager.getConnections();
    // console.log(connections);
    //console.log(guiPins);
    // The problem is that the pins are changing when the userFunctions
    // are modified, which leads to the pins not being found below.
    for (const connection of connections) {
      const [_startPin, startX, startY] = guiPins.find(
        ([guiPin, _x, _y]) => guiPin.pin === connection.outputPin
      );
      const [_endPin, endX, endY] = guiPins.find(
        ([guiPin, _x, _y]) => guiPin.pin === connection.inputPin
      );
      this.p.push();
      this.p.stroke(100);
      this.p.strokeWeight(2);
      this.p.line(startX + 7, startY + 7, endX, endY);
      this.p.pop();
    }
  }

  handleMousePressed() {
    if (!this.creatingConnection) {
      const selectedPin = this.guiManager.getHoveredPin();
      if (selectedPin && selectedPin.pin instanceof VsOutputPin) {
        this.creatingConnection = true;
        this.startGuiPin = selectedPin;
        this.startGuiPin.isConnected = false;
        this.startX = this.p.mouseX;
        this.startY = this.p.mouseY;
      } else {
        this.creatingConnection = false;
      }
    }
  }

  removeConnections(connections) {
    this.connectionManager.removeConnections(connections);
  }

  handleMouseDragged() {}

  handleMouseReleased() {
    if (this.creatingConnection) {
      const endGuiPin = this.guiManager.getHoveredPin();
      if (
        endGuiPin &&
        endGuiPin.pin instanceof VsInputPin &&
        this.connectionManager.connectionIsValid(
          this.startGuiPin.pin,
          endGuiPin.pin
        )
      ) {
        console.log("Making Connection");
        this.connectionManager.addConnection(
          this.startGuiPin.pin,
          endGuiPin.pin
        );
        this.startGuiPin.isConnected = true;
        endGuiPin.isConnected = true;
      } else {
        console.log("Invalid Connection");
      }
    }
    this.creatingConnection = false;
  }
}
