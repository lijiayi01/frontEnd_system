<template>
  <div class="index list">
    <van-button type="primary" @click="href"> 主要按钮 </van-button>
  </div>
</template>
<script setup lang="ts">
// import ModuleA from "../../../types/win";
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

import Logo from '@/assets/logo.png';

import { useRoute, useRouter } from 'vue-router';
import { useMouse } from '@vueuse/core';
import axios from '@/axios/index';
const router = useRouter();
const userStore = useUserStore();

const { name, age } = storeToRefs(userStore);
console.log(Logo);
const href = () => {
  router.push('/login?a=1&b=2');
};
const { x, y } = useMouse();
setTimeout(() => {
  fn();
});
const fn = async () => {
  try {
    let res = await axios.get('http://www.baidu.com');
  } catch (error) {
    console.log(error, '...');
  }
};

LJY = '123';
console.log(LJY);

const a: Person2 = {
  name: '123',
  age: 10,
};

// const user: User = {
//     avatar: ''
// }
const By: NewsItem = 1100;

function testLijayi() {
  return 134;
}

testLijayi();
</script>
<style scoped lang="scss">
.index {
  color: #000;
}

.btn {
  font-size: 12px;
}
</style>
