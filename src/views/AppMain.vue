<template>
  <div class="content">
    <div class="l">
      <L />
    </div>
    <div class="middle">
      <Middle ref="midlleRef" @updateActiveData="foo2" />
      <!-- <Middle ref="midlleRef" @updateActiveData="update" /> -->
    </div>
    <div class="r">
      <R :activeData="activeData" :qwer="qwer.msg" />
    </div>
    <CodeTypeDialog v-model="dialogVisible" title="选择生成类型" :show-file-name="showFileName" @confirm="generate" />
    <!-- <FormDrawer v-model="drawerVisible" :form-data="formData" /> -->
  </div>
</template>

<script lang="ts" setup>
import Middle from "./Middle.vue";
import L from "./L.vue";
import R from "./R.vue";
import CodeTypeDialog from "../components/dialog/CodeTypeDialog.vue";
import { reactive, ref } from "vue";

const dialogVisible = ref(false);
const showFileName = ref(false);
const drawerVisible = ref(false);
const midlleRef = ref(null);
const qwer = reactive({ msg: "123" });
let activeData = ref({});
function run() {
  dialogVisible.value = true;
  showFileName.value = false;
}

function foo2(e) {
  console.log(e);
  activeData.value=e
}
function generate(data) {
  console.log("触发到了这里");
  execRun(data);
}

// 执行运行函数
function execRun(data) {
  // 处理数据
  // this.
  console.log(midlleRef.value);

  drawerVisible.value = true;
}
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
