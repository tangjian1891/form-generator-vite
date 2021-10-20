import { defineComponent, h, PropType, resolveComponent } from "vue-demi";
import { DefineConfig } from "../interface/configs.interface";
const modules = import.meta.globEager("./slots/*.tsx");

let componentChild = {};
Object.keys(modules).forEach((key) => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, "$1").replace("slots/", "");
  const value = modules[key];
  componentChild[tag] = value.default;
});
console.log(componentChild);

export default defineComponent({
  name: "render",
  props: {
    conf: {
      type: Object as PropType<DefineConfig>,
      required: true,
    },
  },
  // context :attrs emit expost slots
  setup(props, context) {
    const conf: DefineConfig = props.conf;
    let children: any = {};  
    const slotsFn = componentChild[conf.__config__.tag];
    children = slotsFn(h, conf); //产出对应插槽
    return () => {
      // return h(targetComp, props.conf, children);
      return h(resolveComponent(props.conf?.__config__?.tag), props.conf, children);
    };
  },
});
