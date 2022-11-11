<template>
    <div>
      <Input :str="msg" @update="parentUpdate"/>
      <button @click="href('/page')">跳转到A</button>
      <button @click="href('/pageB')">跳转到B</button>
{{haha}}
      <button @click="change">变化msg</button>
    </div>
</template>

<script>
import Input from '../components/input.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      haha:1
    }
  },
  components: {
    Input
  },
  methods: {
    href(url){
      this.$router.push(url)
    },
    parentUpdate(str){
      this.msg = str
    },
    change(){
      this.msg = '123'
    }
  },

  beforeCreate () {
     console.log('beforeCreate')
  },

  created () {
    new Promise((resolve, reject)=>{
     
      console.log(';hahahahahha')
    })
    console.log('created')
  },

  beforeMount () {
    console.log('beforeMount')
  },

  mounted () {
     console.log('mounted')

  },

  activated(){
    console.log('activated')
  },
  beforeUpdate () {
    console.log(" beforeUpdate");
  },
  updated () {
    console.log(" updated");
  },
  beforeDestroy () {
      console.log('beforeDestroy')
  },

  destroyed () {
     console.log('destroyed')
  },

  deactivated(){
     console.log('deactivated')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
