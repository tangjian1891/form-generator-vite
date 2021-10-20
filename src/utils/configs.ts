import { DefineConfig } from "../interface/configs.interface";

export const configs: DefineConfig[] = [
  {
    __config__: {
      tag: "el-button",
      label: "按钮",
    },
    __slot__: {
      default: "主要按钮",
    },
    type: "primary",
    icon: "el-icon-search",
    round: false,
    size: "medium",
    plain: false,
    circle: false,
    disabled: false,
  },
  {
    // 组件的自定义配置
    __config__: {
      label: "单行文本",
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: "el-input",
      tagIcon: "input",
      defaultValue: null,
      required: true,
      layout: "colFormItem",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      // 正则校验规则
      regList: [],
    },
    // 组件的插槽属性
    __slot__: {
      prepend: "电话号码",
      append: "感谢提醒",
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    "prefix-icon": "",
    "suffix-icon": "",
    maxlength: null,
    "show-word-limit": false,
    readonly: false,
    disabled: false,
  },
];
