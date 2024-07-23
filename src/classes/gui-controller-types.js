import GuiControllerConstant from "./gui-controller-constant";
import GuiControllerUserFunction from "./gui-controller-user-function";

const VsGuiControllerTypes = Object.freeze({
  UserFunction: (p, connectionManager) =>
    new GuiControllerUserFunction(p, connectionManager),
  Constant: (p, connectionManager) =>
    new GuiControllerConstant(p, connectionManager),
});

export default VsGuiControllerTypes;
