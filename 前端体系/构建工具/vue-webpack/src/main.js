import {str} from './str.js'

let set6 = new Set([1, 2, 2, 3, 4, 3, 5])
console.log(set6)

import './sass/index.scss'

import img from './img/1.jpg'

console.log(img)



function a(){

    console.log(str)
}

new Promise((resolve,reject)=>{
    resolve(1)
}).then((res)=>{
    console.log(res)
})

import Index from 'components/index.vue'

import Vue from 'vue'

import router from './router'

import store from './vuex' 

console.log(router)

new Vue({
    router,
    store,
    render: h => h(Index),
   
  }).$mount('#app')