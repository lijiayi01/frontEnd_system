import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import List from '@/page/List'
import pageB from '@/page/pageB'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/page',
      name: 'page',
      component: List,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/pageB',
      name: 'page',
      component: pageB,
      meta: {
        keepAlive: false
      }
    }

  ]
})
