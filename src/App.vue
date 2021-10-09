<template>
  <div class="content">
    <!-- <Simple></Simple> -->
    <!-- <TwoLists></TwoLists> -->
    <!-- <Clone></Clone> -->
    <!-- <CustomClone></CustomClone> -->
    <!-- <CloneOnControl></CloneOnControl> -->
    <!-- <handle></handle> -->
    <Nested></Nested>
    <!-- <Left class="left"></Left>
    <Middle class="middle"></Middle>-->
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Left from "./components/Left.vue";
import Middle from "./components/Middle.vue";
import Simple from "./components/draggable-demo/01Simple.vue";
import TwoLists from "./components/draggable-demo/02TwoLists.vue";
import Clone from './components/draggable-demo/03Clone.vue'
import CustomClone from './components/draggable-demo/04CustomClone.vue'
import CloneOnControl from './components/draggable-demo/05CloneOnControl.vue'
import handle from './components/draggable-demo/06Hadnle.vue'
import Nested from './components/draggable-demo/07Nested.vue'
</script>

<style>
.target_area {
  width: 500px;
  height: 200px;
  border: 1px solid red;
}
.ghost {
  color: red;
}
.ghost2 {
  background-color: yellow;
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  height: 100%;
}
.content .left {
  border: 1px solid skyblue;
  flex-basis: 200px;
  height: 100%;
}
.content .middle {
  height: 100%;
  flex: 1;
}
</style>
