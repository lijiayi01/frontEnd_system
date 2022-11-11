<template>
  <div>
    使用pinia

    <div>{{ name }}</div>
    <div>{{ age }}</div>

    <button @click="updateAge">改年龄</button>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const { name, age } = storeToRefs(userStore);

function updateAge() {
  userStore.updateAge(10000);
}
</script>
<style scoped></style>
