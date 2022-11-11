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
    updateName(name) {
      this.name = name;
    },
    updateAge(num) {
      this.age = num;
    },
  },
});
//# sourceMappingURL=user.js.map
