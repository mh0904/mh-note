## useLayoutEffect 介绍

[官方解释：useLayoutEffect 是 useEffect 的一个版本，它在浏览器重绘屏幕之前触发。](https://react.nodejs.cn/reference/react/useLayoutEffect)

个人理解：useLayoutEffect 和 useEffect 都是处理副作用的 hook，区别是两者的执行时机不同。useLayoutEffect 用于在 DOM 更新完成后立即执行代码，但在浏览器绘制之前。

### 语法

1. setup：setup 是 useLayoutEffect 的设置函数，设置函数会在组件被添加到 DOM 之前执行，同时在设置函数中可以返回一个清理函数，清理函数执行时机是在每次依赖（dependencies）发生变化重新渲染后，react 会使用旧值运行清理函数，然后用新值运行你的设置函数，所以组件在从 DOM 删除之前，react 会设置你的清理函数。这也是定时器清理常见用法。

2. dependencies：dependencies 是 setup 执行的依赖列表，dependencies 是可选的，用法和 useEffect 中 dependencies 的用法一直。

```js
useLayoutEffect(setup, dependencies?)
```

### 用法

#### 1. useLayoutEffect 中设置函数和清理函数的区别？

上面对于 setup 的介绍中已经阐述了设置函数和清理函数的区别，这里主要是通过代码验证上面的说法。

```js
const BasicUse = () => {
  const [num, setNum] = useState(1)

  useLayoutEffect(() => {
    console.log('设置函数', num)
    return () => {
      console.log('清理函数', num)
    }
  }, [num])

  const onChange = () => {
    setNum(a => a + 1)
  }

  return (
    <div className="box">
      <p>1.useLayoutEffect中设置函数和清理函数的区别</p>
      <button onClick={onChange}>点击加1</button>
    </div>
  )
}
```

上面的代码中，当初始化渲染的时候只执行了设置函数，同时打印了 1，当每次点击加 1 的时候，清理函数的执行时机会在设置函数之前，同时清理函数中打印的依赖值是依赖值变化之前的值，而设置函数中打印的依赖值是依赖变化后的值。

#### 2. useLayoutEffect 和 useEffect 用法对比？

先看一个案例：

```js
const ElementPosition = () => {
  const [isBig, setIsBig] = useState(false)
  const handleClick = () => {
    setIsBig(false)
  }
  // 人为减缓渲染速度
  let now = performance.now()
  while (performance.now() - now < 400) {}

  useEffect(() => {
    console.log('useEffect', isBig)
    setIsBig(true)
  }, [isBig])

  return (
    <div className="box">
      <p>1.useLayoutEffect和useEffect用法对比</p>
      <div className={isBig ? 'big' : 'small'} />
      <button onClick={handleClick}>变小</button>
    </div>
  )
}
```

上面的代码中 isBig 变量初始化渲染的时候是 false，所以一开始的时候 div 是小的，当组件渲染完成后在 useEffect 中又改变了 isBig 的状态，这个时候 isBig 变成了 ture,由于 isBig 状态的改变导致 div 会被重新渲染，这里人为的减缓了渲染的速度，所以可以看到页面中的 div 是先变小后变大。当然你点击按钮手动的改变 isBig 的状态也是可以看到 div 是先变小后变大的过程。

如果上面的代码变成 useLayoutEffect 会怎么样呢？

```js
const ElementPosition = () => {
  const [isBig, setIsBig] = useState(false)
  const handleClick = () => {
    setIsBig(false)
  }

  // 人为减缓渲染速度
  let now = performance.now()
  while (performance.now() - now < 200) {}

  useLayoutEffect(() => {
    console.log('useLayoutEffect', isBig)
    setIsBig(true)
  }, [isBig])

  return (
    <div className="box">
      <p>2.useLayoutEffect和useEffect用法对比</p>
      <div className={isBig ? 'big' : 'small'} />
      <button onClick={handleClick}>变小</button>
    </div>
  )
}
```

相同的操作，只是将 useEffect 变成 useLayoutEffect。神奇的一幕出现了，那就是无论是初始化渲染，还是点击按钮，页面中的 div 一直是大的，并没有变小，这是为什么呢？

从 useLayoutEffect 的官方介绍中就可以看出，useLayoutEffect 的执行时机是屏幕绘制之前执行，所以在 useLayoutEffect 中更新状态会阻止浏览器重新绘制屏幕。结合上面的案例，当初始化渲染的时候 isBig 是 false，当浏览器还没有开始绘制 div 的时候，突然发现在 useLayoutEffect 中又重新设置了 isBig 的状态，所以浏览器会等待 isBig 的状态改变之后同步进行绘制，这导致了我们并不能在页面上看到 div 样式的改变。

### 总结

#### 1. useEffect 和 useLayoutEffect 的区别？

1.1 执行时机不同：useEffect 的执行时机是在组件首次渲染和更新渲染之后异步执行的，这就意味着 useEffect 的执行并不会阻塞组件的渲染，也不会影响到用户的交互体验。相比之下，useLayoutEffect 的执行是在组件完成渲染之后，浏览器绘制之前同步执行的。这就意味着在 DOM 完成渲染之后，浏览器绘制之前执行的因此会阻塞浏览器的渲染。

1.2 执行的时间点不同：useEffect 的执行是在组件渲染完成后的‘提交阶段’异步执行的，这就导致它并不会阻塞浏览器的绘制。同时这种异步的特性使得它在处理如数据获取、订阅事件等需要等待的副作用操作时非常有用。useLayoutEffect 的执行时间点是在组件的渲染完成后的‘布局阶段’执行的，同时在浏览器绘制屏幕之前同步执行的。所以它的副作用并不会引起渲染跳跃，可以提供更流畅的用户体验，如果在 useLayoutEffect 中操作非常耗时时，导致页面响应过慢，影响用户操作体验。

1.3 应用场景不同：大多数的场景都是使用 useEffect，比如异步获取数据，组件卸载前清理订阅事件。useLayoutEffect 可以用于 DOM 更新后立即获取元素的尺寸和位置。
