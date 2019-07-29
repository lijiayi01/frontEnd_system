<template>
    <div>
      <Input />
      <button @click="href('/page')">跳转到A</button>
      <button @click="href('/pageB')">跳转到B</button>
    </div>
</template>

<script>
import Input from '../components/input.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Input
  },
  methods: {
    href(url){
      this.$router.push(url)
    }
  },

  created () {
    console.log('created')
  },

  mounted () {
     console.log('mounted')

     console.log(this.$a)
  },

  activated(){
    console.log('activated')
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
