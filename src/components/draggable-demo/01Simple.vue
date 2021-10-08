<template>
  <div>
    <button @click="add">添加</button>
    <!-- :list="data.list" -->
    <!-- 保持使用list v-model在 reactive直接包裹数组时有问题 -->
    <!-- disabled 可以禁止拖动 -->
    <draggable
      :list="list"
      :disabled="!data.enabled"
      item-key="name"
      @start="data.dragging = true"
      @end="data.dragging = false"
    >
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import draggable from "vuedraggable";
const data = reactive({
  enabled: true,
  list: [
    { name: "John1", id: 0 },
    { name: "Joao2", id: 1 },
    { name: "Jean3", id: 2 },
  ],
  dragging: false,
});
const list = reactive([
  { name: "John1", id: 0 },
  { name: "Joao2", id: 1 },
  { name: "Jean3", id: 2 },
]);
let index = 3;
function add() {
  list.push({ name: "数据"+index++ , id: index });
}
</script>
<style lang="scss" scoped></style>
