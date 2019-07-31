<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view class="router-view"/>
    </transition>
   
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName:''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      console.log(to,from)
     // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
	    //设置动画名称
        this.transitionName = 'slide-forward';
      }else{
        this.transitionName = 'slide-back';
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin:0;
  padding:0
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 200ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.router-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    /* -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #f0f0f0 */
}
.slide-back-leave-active,.slide-forward-enter {
    opacity: 0;
    transform: translate3d(100%,0,0)
}

.slide-back-enter,.slide-forward-leave-active {
    opacity: 0;
    transform: translate3d(-100%,0,0)
}

/* .slide-normal {
    opacity: 1;
    transform: translateZ(0)
}

.slide-normal-leave-active {
    opacity: 0;
    transform: translate3d(-100%,0,0)
} */

</style>
