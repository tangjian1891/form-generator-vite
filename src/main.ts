import { createApp } from "vue";
import App from "./App.vue";
const components: any = import.meta.globEager("./components/{a,}/**/*.vue");
import draggable from "vuedraggable";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
console.log(components);
const app = createApp(App);
for (const key in components) {
  const component = components[key].default;
  console.log(component);
  app.component(component.name, component);
}
app.component("draggable", draggable);

app.use(ElementPlus);

app.mount("#app");
