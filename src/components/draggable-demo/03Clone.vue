<template>
  <!-- pull 是否允许移出  'clone'属性之后，原数据不会消失，  put 是否允许移入 -->
  <draggable
    :list="data.list1"
    :group="{ name: 'people', pull: 'clone', put: false }"
    @change="change"
    item-key="name"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        {{ element.name + element.id }}
      </div>
    </template>
  </draggable>
  <draggable :list="data.list2" group="people" @change="change" item-key="name">
    <template #item="{ element }">
      <div class="list-group-item">
        {{ element.name + element.id }}
      </div>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import { reactive } from "@vue/reactivity";

const data = reactive({
  list1: [
    { name: "John", id: 1 },
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

function change(e) {
  console.log("变化", e);
}
</script>
<style  scoped></style>
