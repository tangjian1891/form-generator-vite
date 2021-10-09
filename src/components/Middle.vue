<template>
  <draggable ghostClass="ghost2" :list="arr2" style="margin-top: 50px" group="site">
    <template #item="scope">
      <div>{{ scope.element.name }}</div>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import draggable from "vuedraggable";
const arr2 = reactive([{ id: 12, name: "哈哈1" }]);
/**
 * 添加的数据
 */
// function add(e, el) {
//   console.log("简历了吗", e);
//   console.log(arr2);
//   console.log(console.log(JSON.stringify(arr2[e.newIndex])));
//   // debugger
//   // arr2.splice(e.newIndex, 1);
//   // arr2.splice(e.newIndex, 0, { id: 100, name: "干啥啊" });
//   return false;
// }
</script>
<style  scoped></style>
