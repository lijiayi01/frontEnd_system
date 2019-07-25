import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from 'components/page/index.vue'

import List from 'components/page/list.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode:"hash",
    routes: [
        {
            path:'/index',
            component: Index
        },
        {
            path:'/list',
            component: List
        }
       
    ]
})