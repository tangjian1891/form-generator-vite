import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus, { dividerProps } from "element-plus";
import "element-plus/dist/index.css";

const $previewApp: any = document.getElementById("previewApp");

// window.addEventListener("message", init, false);

const childAttrs = {
  file: "",
  dialog: ' width="600px" class="dialog-width" v-if="visible" :visible.sync="visible" :modal-append-to-body="false" ',
};

 
 
const app = createApp(App);
app.use(ElementPlus);

app.mount("#app");
