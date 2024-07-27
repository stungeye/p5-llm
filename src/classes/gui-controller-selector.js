import GuiController from "./gui-controller";
import GuiControllerTypes from "./gui-controller-types";

export default class GuiControllerSelector extends GuiController {
  constructor(p, guiConnectionManager) {
    super(p, guiConnectionManager);
    this.select = this.p.createSelect();
    Object.keys(GuiControllerTypes).forEach((key) => {
      this.select.option(key);
    });
    // create html button
    this.newWindowButton = this.p.createButton("New Window");

    // add event listener to button
    this.newWindowButton.mousePressed(() =>
      this.createNewWindow(
        GuiControllerTypes[this.select.value()],
        this.select.value()
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
