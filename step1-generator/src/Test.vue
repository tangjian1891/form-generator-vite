<template>
  <div style="height: 100%">
    <el-row>
      <!-- 左侧编辑区域 -->
      <el-col :span="12">
        <el-tabs v-model="activeTab" type="card" class="editor-tabs">
          <el-tab-pane :name="item" v-for="item in tabList" :key="item">
            <template #label>
              <span>
                <i v-if="activeTab === item" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                {{ item }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <!-- 三块代码渲染序曲 -->
        <div v-show="activeTab === 'html'" id="editorHtml" class="tab-editor" />
        <div v-show="activeTab === 'js'" id="editorJs" class="tab-editor" />
        <div v-show="activeTab === 'css'" id="editorCss" class="tab-editor" />
      </el-col>

      <!-- 右侧预览区域 -->
      <el-col :span="12" class="right-preview">
        <iframe ref="previewPageRef" class="result-wrapper" frameborder="0" src="preview.html" @load="runCode" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, toRaw } from "vue-demi";
import { parse } from "@babel/parser";
import { makeUpHtml } from "./utils/generator/html"; //根据数据生成对应的html代码
import { makeUpJs } from "./utils/generator/js";
import { makeUpCss } from "./utils/generator/css";
import { EXPORT_DEFAULT } from "./utils/util";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import * as beautifier from "js-beautify";
import { formDataConf } from "./utils/config";

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

const tabList = reactive(["html", "js", "css"]);
//编辑器实例
const editorObj: any = {
  html: null,
  js: null,
  css: null,
};
// 代码数据
const codeData = {
  html: "",
  js: "",
  css: "",
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
const activeTab = ref("html");
const previewPageRef: any = ref(null);

const generateConf = reactive({ fileName: "", type: "file" });
const scripts = reactive([]);
const links = reactive([]);

onMounted(async () => {
  const { type } = generateConf;
  codeData.html = makeUpHtml(formData, type);
  codeData.js = makeUpJs(formData, type);
  codeData.css = makeUpCss(formData);
  // 格式化代码
  codeData.html = beautifier.html(codeData.html, formDataConf.html);
  codeData.js = beautifier.js(codeData.js, formDataConf.js);
  codeData.css = beautifier.css(codeData.css);
  editorObj.html = monaco.editor.create(document.querySelector("#editorHtml") as HTMLElement, {
    value: codeData.html,
    theme: "vs-dark",
    language: "html",
    automaticLayout: true,
  });
  editorObj.html.onKeyDown((e) => {
    if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
      console.log("重新运行一下");
      e.preventDefault();
    }
  });

  editorObj.js = monaco.editor.create(document.querySelector("#editorJs") as HTMLElement, {
    value: codeData.js,
    theme: "vs-dark",
    language: "javascript",
    automaticLayout: true,
  });

  editorObj.css = monaco.editor.create(document.querySelector("#editorCss") as HTMLElement, {
    value: codeData.css,
    theme: "vs-dark",
    language: "css",
    automaticLayout: true,
  });
});

async function runCode() {
  console.log("激活运行，注入代码");
  const jsCodeStr = editorObj.js.getValue();
  try {
    const ast = parse(jsCodeStr, { sourceType: "module" });
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
          html: editorObj.html.getValue(),
          js: jsCodeStr.replace(EXPORT_DEFAULT, ""),
          css: editorObj.css.getValue(),
          scripts: toRaw(scripts),
          links: toRaw(links),
        },
      };
      previewPageRef.value.contentWindow.postMessage(postData, location.origin);
    } else {
      console.error("请使用export和default");
    }
  } catch (error) {
    console.error(error);
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
