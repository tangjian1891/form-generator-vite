import { createApp } from "vue";
import App from "./App.vue";
import { loadScriptQueue } from "./utils/loadScript";
import ElementPlus, { dividerProps } from "element-plus";
import "element-plus/dist/index.css";

const $previewApp: any = document.getElementById("previewApp");

// window.addEventListener("message", init, false);

const childAttrs = {
  file: "",
  dialog: ' width="600px" class="dialog-width" v-if="visible" :visible.sync="visible" :modal-append-to-body="false" ',
};

function init(event) {
  console.log(event.data);
  
  if (event.data.type === "refreshFrame") {
    console.log('进入触发了',event.data);
    const code = event.data.data;
    const attrs = childAttrs[code.generateConf.type];
    let links = "";
    if (Array.isArray(code.links) && code.links.length > 0) {
      links = buildLinks(code.links);
    }
    $previewApp.innerHTML = `${links}<style>${code.css}</style><div id="app"></div>`;

    if (Array.isArray(code.scripts) && code.scripts.length > 0) {
      loadScriptQueue(code.scripts, () => {
        newVue(attrs, code.js, code.html);
      });
    } else {
      newVue(attrs, code.js, code.html);
    }
  }
}

function newVue(attrs, main, html) {
  main = eval(`(${main})`);
  main.template = `<div>${html}</div>`;
  createApp({
    data() {
      return {
        visible: true,
      };
    },
    computed: { child: main },
  }).mount("#app");
}

function buildLinks(links) {
  let strs = "";
  links.forEach((url) => {
    strs += `<link href="${url}" rel="stylesheet">`;
  });
  return strs;
}

const app = createApp(App);
app.use(ElementPlus);

app.mount("#app");
