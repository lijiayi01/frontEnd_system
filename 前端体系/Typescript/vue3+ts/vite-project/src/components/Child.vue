<template>
  <div>
    <h2>我是子组件</h2>
    <div>
      props内容 num: {{ props.num }}

      <button @click="emits('addNum')">子组件emit</button>
    </div>

    <div>
      pinia状态: 名称：{{ userStore.name }}

      <button @click="update">修改pinia状态</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore();

const props = defineProps({
  num: Number,
});

const emits = defineEmits(['addNum']);
var a = 1;
var v = 20;
function update() {
  userStore.updateName('王强');
}
</script>
<style scoped></style>
