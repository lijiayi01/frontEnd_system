<template>
    <div>
        <input type="text" placeholder="请输入内容" @input="input($event)">
        {{str}}
    </div>
</template>
<script>
export default {
  name: "Input",
  props:[
    'str'
  ],
  methods: {
      input(e){
        this.$emit('update',e.target.value)
      }
  },
  beforeCreate() {
    console.log("child beforeCreate");
  },

  created() {
    console.log("child created");
  },

  beforeMount() {
    console.log("child beforeMount");
  },

  mounted() {
    console.log("child mounted");
  },

  beforeUpdate () {
    console.log("child beforeUpdate");
  },
  updated () {
    console.log("child updated");
  },

  beforeDestroy() {
    console.log("child beforeDestroy");
  },

  destroyed () {
     console.log('child destroyed')
  },
};
</script>
<style scoped>
</style>
