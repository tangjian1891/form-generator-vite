export interface DefineConfig {
  __config__: Config;
  __slot__: Slot;
  placeholder?: string;
  style?: Style;
  clearable?: boolean;
  "prefix-icon"?: string;
  "suffix-icon"?: string;
  maxlength?: null;
  "show-word-limit"?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  type?: string;
  icon?: string;
  round?: boolean;
  plain?: boolean;
  circle?: boolean;
  size?: string;
}

export interface Config {
  label?: string;
  labelWidth?: null;
  showLabel?: boolean;
  changeTag?: boolean;
  tag: string;
  tagIcon?: string;
  defaultValue?: null;
  required?: boolean;
  layout?: string;
  span?: number;
  document?: string;
  regList?: any[];
}

export interface Slot {
  prepend?: string;
  append?: string;
  default?: string;
}

export interface Style {
  width?: string;
}
