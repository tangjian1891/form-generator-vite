<template>
  <draggable style="height: 100%" :list="data" group="people" @change="change">
    <template #item="{ element }">
      <div class="list-group-item">
        <!-- <el-button plain> {{ element.__config__.label }}</el-button> -->
        <render :conf="element"> </render>
      </div>
    </template>
  </draggable>
  <!-- <tb>
    dwq
    <template #label>哈哈哈</template>
  </tb> -->
</template>
<script lang="ts" setup>
import { reactive } from "vue-demi";
import render from '../components/render'
import tb from "./tb.vue";
const data = reactive([]);

function change() {
  console.log("有了变化");
}
</script>
<style scoped></style>
