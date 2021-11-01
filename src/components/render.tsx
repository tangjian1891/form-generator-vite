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
    const dataObject = makeDataObject();
    let children: any = {};
    const slotsFn = componentChild[conf.__config__.tag];
    slotsFn && (children = slotsFn(h, conf)); //产出对应插槽

    buildDataObject(conf, dataObject);
    return () => {
      console.log(props.conf);
      return h(resolveComponent(props.conf?.__config__?.tag), dataObject, children);
    };
  },
});

function makeDataObject() {
  return {
    class: {},
    style: {},
    attrs: {},
    props: {},
    domProps: {},
    on: {},
    nativeOn: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true,
  };
}

function buildDataObject(conf: DefineConfig, dataObject) {
  Object.keys(conf).forEach((key) => {
    const val = conf[key];
    if (key === "__vModel__") {
      dataObject.props.value = conf.__config__.defaultValue;
      dataObject.on.input = (value: any) => emits("value", value); //绑定input
      return;
    }
    // dataObject上是否有手动定义这个属性
    if (dataObject[key] !== undefined) {
      if (
        dataObject[key] === null ||
        dataObject[key] instanceof RegExp ||
        ["boolean", "string", "number", "function"].includes(typeof dataObject[key])
      ) {
        dataObject[key] = val; //null 正则 基本类型 +函数 属性直接赋值
      } else if (Array.isArray(dataObject[key])) {
        dataObject[key] = [...dataObject[key], ...val]; //合并数组
      } else {
        // 剩下的就是纯对象
        dataObject[key] = { ...dataObject[key], ...val }; //合并对象
      }
    } else {
      // 所有没有定义的属性，全部放入attrs中
      dataObject.attrs[key] = val;
    }
  });
}
