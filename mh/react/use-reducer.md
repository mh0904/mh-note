## useReducer 介绍

[官方介绍： useReducer 是一个 React 钩子，可让你将 reducer 添加到组件中。](https://react.nodejs.cn/reference/react/useReducer)

个人理解： useReduce 与 useState 类似，不同的是 useReduce 用于管理组件中较为复杂的状态逻辑。

### 语法

1. reducer：一个纯函数，接受两个参数，第一个参数是当前状态，第二个参数是需要执行的 action 操作对象，并更加不同的操作类型来更新不同的状态，值得注意的是这个需要返回的是一个新的状态对象，而不是对原来的对象修改。

2. initialArg：初始状态，可以是任意类型，用于组件的初始渲染。

3. init？：可选，应该返回初始状态的初始化函数。如果未指定，则初始状态设置为 initialArg。否则，初始状态设置为调用 init(initialArg) 的结果。

4. state： 当前状态。在第一次渲染期间，它被设置为 init(initialArg) 或 initialArg（如果没有 init）。

5. dispatch： 用于状态的更新，并触发重新渲染。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

### 用法

#### 1. 增加和减少年龄。

```js
const Counter = () => {
  function reducer(state, action) {
    if (action.type === 'incremented_age') {
      return {
        age: state.age + 1
      }
    } else if (action.type === 'decrement_age') {
      return {
        age: state.age - 1
      }
    }
    throw Error('Unknown action.')
  }

  const [state, dispatch] = useReducer(reducer, { age: 10 })

  const incrementClick = () => {
    dispatch({
      type: 'incremented_age'
    })
  }

  const decrementClick = () => {
    dispatch({
      type: 'decrement_age'
    })
  }
  return (
    <div className="box">
      <p>1. 增加和减少年龄</p>
      <button onClick={incrementClick}>Increment age</button>
      <button onClick={decrementClick}>decrement age</button>
      <p>Hello! You are {state.age}.</p>
    </div>
  )
}
```

上面的代码中初始化状态是一个对象，当触发不同的点击事件会执行不同的 dispatch 函数，dispatch 函数会触发 action 的更新，所以在 reducer 函数中，通过判断不同的 action 中操作状态执行执行状态的更新。

#### 2. 待办事项案例。

```jsx
let ids = 3
const TodoList = () => {
  const initTasks = [
    { id: 0, text: '吃早饭', done: true },
    { id: 1, text: '上学校', done: false },
    { id: 2, text: '去游乐园', done: false }
  ]

  function reducer(tasks, action) {
    switch (action.type) {
      case 'add':
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false
          }
        ]
      case 'checked':
        return tasks.map(item => {
          if (item.id === +action.id) {
            item.done = !item.done
          }
          return item
        })
      case 'delete':
        return tasks.filter(item => item.id !== +action.id)
      case 'edit':
        return tasks.map(item => {
          if (item.id === +action.id) {
            item.text = action.text
          }
          return item
        })
      default:
        throw Error('Unknown action.')
    }
  }

  const [state, dispatch] = useReducer(reducer, initTasks)
  const [text, setText] = useState('')
  const [switchover, setSwitchover] = useState(true)

  const handleTextChange = e => {
    setText(e.target.value)
  }

  const handleAddClick = () => {
    dispatch({
      type: 'add',
      text: text,
      id: ids++
    })
  }

  const handleCheckChange = e => {
    dispatch({
      type: 'checked',
      id: e.target.id
    })
  }
  const handleDeleteClick = e => {
    dispatch({
      type: 'delete',
      id: e.target.id
    })
  }

  const handleEditChange = e => {
    dispatch({
      type: 'edit',
      id: e.target.id,
      text: e.target.value
    })
  }

  const handleClick = () => {
    setSwitchover(a => !a)
  }

  return (
    <div className="box">
      <p>2. 代办事项的案例</p>
      <label>
        <input value={text} onChange={handleTextChange} />
        <button onClick={handleAddClick}>add</button>
      </label>
      <ul>
        {state.map(item => {
          return (
            <li key={item.id}>
              <input type="checkbox" id={item.id} checked={item.done} onChange={handleCheckChange} />
              {switchover ? (
                <span>{item.text}</span>
              ) : (
                <span>
                  <input id={item.id} type="text" value={item.text} onChange={handleEditChange} />
                  <button onClick={handleClick}>Save</button>
                </span>
              )}
              <button onClick={handleClick}>Edit</button>
              <button id={item.id} onClick={handleDeleteClick}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

上面是一个比较典型的案例，当我们的初始状态是一个数组的时候，这个时候使用 useReducer 可以集中的管理状态。

#### 3. 避免重新创建初始值。

```js
let ID = 51
const AvoidRepeatCreate = () => {
  function createInitialState() {
    const initialTodos = []
    for (let i = 0; i < 50; i++) {
      initialTodos.push({
        id: i,
        text: '列表' + (i + 1)
      })
    }
    console.log('重新执行了')
    return initialTodos
  }

  function reducer(todos, action) {
    if (action.type === 'add') {
      return [
        {
          text: action.value,
          id: ID++
        },
        ...todos
      ]
    }
  }
  const [text, setText] = useState('')
  // 没有使用初始化函数
  // const [state, dispatch] = useReducer(reducer, createInitialState())

  // 使用初始化函数
  const [state, dispatch] = useReducer(reducer, null, createInitialState)

  const handleChange = ({ target }) => {
    setText(target.value)
  }

  const handleAdd = () => {
    dispatch({
      type: 'add',
      value: text
    })
  }

  return (
    <div className="box">
      <p>3. 避免重新创建初始值。</p>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>add</button>
      <ul className="second-ul">
        {state.map(item => {
          return <li key={item.id}> {item.text}</li>
        })}
      </ul>
    </div>
  )
}
```

上面的语法中也提到了这个问题，如果 useReducer 中的第三个参数是初始化函数，用于初次渲染，如果提供了初始化函数则会在后续的渲染中忽略 createInitialState 的计算，否则会在每次输入框改变时都会去重新调用，如果创建了较大的数组或者昂贵的计算则造成不必要的性能浪费。

值得注意的是，这里的 useReducer 第二个参数传递的是 null，这是由于 createInitialState 函数中没有依赖初始值。

### 注意事项

1. dispatch 函数仅更新下一次渲染的状态变量，这意味着你在调用 dispatch 函数后拿到的还是上一次的状态值。

```js
dispatch({ type: 'incremented_age' }) // 用 43 进行重新渲染
console.log(state.age) // 还是 42！

setTimeout(() => {
  console.log(state.age) // 一样是 42！
}, 5000)
```

2. 这里的状态更新也是采用批量的状态更新模式，这是为了防止单个事件期间多次重新渲染。这里可以参考 useState。
