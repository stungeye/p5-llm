import GuiButtonColors from "./gui-button-colors";

const Config = {
  colors: {
    closeButton: new GuiButtonColors(
      "#8B0000", // defaultStroke (dark red)
      "#FFCCCB", // defaultFill (light pastel red)
      "#FF0000", // hoverStroke (bright red)
      "#FFB6C1", // hoverFill (lighter pastel red)
      "#8B0000", // pressedStroke (dark red)
      "#FF9999" // pressedFill (slightly darker pastel red)
    ),
    moveButton: new GuiButtonColors(
      "#00008B", // defaultStroke (dark blue)
      "#ADD8E6", // defaultFill (light blue)
      "#0000FF", // hoverStroke (bright blue)
      "#87CEEB", // hoverFill (sky blue)
      "#00008B", // pressedStroke (dark blue)
      "#6495ED" // pressedFill (cornflower blue)
    ),
    invisibleButton: new GuiButtonColors(null, null, null, null, null, null), // where all colors are null
  },
};

export default Config;
