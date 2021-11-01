<template>
  <div v-for="configs in allComponents">
    <p>{{ configs.title }}</p>
    <draggable
      :list="configs.list"
      :group="{ name: 'people', pull: 'clone', put: false }"
      :clone="cloneFn"
      @change="change"
      @start="start"
      item-key="name"
    >
      <template #item="{ element }">
        <el-button plain> {{ element.__config__.label }}</el-button>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { DefineConfig } from "../interface/configs.interface";
import { inputComponents, layoutComponents, selectComponents } from "../utils/configs";

const allComponents = [
  {
    title: "输入型组件",
    list: inputComponents,
  },
  {
    title: "选择型组件",
    list: selectComponents,
  },
  {
    title: "布局型组件",
    list: layoutComponents,
  },
];
function cloneFn(config: DefineConfig) {
  return JSON.parse(JSON.stringify(config));
}

function change() {}

function start() {}
</script>
<style lang="scss" scoped></style>
