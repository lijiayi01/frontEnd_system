<template>
  <div>
    <van-slider v-model="value" @change="onChange" />
    登录页 query:
    <ul>
      <li v-for="item of query">
        {{ item }}
      </li>
    </ul>
    <button @click="update">修改pinia</button>
    <usePinia />
  </div>
</template>
<script setup lang="ts">
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import usePinia from '@/components/usePinia.vue';
import { useUserStore } from '@/store/user';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const routes = useRoute();
const query = routes.query;
console.log(routes.query);

function update() {
  userStore.updateName('123');
}
const value = ref(10);
const onChange = (value: any) => Toast('当前值：' + value);
</script>
<style scoped></style>
