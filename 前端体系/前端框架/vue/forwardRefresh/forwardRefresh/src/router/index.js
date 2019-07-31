import Vue from 'vue'
import Router from 'vue-router'
import List from '@/page/List'
import Detail from '@/page/Detail'
import Pay from '@/page/Pay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
      meta: {
        index: 0
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
      meta: {
        index: 1
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        index: 2
      }
    },
    
  ]
})
