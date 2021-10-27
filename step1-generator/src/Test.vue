<template>
  <div style="height: 100%">
    <el-row>
      <!-- 左侧编辑区域 -->
      <el-col :span="12">
        <div class="setting" title="资源引用" @click="showResource">
          <el-badge :is-dot="!!resources.length" class="item">
            <i class="el-icon-setting" />
          </el-badge>
        </div>
        <el-tabs v-model="activeTab" type="card" class="editor-tabs">
          <el-tab-pane name="html">
            <template #label>
              <span>
                <i v-if="activeTab === 'html'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                template
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="js">
            <template #label>
              <span>
                <i v-if="activeTab === 'js'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                script
              </span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="css">
            <template #label>
              <span>
                <i v-if="activeTab === 'css'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                css
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <div v-show="activeTab === 'html'" id="editorHtml" class="tab-editor" />
        <div v-show="activeTab === 'js'" id="editorJs" class="tab-editor" />
        <div v-show="activeTab === 'css'" id="editorCss" class="tab-editor" />
      </el-col>

      <!-- 右侧预览区域 -->
      <el-col :span="12" class="right-preview">
        <div class="action-bar" :style="{ 'text-align': 'left' }">
          <span class="bar-btn" @click="runCode">
            <i class="el-icon-refresh" />
            刷新
          </span>
          <!-- <span class="bar-btn" @click="exportFile">
            <i class="el-icon-download" />
            导出vue文件
          </span> -->
          <span ref="copyBtn" class="bar-btn copy-btn">
            <i class="el-icon-document-copy" />
            复制代码
          </span>
          <span class="bar-btn delete-btn" @click="$emit('update:visible', false)">
            <i class="el-icon-circle-close" />
            关闭
          </span>
        </div>
        <iframe ref="previewPageRef" class="result-wrapper" frameborder="0" src="preview.html" @load="iframeLoad" />
        <!-- <div v-show="!isIframeLoaded" v-loading="true" class="result-wrapper" /> -->
      </el-col>
    </el-row>
    <button @click="foo">点击触发</button>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, toRaw } from "vue-demi";
import { parse } from "@babel/parser";
import { makeUpHtml } from "./utils/generator/html"; //根据数据生成对应的html代码
import { makeUpJs } from "./utils/generator/js";
import { EXPORT_DEFAULT, beautifierConf } from "./utils/util";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import * as beautifier from "js-beautify";
self.MonacoEnvironment = {
  getWorker(_: any, label: any) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

// import './index.css';
const editorObj: any = {
  html: null,
  js: null,
  css: null,
};
const mode = {
  html: "html",
  js: "javascript",
  css: "css",
};

const formData = reactive({
  fields: [
    {
      __config__: {
        label: "单行文本",
        labelWidth: null,
        showLabel: true,
        changeTag: true,
        tag: "el-input",
        tagIcon: "input",
        required: true,
        layout: "colFormItem",
        span: 24,
        document: "https://element.eleme.cn/#/zh-CN/component/input",
        regList: [{ pattern: "/^1(3|4|5|7|8|9)\\d{9}$/", message: "手机号格式错误" }],
      },
      __slot__: { prepend: "", append: "" },
      __vModel__: "mobile",
      placeholder: "6866765765",
      style: { width: "100%" },
      clearable: true,
      // "prefix-icon": "el-icon-mobile",
      "prefix-icon": "",
      "suffix-icon": "",
      maxlength: 11,
      "show-word-limit": true,
      readonly: false,
      disabled: false,
    },
  ],
  formRef: "elForm",
  formModel: "formData",
  size: "medium",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true,
});
const resourceVisible = ref(false);
const activeTab = ref("html");
const previewPageRef: any = ref(null);
const isIframeLoaded = ref(false);
const isInitcode = ref(false);
const isRefreshCode = ref(false);
const htmlCode = ref("");
const cssCode = ref("");
const jsCode = ref("");
const generateConf = reactive({ fileName: "", type: "file" });
const scripts = reactive([]);
const links = reactive([]);
let htmlEditor: any;
let jsEditor: any;
let cssEditor: any;
const resources = computed(() => scripts.concat(links));

onMounted(async () => {
  const { type } = generateConf;
  const htmlCodeStr = makeUpHtml(formData, type);
  const jsCodeStr = makeUpJs(formData, type);
  console.log(htmlCode);

  // 加载脚本
  htmlCode.value = beautifier.html(htmlCodeStr, beautifierConf.html);
  jsCode.value = beautifier.js(jsCodeStr, beautifierConf.js);
  // await setEditorValue("editorHtml", "html", htmlCode.value);
  htmlEditor = monaco.editor.create(document.querySelector("#editorHtml") as HTMLElement, {
    value: htmlCode.value,
    theme: "vs-dark",
    language: "html",
    automaticLayout: true,
  });
  console.log(htmlEditor);
  htmlEditor.onKeyDown((e) => {
    if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
      console.log("重新运行一下");
      // runCode();
      e.preventDefault();
    }
  });

  // console.log(jsCode.value);
  jsEditor = monaco.editor.create(document.querySelector("#editorJs") as HTMLElement, {
    value: jsCode.value,
    theme: "vs-dark",
    language: "javascript",
    automaticLayout: true,
  });

  console.log(jsEditor);
  cssEditor = monaco.editor.create(document.querySelector("#editorCss") as HTMLElement, {
    value: ".body{color:red;}",
    theme: "vs-dark",
    language: "css",
    automaticLayout: true,
  });

  runCode();
  // await setEditorValue("editorJs", "js", jsCode.value);
  // this.setEditorValue("editorCss", "css", this.cssCode);
  // if (!isInitcode.value) {
  //   console.log("zhixingl ");
  //   isRefreshCode.value = true;
  //   console.log(isIframeLoaded.value);

  //   // if (isIframeLoaded.value) {
  //   isInitcode.value = true;
  //   // runCode();
  //   // }
  // }
});

