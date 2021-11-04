import { defineComponent, h, PropType, resolveComponent, defineEmits, computed, ref } from "vue-demi";
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
    const value = ref("");

    const renderAttrs = computed(() => {
      let dataObject = makeDataObject();
      console.log("每次都变化吗");
      Object.keys(conf).forEach((key) => {
        const val = conf[key];
        if (key === "__vModel__") {
          dataObject.props.value = conf.__config__.defaultValue;
          dataObject.on.input = (value: any) => emits("value", value); //绑定input
          return;
        } else if (["class", "style"].includes(key)) {
          console.log(dataObject, dataObject[key]);
          dataObject[key].push(val);
        } else {
          // 所有没有定义的属性，全部放入attrs中
          dataObject[key] = val;
        }
      });

      dataObject["modelValue"] = dataObject.__config__.defaultValue
      dataObject["onUpdate:modelValue"] = function (e) {
        dataObject.__config__.defaultValue = e;
        // renderAttrs['modelValue']=dataObject.__config__.defaultValue
      };
      // dataObject["v-model"] = value;
      // dataObject["onUpdate:modelValue"] = function (e) {
      //   value.value = e;
      // };
      return dataObject;
    });
    console.log(renderAttrs);
    return () => {
      return h(resolveComponent(props.conf?.__config__?.tag), renderAttrs.value, children);
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
