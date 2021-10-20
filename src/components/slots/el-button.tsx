import { DefineConfig } from "../../interface/configs.interface";

export default (h, conf: DefineConfig) => {
  return function () {
    return conf.__slot__.default;
  };
};
