import GuiController from "./gui-controller";
import GuiControllerTypes from "./gui-controller-types";
import GuiWindow from "./gui-window";

export default class GuiControllerSelector extends GuiController {
  constructor(p, connectionManager) {
    super(p, connectionManager);
    this.select = this.p.createSelect();
    Object.keys(GuiControllerTypes).forEach((key) => {
      this.select.option(key);
    });
    // create html button
    this.newWindowButton = this.p.createButton("New Window");

    // add event listener to button
    this.newWindowButton.mousePressed(() => this.createNewWindow());
  }

  createNewWindow() {
    console.log(
      "Creating new window with controller type:",
      this.select.value()
    );

    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    // A new window directly below the current window
    const newController = GuiControllerTypes[this.select.value()](this.p);
    this.parentWindow.guiManager.addWindow(
      new GuiWindow(
        this.p,
        x,
        y + height + 10,
        200,
        150,
        "Constant",
        newController,
        this.parentWindow.guiManager
      )
    );
  }

  display() {
    const [x, y, width, height] =
      this.parentWindow.getControllerWindowDimensions();
    this.p.push();
    this.p.fill(200);
    this.p.rect(x, y, width, height);
    this.p.pop();

    this.select.position(x + 20, y + 20);
    // display new window button
    this.newWindowButton.position(x + 20, y + 60);
  }

  destroy() {
    this.select.remove();
    this.newWindowButton.remove();
  }
}
