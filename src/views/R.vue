<template>
  <!-- 组件属性 -->
  <!--字段名称 -->
  <el-form ref="form" label-width="120px">
    <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="JS对应字段名称(v-model)"></el-input>
    </el-form-item>
    <el-form-item label="label">
      <el-input v-model="activeData.label" placeholder="请输入对应label描述"></el-input>
    </el-form-item>
    <el-form-item label="占位提示符">
      <el-input v-model="props.activeData.placeholder" placeholder="占位提示"></el-input>
    </el-form-item>
    <!-- <el-form-item v-if="activeData.__slot__ && activeData.__slot__.prepend !== undefined" label="前缀"> -->
    <el-form-item label="前缀">
      <el-input v-model="activeData.prepend" placeholder="请输入前缀" />
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="activeData.append" placeholder="请输入后缀" />
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="activeData.__config__.defaultValue" placeholder="请输入后缀" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue-demi";
import { DefineConfig } from "../interface/configs.interface";
const props = defineProps({
  activeData: {
    type: Object,
  },
  qwer: {
    type: String,
  },
});
 
</script>
