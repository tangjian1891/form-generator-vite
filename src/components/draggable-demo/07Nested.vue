<template>
  <div class="main">
    <nestedDraggable :tasks="data.list"></nestedDraggable>
  </div>
</template>
<script lang="ts">
export default {
  name: "nested",
};
</script>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import nestedDraggable from "./nested-draggable.vue";

const data = reactive({
  list: [
    {
      name: "task 1",
      tasks: [
        {
          name: "task 2",
          tasks: [],
        },
      ],
    },
    {
      name: "task 3",
      tasks: [
        {
          name: "task 4",
          tasks: [],
        },
      ],
    },
    {
      name: "task 5",
      tasks: [],
    },
  ],
});
</script>
<style scoped>
.main {
  width: 370px;
}
</style>