function showResource() {
  resourceVisible.value = true;
}

async function setEditorValue(id, type, codeStr) {
  console.log(monaco, monaco.editor);
  if (editorObj[type]) {
    await editorObj[type].setValue(codeStr);
  } else {
    const dom = document.getElementById(id);
    console.log(dom);
    editorObj[type] = await monaco.editor.create(dom, {
      value: codeStr,
      theme: "vs-dark",
      language: mode[type],
      automaticLayout: true,
    });
  }
  // // ctrl + s 刷新
  editorObj[type].onKeyDown((e) => {
    if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
      console.log("重新运行一下");
      // runCode();
    }
  });
}

async function runCode() {
  // debugger
  const jsCodeStr = jsEditor.getValue();
  console.log(jsCodeStr);
  try {
    const ast = parse(jsCodeStr, { sourceType: "module" });
    console.log(ast);
    const astBody = ast.program.body;
    if (astBody.length > 1) {
      alert("js格式不能识别，仅支持修改export和default的对象内容");
      return;
    }
    if (astBody[0].type === "ExportDefaultDeclaration") {
      const postData = {
        type: "refreshFrame",
        data: {
          generateConf: toRaw(generateConf),
          // generateConf:{name:123},
          html: editorObj.html.getValue(),
          js: jsCodeStr.replace(EXPORT_DEFAULT, ""),
          // css: editorObj.css.getValue(),
          css: "123",
          scripts: toRaw(scripts),
          links: toRaw(links),
        },
      };
      console.log("执行了鼎是");

      setTimeout(() => {
        previewPageRef.value.contentWindow.postMessage(postData, location.origin);
        console.log("执行一下");

        // previewPageRef.value.contentWindow.postMessage("1231313");
        // previewPageRef.value.contentWindow.postMessage("1234");
      }, 2000);
    } else {
      console.error("请使用export和default");
    }
  } catch (error) {
    console.error(error);
    console.error(error);
  }
}

function foo() {
  console.log(previewPageRef.value);

  previewPageRef.value.contentWindow.postMessage("1231313");

  // previewPageRef.value.contentWindow.postMessage(postData, location.origin);
}

function iframeLoad() {
  if (!isInitcode.value) {
    isIframeLoaded.value = true;
    isRefreshCode.value && (isInitcode.value = true) && runCode;
  }
}
</script>

<style lang="scss">
@import "./assets/styles/mixin.scss";

.left-editor {
  display: block;
  height: 100%;
  background: #1e1e1e;
}
.foo {
  display: block;
  height: 100%;
  border: 1px solid red;
  overflow: hidden !important;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
.tab-editor {
  height: 800px;
  font-size: 14px;
  overflow: hidden !important;
}

.setting {
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}

@include action-bar;
::v-deep .el-drawer__header {
  display: none;
}
</style>
