import GuiControllerConstant from "./gui-controller-constant";
import GuiControllerUserFunction from "./gui-controller-user-function";
import GuiControllerLlmFunction from "./gui-controller-llm-function";

const VsGuiControllerTypes = Object.freeze({
  UserFunction: {
    height: 300,
    width: 335,
    factory: (p, connectionManager) =>
      new GuiControllerUserFunction(p, connectionManager),
  },
  LLMFunction: {
    height: 260,
    width: 450,
    factory: (p, connectionManager) =>
      new GuiControllerLlmFunction(p, connectionManager),
  },
  Constant: {
    height: 150,
    width: 200,
    factory: (p, connectionManager) =>
      new GuiControllerConstant(p, connectionManager),
  },
});

export default VsGuiControllerTypes;
