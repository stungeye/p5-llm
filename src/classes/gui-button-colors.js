export default class GuiButtonColors {
  // constructor that takes in color values for all button states
  // (default, hover, pressed) for both stroke and fill.
  constructor(
    defaultStroke,
    defaultFill,
    hoverStroke,
    hoverFill,
    pressedStroke,
    pressedFill
  ) {
    this.defaultStroke = defaultStroke;
    this.defaultFill = defaultFill;
    this.hoverStroke = hoverStroke;
    this.hoverFill = hoverFill;
    this.pressedStroke = pressedStroke;
    this.pressedFill = pressedFill;
  }

  setColors(p, isHovered, isPressed) {
    if (isPressed) {
      if (this.pressedStroke) {
        p.stroke(this.pressedStroke);
      } else {
        p.noStroke();
      }

      if (this.pressedFill) {
        p.fill(this.pressedFill);
      } else {
        p.noFill();
      }
    } else if (isHovered) {
      if (this.hoverStroke) {
        p.stroke(this.hoverStroke);
      } else {
        p.noStroke();
      }

      if (this.hoverFill) {
        p.fill(this.hoverFill);
      } else {
        p.noFill();
      }
    } else {
      if (this.defaultStroke) {
        p.stroke(this.defaultStroke);
      } else {
        p.noStroke();
      }

      if (this.defaultFill) {
        p.fill(this.defaultFill);
      } else {
        p.noFill();
      }
    }
  }
}
