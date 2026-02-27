## vue 中有哪些指令以及作用？

v-bind
简写：“：”
作用：动态绑定 src 动态绑定 style 样式 动态绑定 class 例名
v-on
简写：“@”
作用：用于监听 DOM 事件，并且触发时会执行 js 代码。
v-for
作用：v-for 是 vue 的 循环指令，用于遍历，大多用于遍历数组
v-model
作用：在表单控件或者组件上创建双向绑定
v-slot
作用：提供具名插槽或需要接收 prop 的插槽。

## v-for 里面的 key 是干嘛的？为什么不用 index 作为 key 而是用 id？

使用 v-for 更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据 key 值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素; 假设一个数组中有 4 条数据，当我们在这个数组中第二项后面插入一条数据的时候，如果用 index 作为 key，则除了第一条数据外，其他数据的 index 都改变了，其他数据就会被重新渲染，而用 id 作为 key 只会重新渲染当前的那条数据。

## v-html 和 v-text 的区别？

1.  v-text
    作用 ： 操作元素中的纯文本
    快捷方式 ： {{}}
2.  v-html
    作用 ： 操作元素中的 HTML 标签
    区别：v-text 会将元素当成纯文本输出，v-html 会将元素当成 HTML 标签解析后输出

## vue 中的 scoped 的作用？以及原理？

在 vue 组件中，在 style 标签上添加 scoped 属性，以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的。原理：给节点添加自定义属性，根据属性选择器添加样式；

解析前：

```vue
<style scoped>
  .example {
    color: red;
  }
</style>
<template>
  <div>scoped测试案例</div>
</template>
```

解析后：

```vue
.example[data-v-5558831a] { color: red; }
<template>
  <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

## v-if 和 v-show 的区别？

1. 区别：v-if 和 v-show 都是控制元素显示和隐藏的指令，不同的是 v-show 是通过设置 css 的 display 属性在控制元素，无论设置的 true 还是 false，元素都会被渲染到 DOM 上面，v-if 则是通过通过条件判断元素是否渲染，如果条件是 false 则不会渲染该元素。
2. 场景：v-if 由于是控制 DOM 元素的添加和删除，所以适合不需要频繁切换到元素，性能开销比较大，v-show 由于是控制元素的 css 属性，所以适合频繁操作的 DOM，相对性能开销比较小。

## 为什么 vue 中 v-if 和 v-for 不建议一起使用？

1. 在 vue 中 v-for 的优先级比 v-if 的优先级高，如果同时作用在同一元素上则会造成性能的浪费。
2. 在 vue3 中 v-if 的优先级比 v-for 的高，如果两个标签作用在同一个元素上，这个时候先判断 v-if，再进行循环则不会造成性能浪费。如果在父元素中使用 v-for 在子元素中使用 v-if，这元素会先渲染，后将对每一条数据再进行条件判断，这并不是一个好的选择，建议对于数据先在计算属性中处理再进行渲染。

## 说说你对 slot 的理解？

介绍：在 Vue 中，slot（插槽）是一种用于分发内容的机制，它允许我们在组件的模板中定义一些可替换的区域，然后在使用该组件时，可以将不同的内容插入到这些区域中。
通过使用 slot，我们可以在组件中定义一些预留的位置，然后在组件的使用者中填充具体的内容。这使得组件可以更加灵活地适应不同的使用场景，同时也提供了一种可复用的方式来定义组件的外部结构。

1. 默认插槽：默认插槽指的是在子组件中只有一个。

```html
<!-- Parent component -->
<child-component>
  <p>This is the content from the parent.</p>
</child-component>
<!-- Child component template -->
<div>
  <slot></slot>
</div>
```

2. 具名插槽：一个组件中使用多个插槽，为每个插槽进行命名。

```html
<!-- Parent component -->
<child-component>
  <template v-slot:header>
    <h1>This is the header content.</h1>
  </template>
  <template v-slot:footer>
    <p>This is the footer content.</p>
  </template>
</child-component>

<!-- Child component template -->
<div>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
    <!-- 默认插槽 -->
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

3. 作用域插槽：允许子组件向父组件传递数据。

```html
<!-- Parent component -->
<child-component v-slot:default="slotProps">
  <p>{{ slotProps.message }}</p>
</child-component>
<!-- Child component template -->
<div>
  <slot :message="messageFromChild"></slot>
</div>
```

## vue 中过滤器是如何使用的？

全局过滤器使用方法：
使用 vue.filter()创建过滤器，里面有两个参数，第一个是过滤器的名称，第二个是回调函数。在模板中过滤器的左边是需要传递的参数，右边是过滤器的名称。
局部过滤器的使用方法：
第一步：使用 filters 创建私有过滤器，私有过滤器的方法名就是过滤器名。
第二步：过滤器的左边是传入的参数，右边是过滤器的名称。

## 说说你对自定义指令的理解，以及使用场景？

vue 中自定义指令分为全局自定义注册和局部自定义注册，自定义指令通常用于直接操作 DOM，比如聚集，剪贴板操作等。

自定义指令中的钩子函数
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted： 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。

自定义聚焦的实现如下：

```js
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
})
```

在 input 输入框中使用

```html
<input v-focus />
```

在 vue3 中可以使用 app.directive 去定义自定义指令。

```js
const app = Vue.createApp({})
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})
```
