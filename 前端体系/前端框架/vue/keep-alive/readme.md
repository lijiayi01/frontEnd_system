## keep-alive 和 父子组件的生命周期

### 父子组件的生命周期：

在本例中，测试了父子组件的生命周期。

结论：

在渲染过程中:

 父beforeCreate -> 父created -> 父beforeMount -> 子 beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted


在销毁过程中:

 父beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父destroyed

在更新过程中:

在父组件数据更新过程中，会有两种情况：

1. 当父组件中修改的数据与子组件无关，也就是和子组件的props内的值无关时，触发顺序： 父beforeUpdate -> 父updated

2. 当父组件的修改和子组件有关，修改的值就是props内的值的时候，触发顺序：
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

在子组件数据更新过程中，会有两种情况：

1. 当修改子组件的值，若这个值与父组件无关，触发顺序： 子beforeUpdate -> 子updated

2. 当修改子组件的值，若这个值与父组件有关，比如是通过emit和父组件通信时，触发顺序： 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated


### keep-alive使用

本文主要使用在路由中的keep-alive，主要适用于下面场景:

    有3个页面， list页面 -> detail页面 -> purchase页面

    实现一个需求： detail返回list页面，list页面不刷新

    这里就用到了keep-alive，对list路由做缓存处理

代码简单实现：

```
export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase,
      meta: {
        keepAlive: false
      }
    }

  ]
})

// 在APP.Vue中：
<keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>

```
上面代码其实实现了上述的功能，主要针对的是路由级别的缓存。

下面说一下keep-alive的生命周期：

当list切换到detail时，发现list的beforeDestroy 和 destroyed并没有触发，而是触发了deactivated, 说明了这个list并没有销毁。

当从detail返回list时，list页面仅仅触发了activated，其他的生命周期并没有触发。

通过keep-alive其实可以实现很多功能，比如"前进不刷新，后退刷新"

这个功能我们会在某一节单处实现

