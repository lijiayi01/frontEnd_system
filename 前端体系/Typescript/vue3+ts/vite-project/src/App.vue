<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import usePinia from "@/components/usePinia.vue"
// import Child from "@/components/Child.vue";
import { ref } from 'vue';

const num = ref<number>(20);

// const addNum = () => {
//   console.log('进来了吗')
//   num.value++

// }
</script>

<template>
  <!-- <usePinia /> -->
  <!-- 父组件： {{ num }}
  <img alt="Vue logo" src="./assets/logo.png" />
  <Child :num="num" @addNum="addNum"/>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <router-view />
</template>

<style lang="scss">
@import '@/assets/css/common.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}
</style>
