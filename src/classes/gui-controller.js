export default class GuiController {
  constructor() {}

  // Method to be overridden by child classes for specific functionalities
  execute() {}

  display(p, x, y, width, height) {
    p.push();
    p.fill("#FF0000");
    p.rect(x, y, width, height);
    p.pop();
  }
}
