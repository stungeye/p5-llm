import p5 from "p5";
import GuiManager from "./classes/gui-manager";
import GuiControllerSelector from "./classes/gui-controller-selector";
import GuiWindow from "./classes/gui-window";
import GuiConnectionManager from "./classes/gui-connection-manager";
import VsConnectionManager from "./classes/vs-connection-manager";
//import testFunction from "./test";

const sketch = (p) => {
  let guiManager;
  let guiConnectionManager;
  let connectionManager;
  let playButton;

  p.setup = () => {
    //testFunction();
    p.createCanvas(p.windowWidth * 2, p.windowHeight * 2);

    guiManager = new GuiManager(p);
    connectionManager = new VsConnectionManager();
    guiConnectionManager = new GuiConnectionManager(
      p,
      guiManager,
      connectionManager
    );

    playButton = p.createButton("Play");
    playButton.position(30, 19);
    playButton.mousePressed(() => {
      connectionManager.execute();
    });

    // Add some windows with different controllers

    guiManager.addWindow(
      new GuiWindow(
        p,
        30,
        50,
        200,
        150,
        "Create Windows",
        new GuiControllerSelector(p, guiConnectionManager),
        guiManager
      )
    );
  };

  p.draw = () => {
    p.background(220);
    guiConnectionManager.display();
    guiManager.displayWindows();
  };

  p.mousePressed = () => {
    guiManager.handleMousePressed();
    guiConnectionManager.handleMousePressed();
  };

  p.mouseDragged = () => {
    guiManager.handleMouseDragged();
    guiConnectionManager.handleMouseDragged();
  };

  p.mouseReleased = () => {
    guiManager.handleMouseReleased();
    guiConnectionManager.handleMouseReleased();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth * 2, p.windowHeight * 2);
  };
};

new p5(sketch);
