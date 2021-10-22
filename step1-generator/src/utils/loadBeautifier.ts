import { pluginsConfig } from "./pluginsConfig";
import * as ElementPlus from "element-plus";
import loadScript from './loadScript'

let beautifierObj;
export default function loadBeautifier(cb) {
  const { beautifierUrl } = pluginsConfig;
  if (beautifierObj) {
    cb(beautifierObj);
    return;
  }

  const loading = ElementPlus.ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "格式化资源加载中",
    spinner: "el-icon-loading",
    background: "rgba(255, 255, 255, 0.5)",
  });
  loadScript(beautifierUrl, () => {
    loading.close();
    beautifierObj = beautifier;
    cb(beautifierObj);
  });
}
