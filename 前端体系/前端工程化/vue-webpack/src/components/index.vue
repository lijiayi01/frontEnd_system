<template>
  <div class="App">
    Hello World nihao haha
      <p>{{getCounter}}</p>
      <button @click="add">add_old</button>
      <img src="../img/1.jpg"> 
    <div>
      <router-link to="/index">go index</router-link>
      <router-link to="/list">go list1</router-link>
    </div>
    <div>
    <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
console.log(NODE_ENV);
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCounter"])
  },
  methods: {
    ...mapActions(["add"])
  }
};
</script>

<style lang="scss" scoped>
.App {
  color: skyblue;
  background: #ff0;
  font-size: 12px;
}
</style>
