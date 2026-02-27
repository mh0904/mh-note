## watch 和 computed 有什么区别？computed 和 watch 中可以使用异步吗?

概念：
watch 用来监听属性的变化，当值发生变化的时候来执行特定的函数，watch 监听分为简单数据类型的监听和复杂数据类型的监听，对于简单数据类型的监听会有 2 个参数 newVal 和 oldVal 一个新值一个旧值，对于复杂数据类型的监听需要使用 handler 函数，并且开启 deep：true 深度监听。
计算属性出现的目的是解决模板中放入过多的逻辑会让模板过重且难以维护的问题；计算属性是基于它的依赖改变来进行的,只有在它的依赖发生改变的时候 函数才会被重新执行 也就意味着 依赖没有发生改变的时候 结果依然是上一次的计算结果(缓存计算结果)（这样做可以节省性能）同时它是实时响应的，当 data 里面的属性发生变化的时候就会触发 computed，计算属性有两个方法：分别是 get 和 set 方法，get 方法是通过外界属性值的改变改变自身的值，set 方法是通过自身属性值的改变改变外界的值。
computed 中不可以使用异步，computed 的结果会被缓存，return 是同步执行，没法拿到异步结果。watch 中可以执行异步，watch 中不需要 return，不会缓存结果。

## vue.use 和 vue.component 有什么区别？

总结：
Vue.use 是用来安装 Vue.js 插件的，这些插件可以扩展 Vue 的功能。
Vue.component 是用来全局注册组件的，这些组件是 Vue.js 应用 UI 的构建块。

用法：
常见的用法在 vue 的 main.js 文件中引入插件：例如 Vue.use(Element, { size: "small", zIndex: 3000 }); Vue.use(vueRouter);等。Vue.component()的用法就不一一介绍了。

## computed 中 this 指向？

在 computed 中使用箭头函数的话，会导致 this 指向的不是整个的 vueComponent
此时使用匿名函数的形式就可以解决，this 指向了 vueComponent
或者使用对象的形式，用 set()、get()方法也不会出现问题
https://juejin.cn/post/7218850784330776613

## 删除数组 delete 和 vue.delete 有什么区别？

delete 是 JavaScript 的操作符，用于删除对象属性或数组元素，但不会改变数组的长度。
vue.delete 是 Vue.js 框架提供的方法，用于删除 Vue 实例中响应式对象的属性或数组元素，并确保更新视图。

## vue 中常见的修饰符有那些？

.stop：阻止事件冒泡，即停止事件在 DOM 层次结构中传播。
.prevent：阻止默认事件行为，即取消事件的默认操作。
.capture：使用事件捕获模式监听事件，而不是冒泡模式。事件捕获是从父元素到子元素的传播过程。
.self：只有当事件是从触发元素自身触发时才触发监听器，不包括子元素。
.once：只触发一次事件监听器，之后自动移除监听器。
.passive：告知浏览器该事件监听器不会调用 preventDefault()，可以提高滚动性能。
