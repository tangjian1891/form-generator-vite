<template>
  <el-form ref="form" :model="form" label-width="120px" style="height: 100%">
    <draggable style="width: 100%; height: 100%" :list="drawingList" group="people" @change="change">
      <template #item="{ element }">
        <el-row>
          <!-- <el-col :span="24" @click="emits('updateActiveData', element)"> -->
          <el-col :span="24" @click="emits('updateActiveData', element)">
            <el-form-item :label="element.__config__.showLabel?element.__config__.label:''">
              <div class="list-group-item">
                <render :conf="element"> </render>
                <div>{{element.placeholder}}</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </draggable>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive } from "vue-demi";
import render from "../components/render";
import { DefineConfig } from "../interface/configs.interface";
const drawingList = reactive([]);
const form = reactive({});
const emits = defineEmits(["updateActiveData"]);
function change() {
  console.log("有了变化");
}
</script>
<style scoped></style>
