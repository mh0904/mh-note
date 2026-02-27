## setup 配置?

Vue 3 中的 setup 函数接收两个参数，分别是 props 和 context。
1、props：值为对象，包含: 组件外部传递过来。切组件内部声明接收了的属性。需要注意的是，Vue3 中的 props 是只读的，即在 setup 函数中不能修改 props 的值。如果需要修改传递过来的数据，可以使用响应式对象或 ref。
2、context：上下文对象。
attrs:值为对象，包含组件外部传递过来，但没有在 props 配置中声明的属性。相当于 this.$attrs
slots:收到的插槽内容，相当于 this.$slots
emit:分发自定义事件的函数，相当于 this.$emit

## 模板的编译流程？在什么时候编译？

模板会先被解析成 AST 对象，然后通过遍历 AST 对象生成渲染函数。这个过程发生在 setup()函数执行结束后、onBeforeMount 之前。

## vue3 新的生命周期钩子?

Vue3 中新增了两个生命周期钩子函数：

beforeUnmount：在组件卸载之前调用，可以用来做一些清理工作，比如取消订阅、清除定时器等。

onRenderTracked：在组件渲染时调用，可以用来监视组件的状态变化，比如打印组件的状态、记录组件的变化等。

除此之外，Vue3 还对原有的生命周期钩子函数进行了优化和改进，比如：

beforeCreate 和 created 合并为 setup 函数，使得组件的初始化更加简洁和灵活。

beforeMount 和 mounted 合并为 onMounted 函数，使得组件的挂载更加高效和可控。

beforeUpdate 和 updated 合并为 onUpdated 函数，使得组件的更新更加精准和可靠。

beforeDestroy 和 destroyed 合并为 onUnmounted 函数，使得组件的卸载更加安全和可靠。

执行最终顺序：

Vue3 生命周期：setup

Vue2 生命周期：beforeCreate

Vue2 生命周期：created

Vue3 生命周期：onBeforeMount

Vue2 生命周期：beForeMount

Vue3 生命周期：onMounted

Vue2 生命周期：mounted

Vue3 生命周期：onBeforeUpdate

Vue2 生命周期：beforeUpdate

Vue3 生命周期：onUpdated

Vue2 生命周期：updated

Vue3 生命周期：onBeforeUnmount

Vue2 生命周期：beforeUnmount

Vue3 生命周期：onUnmounted

Vue2 生命周期：unmounted

## 有哪三种 Effect？作用？

vue3 组件内有 3 类 Effect：computedEffect、watchEffect、renderEffect。正是通过这些 Effect 才实现数据可监听函数的绑定，其中 computedEffect、watchEffect 在 setup()期间创建，而 renderEffect 在 onBeforeMount 和 onMounted 之间创建。

## ref()和 reactive()的区别？

两者都用于实现响应式变量，区别在于 reactive()只可以封装引用类型，ref()可以封装任意类型；reactive()通过 Proxy 实现，ref()通过类封装，并重写 get/set 实现。就目前而言，要访问 ref()封装的变量，需要通过 value 函数获取。

reactive:
(1)、它的响应式是更加‘深层次’的，底层本质是将传入的数据包装成一个 Proxy。
(2)、参数必须是对象或者数组，如果要让对象的某个元素实现响应式时比较麻烦。需要使用 toRefs

ref:
(1)、函数参数可以是基本数据类型，也可以接受对象类型
(2)、如果参数是对象类型时，其实底层的本质还是 reactive,系统会自动根据我们给 ref 传入的值转换成：reactive
(3)、在 template 中访问，系统会自动添加.value;在 js 中需要手动.value
(4)、ref 响应式原理是依赖于 Object.defineProperty()的 get()和 set()的。

## attrs 和 props 的区别？

attrs 和 props 的作用都是，以模板属性的形式，从父组件传递数据给子组件。区别是，子组件中获取从父组件传过来的 props 数据，首先需要用 defineProps()声明，而获取 attrs 数据不需要声明。props 的优势是增加了代码可读性，attrs 的优势是传值更灵活、代码更简洁。

## v-for 为什么要加 key？v-for 为什么不能和 v-if 一起使用？

v-for 要加 key 是因为，第一，vue 的同步算法采用就地复用的策略，在没有 key 值的情况下，diff 算法认为标签类型相同的元素可以进行复用；有 key 值的情况下，diff 算法认为标签类型相同且 key 值相等的元素才可以复用。第二，vue 只在 v-model 实现了数据双向绑定，其它地方实现的都是单向绑定，<input/>框内的文字发生变化，不会实时同步到数据上。
在 vue3 中，v-if 的优先级高于 v-for，导致 v-if 访问不了 v-for 中的变量，因此不能把 v-if 和 v-for 同时用在同一个元素上。

## Composition API 和 Options API 的区别？

1. Options API 是 vue2 中使用的方式，这种 api 的使用特点是在一个组件中通过 option 对象对组件进行配置，比如 props，data，watch，computed，methods 等选项，开发者根据不同的需求选择使用不同的 option，这些 option 都是组件内置的，这种编程的特点是组件的结构比较清晰，易于读写，在小项目中比较实用。

2. Componsition API 的是 vue3 中使用的 api 的方式，它是以函数的形式去组织代码，将相关的逻辑整合在一起，提高了代码的可读性和可维护性，对于代码的复用比较有用。这种编程的方式适合大型的项目。
