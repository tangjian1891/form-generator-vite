<template>
  <draggable class="dragArea" :list="props.tasks" item-key="name" :group="{ name: 'g1' }">
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <div style="padding-left: 20px">
          <nested-draggable :tasks="element.tasks"></nested-draggable>
        </div>
      </li>
    </template>
  </draggable>
</template>
<script lang="ts">
export default {
  name: "nested-draggable",
};
</script>
<script lang="ts" setup>
const props = defineProps({
  tasks: {
    required: true,
    type: Array,
  },
});
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
