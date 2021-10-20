import { DefineConfig } from "../../interface/configs.interface";

export default (h, conf: DefineConfig) => {
  console.log(conf.__slot__.prepend);

  return {
    prepend: () => {
      return <div>{conf.__slot__.prepend}</div>;
    },
    append: () => {
      return <div>{conf.__slot__.append}</div>;
    },
  };
};
