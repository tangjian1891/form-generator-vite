<template>
  <!-- pull 是否允许移出  'clone'属性之后，原数据不会消失，  put 是否允许移入 -->
  <!-- :clone属性接收一个函数，用来处理克隆数据 -->
  <draggable
    :list="data.list1"
    :group="{ name: 'people', pull: pullFunction, put: false }"
    :clone="cloneFn"
    @change="change"
    @start="start"
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
// 自定义克隆数据,根据按键controller决定是拖拽克隆还是移动
import { reactive } from "@vue/reactivity";

const data = reactive({
  list1: [
    { name: "dog 1", id: 1 },
    { name: "dog 2", id: 2 },
    { name: "dog 3", id: 3 },
    { name: "dog 4", id: 4 },
  ],
  list2: [
    { name: "cat 5", id: 5 },
    { name: "cat 6", id: 6 },
    { name: "cat 7", id: 7 },
  ],
  controlOnStart: false,
});

function change(e) {
  console.log("变化", e);
}

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

function start(e) {
  console.log(e);
  data.controlOnStart = e.originalEvent.ctrlKey; //查看是否有按住controler按钮
}
</script>
<style  scoped></style>
