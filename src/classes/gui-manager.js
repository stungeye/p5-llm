export default class GuiManager {
  constructor(p) {
    this.p = p;
    this.windows = [];
  }

  addWindow(window) {
    this.windows.push(window);
  }

  removeWindow(window) {
    this.windows = this.windows.filter((w) => w !== window);
  }

  displayWindows() {
    this.windows.forEach((window) => window.display());
  }

  handleMousePressed() {
    this.windows.forEach((window) => window.handleMousePressed());
  }

  handleMouseDragged() {
    this.windows.forEach((window) => window.handleMouseDragged());
  }

  handleMouseReleased() {
    this.windows.forEach((window) => window.handleMouseReleased());
  }
}
