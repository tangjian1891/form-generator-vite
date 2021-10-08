<template>
  <draggable :list="data.list1" group="p1" :sort="true">
    <template #item="{ element, index }">
      <div class="list-group-item">{{ element.name + element.id }}</div>
    </template>
  </draggable>
  <draggable :list="data.list2" item-key="id" group="p1" :sort="true">
    <template #item="{ element, index }">
      <div class="list-group-item">{{ element.name + element.id }}</div>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import { reactive } from "@vue/reactivity";

const data = reactive({
  list1: [
    { name: "John1", id: 1 },
    { name: "Joao", id: 2 },
    { name: "Jean", id: 3 },
    { name: "Gerard", id: 4 },
  ],
  list2: [
    { name: "Juan", id: 5 },
    { name: "Edgard", id: 6 },
    { name: "Johnson", id: 7 },
  ],
});
</script>
<style lang="scss" scoped></style>
