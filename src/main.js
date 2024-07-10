import p5 from "p5";
import GuiManager from "./classes/gui-manager";
import GuiController from "./classes/gui-controller";
import GuiWindow from "./classes/gui-window";

const sketch = (p) => {
  let guiManager;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    guiManager = new GuiManager(p);

    // Add some windows with different controllers
    guiManager.addWindow(
      new GuiWindow(
        p,
        30,
        50,
        200,
        150,
        "Window 1",
        new GuiController(),
        guiManager
      )
    );
    guiManager.addWindow(
      new GuiWindow(
        p,
        240,
        50,
        200,
        150,
        "Window 2",
        new GuiController(),
        guiManager
      )
    );
    guiManager.addWindow(
      new GuiWindow(
        p,
        450,
        50,
        200,
        150,
        "Window 3",
        new GuiController(),
        guiManager
      )
    );
  };

  p.draw = () => {
    p.background(220);
    guiManager.displayWindows();
  };

  p.mousePressed = () => {
    guiManager.handleMousePressed();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);
