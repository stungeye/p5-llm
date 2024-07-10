export default class GuiManager {
  constructor(p) {
    this.p = p;
    this.windows = [];
  }

  addWindow(window) {
    this.windows.push(window);
  }

  displayWindows() {
    this.windows.forEach((window) => window.display());
  }

  handleMousePressed() {
    this.windows.forEach((window) => window.handleMousePressed());
  }
}
