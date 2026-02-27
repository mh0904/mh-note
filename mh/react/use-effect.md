## useEffect 介绍

[官方解释：useEffect 是一个 React 钩子，可以让你 将组件与外部系统同步。](https://react.nodejs.cn/reference/react/useEffect)

个人理解：useEffect 是一个重要的 hook ，可以实现函数组件中执行各种副作用操作，（比如：发送网络请求，手动变更 DOM，记录日志等）

### 语法

1. setup 是一个执行函数。
2. dependencies 是依赖项，是可选的。

当不传 dependencies 依赖项时，组件每次渲染都会导致 setup 函数的重新执行。当 dependencies 是一个空数组的时候，在组件渲染完成后会执行 setup 函数。当 dependencies 中存在依赖项时，组件第一次渲染会和依赖项发生改变都会执行 setup 函数。

```js
useEffect(setup, dependencies?)
```

### 用法

#### 1.useEffect 分别模拟了类组件中的哪些生命周期?

1.1 将 useEffect 的依赖项设置成一个空数组，这个时候 useEffect 相当于类组件中的 componentDidMount ，在组件挂载之后执行。

```js
useEffect(() => {
  // 相当于 componentDidMount 中的代码
  console.log('组件挂载后执行')
}, [])
```

1.2 将 useEffect 的依赖项设置成监听的变量，这个时候 useEffect 相当于类组件中的 componentDidUpdate ，在组件的依赖值发生改变时执行。

```js
const Simulation = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 相当于 componentDidUpdate 中的代码，当 count 变化时执行
    console.log(`count 更新为: ${count}`)
  }, [count])

  return (
    <div className="box">
      <button onChange={() => setCount(a => a + 1)}>计数器:{count}</button>
    </div>
  )
}
```

1.3 将 useEffect 中返回一个清理函数，相当于类组件中的 componentWillUnmount，组件卸载前执行。

```js
useEffect(() => {
  // 组件挂载或更新时执行的代码
  const timer = setInterval(() => {
    console.log('每秒执行一次')
  }, 1000)

  // 返回一个清理函数，组件卸载前执行
  return () => {
    clearInterval(timer)
    console.log('组件卸载，清除定时器')
  }
}, [])
```

#### 2.连接外部系统，控制模态对话框。

接下来这个案例是关于使用 useEffect 连接外部系统，控制模态对话框的操作，先看代码。

```js
const ConnectionExternal = () => {
  const ModalDialog = ({ isOpen, children }) => {
    const ref = useRef()
    useEffect(() => {
      const dialog = ref.current
      if (!isOpen) {
        return
      }
      dialog.showModal()
      return () => {
        dialog.close()
      }
    }, [isOpen])
    return <dialog ref={ref}>{children}</dialog>
  }

  const [show, setShow] = useState(false)

  const openDialog = () => {
    setShow(true)
  }

  const onClose = () => {
    setShow(false)
  }

  return (
    <div className="box">
      <p>2.连接外部系统，控制模态对话框</p>
      <button onClick={openDialog}>open dialog</button>
      <ModalDialog isOpen={show}>
        Hello!
        <br />
        <button onClick={onClose}>Close</button>
      </ModalDialog>
    </div>
  )
}
```

上面的案例中是通过父组件中一个 show 状态去控制子组件中模块框的显示和隐藏。ModalDialog 组件通过 useEffect 的副作用让 isOpen 属性控制到 showModal 方法和 close 方法的调用。

#### 3.根据副作用的先前状态更新状态。

一个常见的场景，在页面上设置一个计数的功能，每隔一秒钟让计数器 count 加 1，当然可以当 count 作为 useEffect 的依赖项，这也会导致每一次的 count 变化，useEffect 都会执行一次清理副作用和设置副作用的操作，例如：

```js
const BeforeStateUpdate = () => {
  const [count, setCount] = useState(0)
  // 第一种使用count作为副作用的依赖值
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      console.log('intervalId', intervalId)
      clearInterval(intervalId)
    }
  }, [count])

  return (
    <div className="box">
      <div>状态：{count}</div>
    </div>
  )
}
```

对于上面的 useEffect 的频繁操作并不是必要的，可以利用 set 函数的中传递一个更新函数去解决。

```js
const BeforeStateUpdate = () => {
  const [count, setCount] = useState(0)

  // 第二种不使用count作为副作用的依赖值
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(a => a + 1)
    }, 1000)
    return () => {
      console.log('intervalId', intervalId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="box">
      <div>状态：{count}</div>
    </div>
  )
}
```

#### 4.避免将对象或者函数作为 useEffect 的依赖项。

在 useEffect 的依赖项选择中，尽量避免使用对象或者函数作为依赖，当使用函数或者对象作为依赖项并在执行函数中去修改它，这样很有可能就会造成一种死循环，如下面这种。

```js
const NeedlessObjectRely = () => {
  const [person, setPerson] = useState({
    name: 'zangsan',
    sex: 'man'
  })

  useEffect(() => {
    // 🙅错误示范： Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    setPerson({
      ...person,
      name: 'lisi'
    })
  }, [person])
  return (
    <div className="box">
      <p> </p>
      <div>姓名：{person.name}</div>
    </div>
  )
}
```

如果你必要在 useEffect 中去修改对象的属性，可以使用 set 函数时使用更新函数的形式。

```js
const NeedlessObjectRely = () => {
  const [person, setPerson] = useState({
    name: 'zangsan',
    sex: 'man'
  })

  // 🙆正确做法
  useEffect(() => {
    setPerson(p => {
      return {
        ...p,
        name: 'lisi'
      }
    })
  }, [])
  return (
    <div className="box">
      <p> </p>
      <div>姓名：{person.name}</div>
    </div>
  )
}
```

### 注意事项

1. 检查副作用中的状态更新：如果副作用中执行了会导致组件重新渲染的状态更新，并且这个更新又触发了副作用的重新执行，就可能形成无限循环。

2. 异步执行：useEffect 中的代码是异步执行的，即在组件渲染到屏幕之后执行。如果需要同步执行副作用（如立即更改 DOM 以避免闪屏），可能需要考虑使用 useLayoutEffect。 了解更多关于 useLayoutEffect 内容。

3. 避免依赖项重复变化：如果组件的多个 props 或 state 同时变化，并且这些变化都会触发相同的副作用，应该考虑如何合并这些变化以减少副作用的执行次数。
