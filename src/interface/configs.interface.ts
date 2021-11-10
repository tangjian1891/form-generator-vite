export interface DefineConfig {
  __config__: Config;
  __slot__?: Slot;
  data?: object;
  directives?: object;
  border?: boolean;
  placeholder?: string;
  style?: Style;
  clearable?: boolean;
  "prefix-icon"?: string;
  "suffix-icon"?: string;
  maxlength?: null;
  "show-word-limit"?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  justify?: string;
  type?: string;
  icon?: string;
  round?: boolean;
  plain?: boolean;
  circle?: boolean;
  size?: string;
  align?: string;
}

export interface Config {
  label?: string;
  layoutTree?: boolean;
  labelWidth?: null;
  showLabel?: boolean;
  changeTag?: boolean;
  tag?: string;
  formId?: number;
  renderKey?: number;
  componentName?: string;
  dataType?: string;
  method?: string;
  tagIcon?: string;
  dataConsumer?: string;
  dataPath?: string;
  url?: string;
  defaultValue?: any;
  required?: boolean;
  layout?: string;
  span?: number;
  document?: string;
  regList?: any[];
  children?: object;
}

export interface Slot {
  prepend?: string;
  append?: string;
  default?: string;
}

export interface Style {
  width?: string;
}
