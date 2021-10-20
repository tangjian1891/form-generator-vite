<template>
  <div>
    <draggable
      :list="configs"
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
import { configs } from "../utils/configs";

function cloneFn(config:DefineConfig) {
  
  return  JSON.parse(JSON.stringify(config))
}

function change() {}

function start() {}
</script>
<style lang="scss" scoped></style>
