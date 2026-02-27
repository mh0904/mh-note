## useMemo 介绍

[官方定义：useMemo 是一个 React 钩子，可让你在重新渲染之间缓存计算结果。](https://react.nodejs.cn/reference/react/useMemo)

个人理解：useMemo 用于缓存函数的结果，需要 return 一个值，学过 vue 中 computed 应该会比较容易理解。

### 语法

1. calculateValue 是用于计算要缓存的值的函数。

2. dependencies 是依赖数组，当其中任何一项依赖发生改变的时候都会重新计算。

useMemo 接收两个参数：一个“创建”函数和一个依赖项数组。这个“创建”函数会在组件首次渲染时执行，并且仅在其依赖项发生变化时再次执行。react 使用的 Object.is 对依赖的值进行比较。

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

### 用法

#### 1. 跳过组件的重新渲染？

在 react 中当一个组件重新渲染时，react 会递归的依次渲染它的子集。如下面这种当父组件切换夜间模式的时候，Child 组件会重新渲染。

```jsx
const Child = () => {
  console.log('Child重新渲染了')
  return <div>Child</div>
}

const RepeatRendering = () => {
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }
  return (
    <div className="box">
      <p>2.父组件的渲染会递归渲染它的子集</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <Child theme={isDark ? 'dark' : 'light'} />
      </div>
    </div>
  )
}
```

当然，这是我们不希望的，切换主题是不需要重新渲染子组件的。

对此，我们可以使用 memo 对不需要重新渲染的子组件进行包裹，memo 的作用是可以在属性不变的情况下跳过重新渲染组件。

```jsx
const Child = memo(() => {
  console.log('Child重新渲染了')
  return <div>Child</div>
})
const RepeatRendering = () => {
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }
  return (
    <div className="box">
      <p>3.父组件渲染时跳过子集的渲染</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <Child />
      </div>
    </div>
  )
}
```

上面的案例中，使用 memo 包裹的子组件在切换主题的时候不会重新渲染，但是有时候子组件需要接受父组件的参数用于展示，比如下面这种在父组件中传递给子组件一个对象。

```jsx
const Child = memo(({ person }) => {
  console.log('Child重新渲染了', person)
  return (
    <div>
      <div>姓名：{person.name}</div>
      <div>年龄：{person.age}</div>
    </div>
  )
})
const RepeatRendering = () => {
  const [isDark, setIsDark] = useState(false)
  const [person, setPerson] = useState({
    name: 'Jack',
    age: 10
  })
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  const addPersonAge = () => {
    setPerson(a => {
      return {
        age: a.age + 1,
        name: a.name
      }
    })
  }

  const per = {
    name: 'chen' + person.name,
    age: person.age
  }

  return (
    <div className="box">
      <p>3.父组件渲染时无法避免子组件的渲染</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <br />
        <button onClick={addPersonAge}>增加组件年龄</button>
        <Child person={per} />
      </div>
    </div>
  )
}
```

可以看出，当父组件传递一个 person 对象给子组件的时候，虽然每次 person 中属性的变化都会去渲染子组件，这是我们想要的，但是每次切换主题的时候子组件也会重新渲染，显然，这并不是我们想要的，这是由于 memo 对于传入的属性采用的是 Object.is 进行比对的，所以每次切换主题的时候生成的 person 对象和上一次的都会不同，所以会造成重新渲染子组件。

所以这个时候单纯的依赖 memo 就不起作用了，需要结合 useMemo 一起使用。

```jsx
const Child = memo(({ person }) => {
  console.log('Child重新渲染了', person)
  return (
    <div>
      <div>姓名：{person.name}</div>
      <div>年龄：{person.age}</div>
    </div>
  )
})
const RepeatRendering = () => {
  const [isDark, setIsDark] = useState(false)
  const [person, setPerson] = useState({
    name: 'Jack',
    age: 10
  })
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  const addPersonAge = () => {
    setPerson(a => {
      return {
        age: a.age + 1,
        name: a.name
      }
    })
  }

  const per = useMemo(() => {
    return {
      name: 'chen' + person.name,
      age: person.age
    }
  }, [person.age, person.name])

  return (
    <div className="box">
      <p>4.父组件渲染时有选择的渲染子集</p>
      <div className={isDark ? 'dark' : 'light'}>
        <label>
          <input type="checkbox" checked={isDark} onChange={darkChange} />
          Dark mode
        </label>
        <br />
        <button onClick={addPersonAge}>增加组件年龄</button>
        <Child person={per} />
      </div>
    </div>
  )
}

export default UseMemo
```

上面就是使用 useMemo 对依赖的 person 属性进行包裹，当依赖的 name 和 age 发生变化的就会返回一个新的对象，否则就缓存之前的对象。

#### 2. 跳过昂贵的重新计算？

案例如下：当父组件中切换主题的时候和切换选项的时候都会造成 visibleTodos 函数重新计算，显然我们想要的是当切换选项的时候 visibleTodos 重新计算，而切换祖主题的时候并不需要重新去计算 visibleTodos。

```js
function filterTodos(todos, tab) {
  if (tab === 'completed') {
    return todos.filter(item => item.completed)
  } else {
    return todos
  }
}
const TodoList = ({ tab, todos, theme }) => {
  const visibleTodos = () => {
    console.log('filterTodo重新计算了')
    return filterTodos(todos, tab)
  }

  return (
    <div className={theme}>
      <ul>
        {visibleTodos().map(todo => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

function createTodos() {
  const todos = []
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: 'Todo ' + (i + 1),
      completed: Math.random() > 0.9
    })
  }
  return todos
}

const todos = createTodos()

const ExpensiveComponent = () => {
  const [tab, setTab] = useState('completed')
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  return (
    <div className="box">
      <p>1.跳过昂贵的重新计算。</p>
      <label>
        <input type="checkbox" checked={isDark} onChange={darkChange} />
        Dark mode
      </label>
      <br />
      <button onClick={() => setTab('all')}>All</button>
      <button onClick={() => setTab('completed')}>completed</button>
      <TodoList tab={tab} todos={todos} theme={isDark ? 'dark' : 'light'} />
    </div>
  )
}
```

对于上面出现的问题，可以使用 useMemo 对 visibleTodos 方法进行包裹，这样当依赖的 todos 和 tab 发生变化的时候，visibleTodos 才会进行重新计算，而切换主题并不会造成 visibleTodos 的计算。

```js
function filterTodos(todos, tab) {
  if (tab === 'completed') {
    return todos.filter(item => item.completed)
  } else {
    return todos
  }
}
const TodoList = ({ tab, todos, theme }) => {
  const visibleTodos = useMemo(() => {
    console.log('filterTodo重新计算了')
    return filterTodos(todos, tab)
  }, [todos, tab])

  return (
    <div className={theme}>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

function createTodos() {
  const todos = []
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: 'Todo ' + (i + 1),
      completed: Math.random() > 0.9
    })
  }
  return todos
}

const todos = createTodos()

const ExpensiveComponent = () => {
  const [tab, setTab] = useState('completed')
  const [isDark, setIsDark] = useState(false)
  const darkChange = e => {
    setIsDark(e.target.checked)
  }

  return (
    <div className="box">
      <p>1.跳过昂贵的重新计算。</p>
      <label>
        <input type="checkbox" checked={isDark} onChange={darkChange} />
        Dark mode
      </label>
      <br />
      <button onClick={() => setTab('all')}>All</button>
      <button onClick={() => setTab('completed')}>completed</button>
      <TodoList tab={tab} todos={todos} theme={isDark ? 'dark' : 'light'} />
    </div>
  )
}
```

### 注意事项

1. 不要过度使用：虽然 useMemo 可以帮助优化性能，但过度使用它可能会使代码变得更加复杂和难以理解。你应该只在确实需要避免重复计算或创建时才使用它。

2. 依赖项数组很重要：确保你正确地指定了依赖项数组，以避免遗漏重要的依赖项或包含不必要的依赖项。遗漏依赖项可能会导致你的组件在依赖项变化时未能重新计算或创建值，而包含不必要的依赖项则可能导致不必要的重新计算。

3. 与 useCallback 的区别：useMemo 用于缓存计算结果，而 useCallback 用于缓存函数。如果你需要缓存一个函数，并且这个函数在依赖项不变的情况下应该保持不变，那么你应该使用 useCallback 而不是 useMemo。了解 useCallback。
