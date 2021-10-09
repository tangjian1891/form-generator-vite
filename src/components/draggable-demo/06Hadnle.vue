<template>
  <!-- pull 是否允许移出  'clone'属性之后，原数据不会消失，  put 是否允许移入 -->
  <!-- :clone属性接收一个函数，用来处理克隆数据 -->

  <!-- handle 属性，只要鼠标移动到对应类的元素上才可以拖动 -->
  <draggable
    :list="data.list1"
    :group="{ name: 'people', pull: true, put: false }"
    :clone="cloneFn"
    item-key="name"
    handle=".access_handle"
  >
    <template #item="{ element }">
      <div class="list-group-item">
        <span class="access_handle">允许移动</span>
        {{ element.name + element.id }}
      </div>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
// 自定义克隆数据,根据按键controller决定是拖拽克隆还是移动
import { reactive } from "@vue/reactivity";

const data = reactive({
  list1: [
    { name: "dog 1", id: 1 },
    { name: "dog 2", id: 2 },
    { name: "dog 3", id: 3 },
    { name: "dog 4", id: 4 },
  ],
  controlOnStart: false,
});

// 克隆数据 origin 是单个element 数据 且必须有返回值，否则克隆失败
function cloneFn(origin) {
  console.log(origin);

  return {
    id: origin.id,
    name: "这是一条狗啊",
  };
}

// 动态决定是为clone还是可移动,根据返回值决定
function pullFunction() {
  return data.controlOnStart ? "clone" : true;
}
</script>
<style  scoped></style>
