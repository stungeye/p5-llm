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

  indexOfWindow(window) {
    return this.windows.indexOf(window);
  }

  moveWindowToTop(window) {
    if (this.windows[this.windows.length - 1] === window) return;
    this.removeWindow(window);
    this.addWindow(window);
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
