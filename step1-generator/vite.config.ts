import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import monacoEditorNlsPlugin, { Languages, esbuildPluginMonacoEditorNls } from "rollup-plugin-monaco-editor-nls";
const is_dev = process.env.NODE_ENV === "development";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}), !is_dev && monacoEditorNlsPlugin({ locale: Languages.zh_hans })],
  server: {
    port: 4999,
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildPluginMonacoEditorNls({ locale: Languages.zh_hans })],
    },
  },
});
