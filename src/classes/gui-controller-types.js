import GuiControllerConstant from "./gui-controller-constant";
import GuiControllerUserFunction from "./gui-controller-user-function";

const VsGuiControllerTypes = Object.freeze({
  UserFunction: {
    height: 300,
    width: 335,
    factory: (p, connectionManager) =>
      new GuiControllerUserFunction(p, connectionManager),
  },
  Constant: {
    height: 150,
    width: 200,
    factory: (p, connectionManager) =>
      new GuiControllerConstant(p, connectionManager),
  },
});

export default VsGuiControllerTypes;
