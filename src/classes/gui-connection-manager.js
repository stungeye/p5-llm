export default class GuiConnectionManager {
  constructor(p, connectionManager) {
    this.p = p;
    this.connectionManager = connectionManager;
    this.guiPins = [];
    this.connections = [];
  }

  display() {
    this.connectionManager.display(this.p, this.p.width - 200, 50);
  }
}
