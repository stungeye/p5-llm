import GuiControllerConstant from "./gui-controller-constant";

const VsGuiControllerTypes = Object.freeze({
  UserFunction: (p) => {
    return {};
  },
  Constant: (p) => new GuiControllerConstant(p),
});

export default VsGuiControllerTypes;
