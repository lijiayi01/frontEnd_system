import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: 'ljy',
      age: 10,
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
    updateAge(num: number) {
      this.age = num;
    },
  },
});
