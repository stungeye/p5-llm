export default class GuiController {
  constructor(p, connectionManager) {
    this.p = p;
    this.parentWindow = null;
    this.connectionManager = connectionManager;
  }

  // Method to be overridden by child classes for specific functionalities
  execute() {}

  setParentWindow(window) {
    this.parentWindow = window;
  }

  display() {}

  destroy() {}
}
