import GuiButtonColors from "./gui-button-colors";
import { VsPinTypes } from "./vs-pin-types";

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
    [VsPinTypes.Number]: new GuiButtonColors(
      "#1E90FF", // defaultStroke (dodger blue)
      "#87CEFA", // defaultFill (light sky blue)
      "#4682B4", // hoverStroke (steel blue)
      "#B0E0E6", // hoverFill (powder blue)
      "#1C86EE", // pressedStroke (dodger blue 2)
      "#5F9EA0" // pressedFill (cadet blue)
    ),
    [VsPinTypes.String]: new GuiButtonColors(
      "#FF69B4", // defaultStroke (hot pink)
      "#FFB6C1", // defaultFill (light pink)
      "#FF1493", // hoverStroke (deep pink)
      "#FFC0CB", // hoverFill (pink)
      "#DB7093", // pressedStroke (pale violet red)
      "#FF69B4" // pressedFill (hot pink)
    ),
    [VsPinTypes.Boolean]: new GuiButtonColors(
      "#32CD32", // defaultStroke (lime green)
      "#98FB98", // defaultFill (pale green)
      "#00FF00", // hoverStroke (lime)
      "#90EE90", // hoverFill (light green)
      "#228B22", // pressedStroke (forest green)
      "#32CD32" // pressedFill (lime green)
    ),
    [VsPinTypes.Object]: new GuiButtonColors(
      "#8A2BE2", // defaultStroke (blue violet)
      "#DDA0DD", // defaultFill (plum)
      "#9400D3", // hoverStroke (dark violet)
      "#DA70D6", // hoverFill (orchid)
      "#8B008B", // pressedStroke (dark magenta)
      "#DDA0DD" // pressedFill (plum)
    ),
    [VsPinTypes.Function]: new GuiButtonColors(
      "#FFD700", // defaultStroke (gold)
      "#FFFACD", // defaultFill (lemon chiffon)
      "#FFA500", // hoverStroke (orange)
      "#FFEFD5", // hoverFill (papaya whip)
      "#FF8C00", // pressedStroke (dark orange)
      "#FFD700" // pressedFill (gold)
    ),
  },
};

export default Config;
