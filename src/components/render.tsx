import { defineComponent, h, PropType, resolveComponent, defineEmits } from "vue-demi";
import { DefineConfig } from "../interface/configs.interface";
const emits = defineEmits(["value"]);
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
    // 插槽处理
    let children: any = {};
    const slotsFn = componentChild[conf.__config__.tag];
    slotsFn && (children = slotsFn(h, conf)); //产出对应插槽
    for (const key in children) {
      if (!conf.__slot__[key]) {
        delete children[key];
      }
    }

    let dataObject = makeDataObject();
    buildDataObject(conf, dataObject); //快速合并数据
    return () => {
      console.log(dataObject, children);
      return h(resolveComponent(props.conf?.__config__?.tag), dataObject, children);
    };
  },
});
// https://v3.cn.vuejs.org/guide/migration/render-function-api.html#vnode-prop-格式化
function makeDataObject() {
  return {
    class: [],
    style: [],
  };
}

function buildDataObject(conf: DefineConfig, dataObject) {
  Object.keys(conf).forEach((key) => {
    const val = conf[key];
    if (key === "__vModel__") {
      dataObject.props.value = conf.__config__.defaultValue;
      dataObject.on.input = (value: any) => emits("value", value); //绑定input
      return;
    } else if (["class", "style"].includes(key)) {
      dataObject[key].push(val);
    } else {
      // 所有没有定义的属性，全部放入attrs中
      dataObject[key] = val;
    }
  });
}
