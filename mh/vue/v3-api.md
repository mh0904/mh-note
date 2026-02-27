## watch()，watchEffect()，computed()的区别？

1. watch 的介绍
   用于监听一个或者多个响应式数据源，并在数据源变化时执行相应的回调函数。
   1.1 第一个参数是监听的数据源。
   1.2 第二个参数是数据源变化时的回调函数。
   1.3 第三个参数是一个对象，设置了一些可选对象。
   - immediate：在侦听器创建时立即触发回调。
   - deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。在 3.5+ 中，此参数还可以是指示最大遍历深度的数字。
   - flush：调整回调函数的刷新时机。
   - onTrack / onTrigger：调试侦听器的依赖。
   - once：(3.4+) 回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止。

watch 的使用

- 监听一个 getter 函数

```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  },
)
```

当 getter 函数作为源的时候，只有监听函数的返回值变化时才会触发相应的回调函数，如果 getter 函数是一个对象，需要开启`deep：true`的深度监听，同时在回到函数中返回的新值和旧值相等。如下这种：

```js
const state = reactive({ count: 0 })
watch(
  () => state,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  { deep: true },
)
```

当监听的是一个响应式对象的时候，不需要开启`deep:true`,因为系统会默认启用深度监听模式。如下这种：

```js
const state = reactive({ count: 0 })
watch(state, () => {
  /* 深层级变更状态所触发的回调 */
})
```

- 监听一个 ref

```js
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

- 监听多个数据源，回调函数接受两个数组，分别对应来源数组中的新值和旧值：

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

在 3.5 以后对于监听器的使用，增加了暂停，稍后监听以后停止监听的功能。如下：

```js
const { stop, pause, resume } = watch(() => {})
// 暂停侦听器
pause()
// 稍后恢复
resume()
// 停止
stop()
```

2. watchEffect 的介绍

介绍：立即运行一个函数，同时响应式的追踪其依赖，并在其依赖发生变化的时候重新执行该函数。
详细信息：
watchEffect 中有两个参数，第一是 effect 函数，同时 effect 函数中可以接受一个清理函数，清理函数会在下一次 effect 函数执行前调用，用于清理等待中的异步请求。

```js
watchEffect(async onCleanup => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` 会在 `id` 更改时调用，以便取消之前未完成的请求。
  onCleanup(cancel)
  data.value = await response
})
```

第二个参数是 options 对象，常见的配置选项如下：

- flush: 'pre', 调用函数的刷新时机，默认值是 pre，是在组件渲染之前执行。可选项 sync 指的是同步的，当数据变化的时候立即执行。可选项 post 指的是延迟执行，在组件渲染之后执行。
- onTrack / onTrigger ：调试侦听器的依赖。参考调试侦听器。

3. computed 的介绍
   介绍：computed 计算属性，计算属性是基于依赖进行缓存的，当依赖发生改变的时候会重新进行计算，同时计算属性只支持同步代码。vue3 中有两种写法，第一种传递一个 getter 函数返回一个只读的计算属性，第二种传递一个配置对象，通过 set 和 get 函数创建一个可以修改的计算属性。

只读的计算属性：

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne) // 2
```

可读写的计算属性：

```js
const count = ref(1)
const plusTwo = computed({
  get: () => count.value + 3,
  set: val => {
    count.value = val - 1
  },
})
plusTwo.value = 5
console.log(plusTwo.value) // 7
```

总结：上面的三种都可以实现对于数据的监听，不同点是 watch 中可以传递三个参数，一个参数是数据源，可以是对象，可以是函数，还可以是多个数据源组成的数组形式，第二个参数是回调函数，当数据源的发生变化的时候执行回调函数，第三个参数是配置对象，可以配置 immediate 是否立即执行，deep 是否深度监听，当数据源是函数的时候，返回的是一个响应式对象的时候如果需要对该对象进行深度监听则需要使用 deep，如果监听的对象，默认开始深度监听，flush 配置当前回调函数的执行时机，默认是组件渲染之前，可以配置 post，组件渲染之后执行，也可以配置 sync，同步执行。watchEffect 中传入是一个立即执行函数，同时在该函数中响应式追踪其依赖，当依赖变化时重新执行该函数，同时在该函数中可以传递一个清理函数，可以用于清理定时器等。同时它也是支持 options 选项。
