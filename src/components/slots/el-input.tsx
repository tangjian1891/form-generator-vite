import { DefineConfig } from "../../interface/configs.interface";

export default (h, conf: DefineConfig) => {

  return {
    prepend: () => {
      return <div>{conf.__slot__.prepend}</div>;
    },
    append: () => {
      return <div>{conf.__slot__.append}</div>;
    },
  };
};
