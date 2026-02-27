## react 中受控组件和非受控组件的区别？

1. 受控组件指的是组件的值是由 react 的状态控制的，当 react 的状态改变的时候，组件的值也会随之改变，同时对于组件的修改也会映射到 react 的状态中，这通常对于内容的校验是比较有帮助的，受控组件通常是通过 props 传入组件，同时通过 react 的合成事件更新组件的状态。
2. 非受控组件指的是组件值是自己控制的，在非受控组件中通常需要使用 ref 获取组件的 dom 来获取它的值。react 官方推荐使用的也是受控组件的形式，而日常的开发中大多也都是受控组件。

## react 的生命周期有哪些？

1. constructor(props)：构造函数，通常用于初始化状态（state）和绑定事件处理程序。
2. static getDerivedStateFromProps(nextProps, prevState)：这是一个静态方法，用于根据新的 props 和旧的 state 计算并返回新的 state。
3. render()：类组件中唯一必须实现的方法，用于渲染组件的 UI。
4. componentDidMount()：在组件挂载到 DOM 后立即调用。
5. static getDerivedStateFromProps(nextProps, prevState)：与挂载阶段相同，这个方法在组件更新时也会被调用。
6. shouldComponentUpdate(nextProps, nextState)：在组件接收到新的属性或状态时被调用。
7. getSnapshotBeforeUpdate(prevProps, prevState)：在最近的渲染输出提交给 DOM 之前调用。
8. componentDidUpdate(prevProps, prevState, snapshot)：在组件更新后立即被调用
9. componentWillUnmount()：在组件卸载前立即调用。

## 函数式编程和面向对象编程的区别？

1. js 中的对象是对于具象世界中事物的一种抽象表达，当我们需要实现某个功能的时候可以把他抽象成一个“对象”，然后一遍一遍的去调用这个对象去完成你想要的功能，所以在面向对象的编程中可以看到数据和逻辑是混在一起的，数据也就是属性，逻辑也就是方法，这也是面向对象的其中一个特点，也就是封装，封装的好处就是只有在实例中才可以访问属性和方法，提高了程序的安全性。当然面向对象还有其他的特点，比如“继承”和“多态”。继承就是子类可以拥有父类的属性和方法，避免了数据的重复定义。多态意味着子类可以拥有新的方法去覆盖父类的共享行为。
2. 与之相对的是函数式编程，函数式编程又叫面向过程，函数式编程的本身是通过一个个函数去分解一个复杂的功能，然后又通过各种组合嵌套实现最终的功能。函数式编程的本质就是一个拼接积木的过程，把一个大的功能通过一个一个个函数拆解最后又拼接在一起。

## react-router 和 react-router-dom 有哪些区别？

1. React Router DOM 是基于 React Router 的一个专门针对浏览器环境的库。
2. 它扩展了 React Router 提供的功能，专门为 Web 应用提供了一些额外的组件和功能。

## HashRouter 和 BrowserRouter 有什么区别？

1. BrowserRouter：使用 HTML5 的 history API 进行路由管理，适合 Web 应用。
2. HashRouter：利用 URL 的 hash 部分来进行路由，适合一些静态文件托管的场景。

## 用 hooks 模拟 class 里的生命周期?

1、当 useEffect 中的依赖项是一个空数组的时候，可以模拟 componentDidMount（组件加载完成）。
2、如果想要模拟 componentWillUnmount（组件卸载之前），可以在 useEffect 的清理函数中实现。
3、如果要模拟 componentDidUpdata（组件更新时），可以在 useEffect 的依赖项中传入对应的 state。
4、如果要模拟 componentWillReceiveProps（当父组件传递新的 props 的时候调用），可以在 useEffect 中传入对应的 props。

## ref 可以作为其他 Hooks 的依赖项吗?

可以的，ref 的作用是用于访问 DOM 节点或者组件实例，比如当一个 input 框发生改变的时候需要执行某些操作，那么可以在 useEffect 中传入相应的 ref，这样当 ref 的 DOM 发生变化的时候就可以执行对应的 useEffct 中的函数，值得注意的是，通常我们在 useEffct 中传入的 state 和 props，如果使用 ref 作为依赖项，由于 ref 并不会造成组件的重新渲染，通常这样做可能会造成不必要的性能开销。

## useReducer 和 useState 和 useRef 的区别?

**useState 的作用：**

1. useState 是 react 函数组件中用于存储组件局部状态的 hook，可以用于生成响应式数据。
2. useState 接收一个初始化状态变量，同时返回的数组中包含了状态变量和更新状态变量的函数。通过设置函数更新状态变量，同时组件会重新渲染。

**useRef 的作用：**

1. useRef 中有两个作用，第一个是用于访问当前的组件实例或者获取当前元素的 DOM。
2. 返回一个 ref 引用对象，在引用对象中的 current 属性存储一个非响应式的数据。

**useReducer 的作用：**

1. useReducer 也是用于管理状态的 hook，与 useState 不同的是 useReducer 管理的是复杂状态逻辑。
2. 与 useState 不同的是 useReducer 接收一个 reduce 函数和一个初始化状态，返回一个状态变量和一个分发函数（dispatch 函数）。例如：const [state, dispatch] = useReducer(reducer, { age: 18 });这里的 dispatch 用于分发动作，当触发不同的 dispatch 函数会传递给 reduce 函数中不同的 action，根据不同的 action 触发相应的状态更新。
3. 由于 reducer 函数是根据不同的 action 去触发状态更新，所以 useReducer 更适合用于复杂的状态管理。

## useEffect 对比 useLayoutEffect 的区别?

**执行时机不同：**

