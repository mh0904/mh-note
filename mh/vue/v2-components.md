## vue 的生命周期有那些？分别做了什么事情？

beforeCreate 函数：
vue 实例对象中的属性还没有被绑定，无法访问 data，计算属性中的值。即属性还没有被赋值，这个时候可以添加 loading 事件。

Created 函数：
vue 对象的属性有值了。 即：data，computed 都执行了。属性已经赋值，初始化完成时的事件写在这里，如在这结束 loading 事件，异步请求也适宜在这里调用。

beforeMount 函数：
模板编译(template)完成，此时 this.\$el 有值，但是数据还没有挂载到页面上。即此时页面中的{{}}里的变量还没有被数据替换。

      Monuted函数：
         数据挂载完毕，即：此时已经把数据挂载到了页面上，所以，页面上能够看到正确的数据了。

      beforeUpdate函数：
         data中的数据已经完成了替换，视图并没有更新，所以叫作组件更新前。注意：此数据一定是在模板上出现的数据，否则，不会，也没有必要触发组件更新（因为数据不出现在模板里，就没有必要再次渲染）

      updated函数：
         组件更新之后执行的函数，虚拟dom替换真实dom，页面更新完成，

      beforeDestroy函数：
         vue实例就进行到销毁阶段，但是此时vue实例中的data和metheds中的方法，以及过滤器和指令都任然是可用的，并没有真正的销毁。销毁前，可做一些删除提示，如：您确定删除xx吗？销毁定时器、解绑全局事件、销毁插件对象等操作。

      destroyed函数：
         vue组件销毁后此时 vue 实例已经解除了事件监听以及和 dom 的绑定，实例才是真正的销毁

## vue 的 created 和 mounted 中请求数据有什么区别？

created 和 mounted 在请求数据方面的区别在于它们被调用的时机和可操作的环境。在 created 中发起数据请求时，组件尚未挂载到 DOM，无法进行 DOM 操作；而在 mounted 中发起数据请求时，组件已经被挂载到 DOM，可以进行 DOM 操作并更新数据到视图中。根据具体需求，你可以选择适合的生命周期钩子函数来请求数据，并在合适的时机进行操作。

## 父子组件的生命周期执行的顺序？

     父beforeCreate ->父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted
          -> 父mounted
      更新时执行顺序
          父beforeUpdate->子beforeUpdate->子updated->父updated
      卸载执行顺序
          父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## vue 中组件通信有那些？

通过 props 传递
通过$emit 触发自定义事件
        使用 ref
        EventBus
        $parent
$root
$children
Provide 与 Inject
Vuex
详细介绍：https://juejin.cn/post/7248888621364625467

## keep-alive 的作用？

keep-alive : 包裹动态组件(组件)时，会缓存不活动的组件实例，而不是销毁它们 ，组件切换调用的时候本身会被销毁掉的，只要加上 keep-alive 进行包裹，就不会被销毁，而是被缓存起来， 下一次使用的时候直接从缓存中调用，节省了性能。

        在被keep-alive包含的组件/路由中，会多出两个生命周期的钩子:activated 与 deactivated
        activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用
        deactivated：组件被停用(离开路由)时调用
        注意：使用了keep-alive就不会调用beforeDestroy(组件销毁前钩子)和destroyed(组件销毁)，因为组件没被销毁，被缓存起来了。

## 请说下什么是动态组件？

动态组件： 让多个组件使用同一个挂载点，并可以动态进行切换，vue 中为我们提供了内置的 component 组件，我们可以通过 v - bind 动态绑定 is 属性等于一个变量，通过切换变量来动态切换组件。
<component :is='comName' />

## 组件上如何实现双向数据绑定？

第一步：在父组件中使用 v-model 绑定一个值，这个值和子组件中 model 中的 prop 接收的值名称相同。
<Son v-model="value" />

第二步：在子组件中可以使用 model 的语法糖，实现实时监听父组件 v-model 绑定的值，同时借助 this.$emit自定义事件将修改的值传递给父组件。
model: {
prop: 'value', //接收的值
event: 'event' //定义事件名
},

             this.$emit('event', this.msg) //触发自定义事件

扩展
vue.3 之后提供了.sync 修饰符，也能实现双向绑定；
父组件的写法：
<Son :event.sync='value'/>

子组件中不需要使用 model 的方式，将 model 删除
this.\$emit('update:event', this.msg)
