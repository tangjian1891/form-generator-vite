import { createApp } from "vue";
import App from "./App.vue";
const components: any = import.meta.globEager("./components/{a,}/**/*.vue");
import draggable from "vuedraggable";
console.log(components);
const app = createApp(App);
for (const key in components) {
  const component = components[key].default;
  console.log(component);
  app.component(component.name, component);
}
app.component('draggable',draggable)

app.mount("#app");
