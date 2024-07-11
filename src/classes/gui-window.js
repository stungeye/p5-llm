/*
    A GUI Window class that can be used to create a window with a title bar.
    The title can be changed by clicking on it and filling out a text field.
    Objects of type GuiWindow can be added to a GuiManager object, which will
    keep them in an array and render them in the correct order.

    GUI Windows will have to ability to change their position in the GuiManager's
    array using a dropbox that displays their position in the array.
    
    The functionality of the GUI Window will be handled by objects that are children
    of a GuiWindowController class. This class will have methods that can be called
    by the GuiWindow object to handle the window's functionality.

    GuiWindow objects will be used as part of a visual scripting system that will
    allow users to create a pipeline of ai/llm operations that can be executed
    in sequence. All of this functionality will be handled by the GuiWindowController.
*/
import GuiWindowTitleBar from "./gui-window-titlebar";
import GuiButton from "./gui-button";
import GuiRectangle from "./gui-rectangle";
import Config from "./config";

export default class GuiWindow {
  constructor(p, x, y, width, height, title, controller, manager) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controller = controller;
    this.manager = manager;

    this.isTitleEditing = false;
    this.input = null;
    this.titleBar = new GuiWindowTitleBar(
      p,
      x,
      y,
      width,
      35,
      p.color(200),
      title,
      15,
      () => {
        if (
          confirm(
            `Are you sure you want to destroy the "${this.titleBar.getTitle()}" window?`
          )
        ) {
          this.manager.removeWindow(this);
        }
      },
      () => {
        this.titleBar.move(p.mouseX, p.mouseY, this);
      }
    );
    this.resizeButton = new GuiButton(
      p,
      new GuiRectangle(
        p,
        x + width - 10,
        y + height - 10,
        10,
        10,
        Config.colors.moveButton
      ),
      "",
      0,
      null,
      null,
      () => this.resizeWindow()
    );
  }

  display() {
    this.p.push();
    this.p.fill(240);
    this.p.rect(this.x, this.y, this.width, this.height);
    this.titleBar.display();
    this.resizeButton.display();
    /*
    this.controller.display(
      this.p,
      this.x,
      this.y + 35,
      this.width,
      this.height - 35
    );*/
    this.p.pop();
  }

  moveDelta(deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
    this.resizeButton.moveDelta(deltaX, deltaY);
  }

  resizeWindow() {
    let deltaX = this.p.movedX;
    let deltaY = this.p.movedY;
    let newWidth = this.width + deltaX;
    let newHeight = this.height + deltaY;

    if (newWidth > 150) {
      this.width = newWidth;
      this.titleBar.width = this.width;
      this.resizeButton.moveDelta(deltaX, 0);
    }

    if (newHeight > 100) {
      this.height = newHeight;
      this.resizeButton.moveDelta(0, deltaY);
    }
  }

  handleMousePressed() {
    this.titleBar.handleMousePressed();
    this.resizeButton.handleMousePressed();
  }

  handleMouseDragged() {
    this.titleBar.handleMouseDragged();
    this.resizeButton.handleMouseDragged();
  }

  handleMouseReleased() {
    this.titleBar.handleMouseReleased();
    this.resizeButton.handleMouseReleased();
  }
}
