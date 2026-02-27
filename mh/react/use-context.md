## useContext 介绍

[官方介绍：](https://react.nodejs.cn/reference/react/useContext) useContext 是一个 React 钩子，可让你从组件中读取和订阅 上下文。

个人理解：useContext 的出现主要解决跨组件多层级传递 props 问题，使用 useContext 可以极大的简化组件间的状态管理。

### 语法

useContext：可以组件的顶层使用 useContext 读取和订阅上下文，这里的 SomeContext 就是上下，它是由最外层的数据共享组件使用 createContext 方法创建。

value：value 就是接受使用 Provider 组件传递的值。

```js
const value = useContext(SomeContext)
```

### 用法

1. 创建 React 上下文对象。
   解释：上下文对象通常用于根组件或者全局数据共享的地方

```js
const ThemeContext = createContext(null)
```

2. 将上下文对象提供给子组件。
   解释：这里使用 Provider 组件包裹需要访问 context 值的组件。所有被<ThemeContext.Provider/>包裹的组件都可以访问到 value 属性传递的值。

```js
<ThemeContext.Provider value={theme}>
  <ChildComponent />
</ThemeContext.Provider>
```

3. 在需要使用的地方通过 useContext 获取上下文对象
   解释：使用 useContext(ThemeContext)来获取 context 的值，这里的 ThemeContext 就是第一步中创建的 ThemeContext 对象。

```js
const data = useContext(ThemeContext)
```

### 应用案例

#### 1. 切换主题更新子组件的主题。

```js
const UpdateState = () => {
  const Panel = ({ children }) => {
    return <section className="panel">{children}</section>
  }

  const Button = ({ children }) => {
    const theme = useContext(ThemeContext)
    return (
      <button className="button" style={{ background: theme }}>
        {children}
      </button>
    )
  }

  const UpdateForm = () => {
    return (
      <Panel>
        <Button>Sign up</Button>
        <Button>Log in</Button>
      </Panel>
    )
  }

  const [theme, setTheme] = useState('#eaeaea')
  const ThemeContext = createContext(null)

  const handleCheckChange = e => {
    e.target.checked ? setTheme('gray') : setTheme('#eaeaea')
  }
  return (
    <div className="box" style={{ background: theme }}>
      <p>1.切换主题更新子组件的主题</p>
      <ThemeContext.Provider value={theme}>
        <UpdateForm />
        <label>
          <input type="checkbox" checked={theme === 'gray'} onChange={handleCheckChange} />
          <span> Use dark mode</span>
        </label>
      </ThemeContext.Provider>
    </div>
  )
}
```

上面的案例中，如果不创建 context 上下文，并通过 Provider 将变换的主题参数传递下去，则需要使用 props 一层一层的传递下去，如果嵌套的层级非常多，这是一件非常麻烦的事情，而使用 context 则很巧妙的解决这个问题，你只需要在需要变换主题的组件中使用 useContext 去获取当前的主题即可。

### 注意事项

1. useContext 只能在函数组件的顶层作用域中使用，不能在循环、条件语句或嵌套函数中使用。

2. 当 Provider 的 value 值发生变化时，所有使用该 context 的组件都会重新渲染。因此，在使用时需要注意避免不必要的重渲染，可以通过使用 React.memo、useMemo 或 useCallback 等优化手段来减少渲染次数。
