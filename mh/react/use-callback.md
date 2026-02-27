## useCallback 介绍

[官方定义：useCallback 是一个 React 钩子，可让你在重新渲染之间缓存函数定义。](https://react.nodejs.cn/reference/react/useCallback)

个人理解：useCallback 在组件渲染期间用于缓存一个函数的引用。

### 语法

1. fn：要缓存的函数值。在下一次渲染中，如果 dependencies 没有发生改变，react 将返回相同的函数，如果 dependencies 发生改变，则返回新传递的函数。

2. dependencies：fn 代码中引用的所有反应值的列表。也可以理解是 fn 函数的依赖值。react 将使用 Object.is 对当前的依赖和上一次的依赖进行比对。

```js
const cachedFn = useCallback(fn, dependencies)
```

### 用法

#### 1.跳过组件的重新渲染？

案例：当父组件传递给子组件一个函数的时候，在父组件的中每次更改主题，都会导致子组件重新渲染。如下面的代码向子组件中传递一个 handleSubmit 函数， 在子组件中 Submit 中，即使是每次父组件主题的切换仍然会导致子组件的重新渲染，显然这种是不需要的。

```js
const Submit = memo(({ onSubmit }) => {
  let params = { ...onSubmit() }
  console.log('当输入框变化时才渲染页面', params)
  const submitRequest = () => {
    console.log(params)
  }
  return <button onClick={submitRequest}>提交</button>
})

const RepeatRendering = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isDark, setIsDark] = useState(false)

  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handleName = e => {
    setName(e.target.value)
  }

  const changeDark = e => {
    setIsDark(e.target.checked)
  }

  // 不使用 useCallback
  const handleSubmit = () => {
    return {
      email: email,
      name: name
    }
  }

  return (
    <div className="box" style={{ background: isDark ? '#000' : '#eaeaea' }}>
      <label>
        <input type="checkbox" checked={isDark} onChange={changeDark} />
        Dark mode
      </label>
      <br />
      <div>
        <label>姓名：</label>
        <input type="text" id="name" value={name} onChange={handleName} />
        <br />
        <label>邮箱：</label>
        <input type="email" id="email" value={email} onChange={handleEmail} />
        <br />
        <Submit onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
```

当切换主题的时候不需要子组件的渲染，这个时候可以在传递的函数 handleSubmit 的时候使用 useCallback 包裹一下，并且设置依赖的值是 email 和 name，只有当依赖的值发生变化的时候才去渲染子组件。

```js
const Submit = memo(({ onSubmit }) => {
  let params = { ...onSubmit() }
  console.log('当输入框变化时才渲染页面', params)
  const submitRequest = () => {
    console.log(params)
  }
  return <button onClick={submitRequest}>提交</button>
})

const RepeatRendering = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isDark, setIsDark] = useState(false)

  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handleName = e => {
    setName(e.target.value)
  }

  const changeDark = e => {
    setIsDark(e.target.checked)
  }

  // 使用 useCallback
  const handleSubmit = useCallback(() => {
    return {
      email: email,
      name: name
    }
  }, [name, email])

  return (
    <div className="box" style={{ background: isDark ? '#000' : '#eaeaea' }}>
      <label>
        <input type="checkbox" checked={isDark} onChange={changeDark} />
        Dark mode
      </label>
      <br />
      <div>
        <label>姓名：</label>
        <input type="text" id="name" value={name} onChange={handleName} />
        <br />
        <label>邮箱：</label>
        <input type="email" id="email" value={email} onChange={handleEmail} />
        <br />
        <Submit onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
```

### 注意事项

1. 依赖项数组是可选的，但如果你不提供它，useCallback 将不会在回调之间进行比较，并且每次渲染时都会返回一个新的函数实例。

2. 过度使用 useCallback 可能会导致代码难以理解和维护。通常，你应该只在将回调函数传递给子组件，并且子组件使用了 React.memo 或 shouldComponentUpdate 来避免不必要的渲染时，才使用 useCallback。

### 总结

#### 1. useCallback 和 useMemo 的区别？

答：useCallback 用于缓存函数的自身，而 useMemo 用于函数函数的结果， useCallback 并不像 useMemo 会去调用函数，而是去缓存函数，这样便于在函数的传递过程中不会造成子组件的重复渲染。

#### 2. 需要在什么地方添加 useCallback？

答：大多数的场景是不需要记忆化，如果你的项目是像绘图编辑器一样，并且大多数交互都是颗粒状的（如移动形状），这个时候 useCallback 是非常有用的。如果你想将函数作为属性传递给封装的 memo 时，可以考虑使用 usecallback 跳过那些重新渲染。
