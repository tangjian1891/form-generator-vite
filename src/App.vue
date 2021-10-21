<template>
  <!-- <Simple></Simple> -->
  <!-- <TwoLists></TwoLists> -->
  <!-- <Clone></Clone> -->
  <!-- <CustomClone></CustomClone> -->
  <!-- <CloneOnControl></CloneOnControl> -->
  <!-- <handle></handle> -->
  <!-- <Nested></Nested> -->
  <!-- 测试JSX写法 -->
  <!-- <Test2></Test2> -->
  <AppMain></AppMain>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Simple from "./components/draggable-demo/01Simple.vue";
import TwoLists from "./components/draggable-demo/02TwoLists.vue";
import Clone from "./components/draggable-demo/03Clone.vue";
import CustomClone from "./components/draggable-demo/04CustomClone.vue";
import CloneOnControl from "./components/draggable-demo/05CloneOnControl.vue";
import handle from "./components/draggable-demo/06Hadnle.vue";
import Nested from "./components/draggable-demo/07Nested.vue";
import AppMain from "./views/AppMain.vue";
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
