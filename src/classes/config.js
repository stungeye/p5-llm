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
    invisibleButton: new GuiButtonColors(null, null, null, null, null, null), // where all colors are null
  },
};

export default Config;
