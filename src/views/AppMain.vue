<template>
  <div class="content">
    <div class="l">
      <L />
    </div>
    <div class="middle">
      <Middle />
    </div>
    <div class="r"></div>
    <!-- <button @click="haha">点击触发</button> -->
  </div>
</template>

<script lang="ts" setup>
import Middle from "./Middle.vue";
import L from "./L.vue";
 
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 100%;
  .l {
    flex-basis: 200px;
    border-right: 1px solid skyblue;
  }
  .r {
    flex-basis: 300px;
    border-left: 1px solid skyblue;
  }
  .middle {
    flex: 1;
  }
}
</style>
