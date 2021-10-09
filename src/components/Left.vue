<template>
  <!-- :group="{ name: 'p1' }" -->
  <draggable v-model="arr1" item-key="id"  ghostClass="ghost" group="site">
    <template #item="scope">
      <div>{{ scope.element.name }}</div>
    </template>
  </draggable>
  <draggable v-model="arr2" item-key="id"  ghostClass="ghost" group="site">
    <template #item="scope">
      <div>{{ scope.element.name }}</div>
    </template>
  </draggable>
 
</template>
<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import draggable from "vuedraggable";
const data=reactive({
  arr1:[
  { id: 1, name: "www.itxst.com（不允许停靠）" },
  { id: 2, name: "www.jd.com" },
  { id: 3, name: "www.baidu.com" },
  { id: 5, name: "www.google.com" },
  { id: 4, name: "www.taobao.com（不允许拖拽）" },
],
arr2:[{ id: 12, name: "哈哈" }]
})
const arr1 = reactive([
  { id: 1, name: "www.itxst.com（不允许停靠）" },
  { id: 2, name: "www.jd.com" },
  { id: 3, name: "www.baidu.com" },
  { id: 5, name: "www.google.com" },
  { id: 4, name: "www.taobao.com（不允许拖拽）" },
]);

const arr2 = reactive([{ id: 12, name: "哈哈" }]);
function end() {
  console.log("这也有数据是吗");
  return true;
}
function cloneComponent(e) {
  console.log("克隆了一个数据是吗", e);
  e.address = "你好啊啊啊";
  return e;
}
</script>
<style  scoped></style>