1. 官方推荐使用 useEffect，很少的场景会使用 useLayoutEffect。useLayoutEffect 永远比 useEffect 先执行。
2. useEffect 是在 DOM 渲染完毕才会调用，也就是浏览器绘制页面完成，而且 uesEffect 是异步执行的，也就是在浏览器空闲的时候才会去调用，这样的好处就是不会阻塞浏览器的渲染过程。
3. useLayoutEffect 是在 DOM 变更（React 的更新）后且浏览器绘制页面之前执行的，而且是同步执行的，会阻塞浏览器的渲染。

**使用场景及性能：**

1. useEffect 是异步执行的，使用场景比较广泛，比如初始化页面，数据获取，清理定时器，响应式数据的变化触发操作，DOM 的操作，模拟生命周期。

## useEffect 中怎样清除上一次的一个副作用?

useEffect 的作用是指定一个副作用函数，useEffect 中传入两个参数，第一个参数是函数，第二个参数是依赖项数组。

1. 如果没有第二个参数，那么组件每一次渲染都会执行 useEffect 函数。
2. 如果传递第二个参数，会在组件第一次渲染的时候执行，同时当依赖项中任意一项发生改变的时候也会执行 useEffect 函数。
3. 在 useEffect 中清除定时器是一项常见的操作，具体的方法就是在 useEffect 的第第一个回调函数中 return 一个函数，在 return 的函数中执行清除定时器的操作。

```js
useEffect(() => {
  console.log('执行useEffect')
  const timer = setTimeout(() => {
    setCount(count + 1)
  }, 1000)
  return () => {
    console.log('卸载定时器')
    clearTimeout(timer)
  }
}, [])
```

## react 中 refs 的作用是什么?

1. 作用：refs（引用）是一种特殊的属性，用于访问和交互 React 元素或组件的 DOM 节点或组件实例。

## react 中 useCallback 和 useMemo 有什么区别？

1. 先说结论：useCallback 用于缓存一个函数引用，useMemo 用于缓存一个值。
2. 常见的场景：在 react 中当父组件向子组件传递一个固定的值，父组件更新会造成子组件重新渲染，这个时候可以使用 react.memo()对子组件进行包裹，这样父组件渲染子组件就不会渲染，但是如果父组件传递过来的是一个函数，这个时候父组件渲染，子组件仍然会重新渲染，因为使用 react.Mome()只会进行浅比较，而函数是引用数据类型。这个时候就需要使用 useCallback 包裹下传递的函数，并在 useCallback 第二个数组参数中传递依赖项，当依赖项发生改变的时候会更新子组件，如果没有更新则不会渲染子组件。
3. react 的 useMemo 用于缓存函数的计算结果，当当前函数的计算依赖项没有发生改变的时候，不会调用缓存的函数，这样就避免了大量的函数计算。

## react 事件和 html 事件区别？

1. 命名上的区别：react 事件一般称之为合成事件，命名一般采用小驼峰的形式，而原生事件一般都是全小写。
2. 函数处理的语法的上的区别：原生事件的函数一般是字符串的写法，例如：onclick="handleClick()"，而合成事件的写法是函数的形式写在花括号中，例如：onClick={handleClick}。
3. 阻止浏览器默认行为：在 HTML 事件中，可以通过 return false 的方式来阻止浏览器的默认行为。而在 React 事件中，必须明确地调用 preventDefault()方法来阻止默认行为。
4. 事件管理机制：HTML 事件是直接绑定在真实的 DOM 上的，每次 DOM 更新时，事件处理函数都会重新绑定。这可能导致性能问题，特别是在大型应用中。而 React 事件则采用合成事件（SyntheticEvent）机制，它在 document 级别上监听所有的事件，当事件发生时，React 将事件内容封装并交由真正的处理函数运行。这种机制可以兼容所有浏览器，实现更好的跨平台性，并且可以避免频繁地创建和销毁事件对象，提升性能。

## react 中的 useState 中为什么返回的是数组，而不是对象？

1.  这里和解构的特性相关，数组中的解构是根据下标依次进行解构的，而对象的解构是根据 key 进行解构，所以对象中的解构后需要重新命名，增加了代码的复杂度。

## react 中的 setState 中数据是同步更新还是异步更新？原理是什么？

1.  先说结论：在 react 的合成事件（像 react 中的 onClick 等都属于 react 自定义的合成事件）或者钩子函数中都是异步更新的，在原生事件或者定时器中是同步更新的，react 中的 setState 异步更新的好处是不用每一次状态的改变都去更新 state，如果每次状态改变都去更新 state 都会触发真实 DOM 的更新，会极大的消耗性能，但是等待所有的状态改变后一起更新，极大的节省了性能。
    具体原理如下：
    这里还是用最简单的语言让你理解：在 React 的 setState 函数实现中，会根据 isBatchingUpdates(默认是 false) 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。
    这样你就可以理解为什么原生事件和 setTimeout/setinterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 isBatchingUpdates 的时候默认就是 false，那么就会同步更新。
    如果想要在合成事件中拿到 setState 更新后 state 状态，可以在 setState 的第二个参数的回调函数中获取。

## 说说对 React 中类组件和函数组件的理解？有什么区别？

1. 类组件是有状态的组件，可以定义自己的 state，函数式组件默认是没有状态的，在 hooks 出现的时候可以使用 useState 去定义自己的状态。
2. 类组件中有自己的 this，函数组件中没有 this 问题
3. 类组件中有生命周期，函数组件中没有生命周期，默认可以使用 useEffect 代替。

## react 中 state 和 prop 的区别，改变 state 将对页面有什么影响？

1. props 放初始化数据，是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件，组件本身不能修改自己的 props。
2. state 代表的是一个组件内部自身的状态，改变一个组件自身状态，从语义上来说，就是这个组件内部已经发生变化，有可能需要对此组件以及组件所包含的子孙组件进行重渲染。
