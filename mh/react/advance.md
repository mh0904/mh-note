## react 和 vue 两者有哪些区别？{##1}

1. **团队介绍：** react 和 vue 都是用于构建用户界面的 javascript 库，不同的 vue 是尤雨溪创建，react 是 Facebook 创建。
2. **编码方式：** react 和 vue 都是采用虚拟 DOM，不同的是编码方式上 react 采用的 jsx 语法，vue 采用的是模版语法。jsx 语法的优点在于允许开发者在 js 中去编写 html 代码。vue 则保留了 html、css、js 分离的写法。
3. **数据修改：** react 中采用的是单向数据流的方式，即不允许子组件修改父组件传入的 props，但是组件的 state 是允许修改的，在函数式编程之前对于 state 的修改采用的 setState 的方式，而 vue2 中也是不允许子组件修改父组件传递的 props，组件和 DOM 之间可以采用 v-model 进行双向数据绑定。
4. **监听数据变化以及更新过程：** react 监听数据变化主要是依赖其状态管理机制和虚拟 DOM，react 中通过 state 和 props 来管理状态，当 react 组件的状态或属性发生变化的时候会触发当前组件的重新渲染。react 采用的虚拟 DOM 来优化更新的过程，虚拟 DOM 是 react 在内存中维护的一棵树结构，它描述了当前组件的状态。react 通过差异算法，当属性和状态发生变化的时候会创建一棵新的虚拟 DOM 树，而新旧虚拟 DOM 树比对的过程叫做调和，通过比对新旧 DOM 树寻找到最小的变化量，将这些变化应用到真实的 DOM 中，从而实现高效的更新。 vue2 中的数据监听采用的 Object.defineProperty()对 data 上的属性进行劫持，并对劫持的属性添加 getter/setter，当设置数据时触发 setter 方法，从而进一步触发 vm 上的 watcher 方法，当数据更改时 vm 会触发响应的视图更新，vue 采用的精准更新策略。
5. **周边生态对比：** taro 基于 react 衍生的多端小程序，uni-app 是基于 vue 衍生的多端小程序。 vue 中通常对于全局状态管理采用的 vuex 或者 vue3 中采用的 pinai 的方式，react 中使用的 redux 或者 mobx 的方式。

## react 中的 createContext 的实现原理? {##2}

基础用法：
1、createContext 用于创建 context 对象，主要解决 react 中 props 跨组件透传的问题。
2、首先在父组件中使用 createContext 创建一个 context 对象，const MyContext = createContext(0);
3、使用 Provider 包裹组件，同时需要使用 value 定义需要传递的参数：

```js
<MyContext.Provider value={'某个值'}>
  <DeeplyNestedComponent />
</MyContext.Provider>
```

4、在需要接受的子组件中使用 useContext 接受传递过来的参数：
import { MyContext } from './MyContext';  
 const value = useContext(MyContext);

原理：
1、context 对象中包含两个组件：Provider 组件，作用是在组件中注入一个值。
2、Consumer 组件：用于接收 Provider 传递的值。
3、当 Provider 组价中的 value 发生改变的时候会触发所有的 Consumer 更新流程。
4、出于性能的考虑，react 提供了 useContext 的 hook，可以用于直接读取 context 值。

## mobx 和 redux 的区别？{##3}

**redux 的介绍：**

1. redux 和 mobx 都是目前主流的全局状态管理的库。redux 遵循单向数据流的原则。例如用户点击按钮的时候会触发一个 dipatch 函数，dispatch 函数用于分发 action，例如：`dispatch({type: 'counter/increment'})`,这个时候 store 会用之前的 state 和 action 去运行 reducer 函数，并返回新的 state，同时会通知所有用到当前 state 的 ui 去更新渲染。

图解：
![alt text](https://cn.redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

2. redux 的三大设计原则是：单一数据源、state 只读、纯函数执行修改。
   2.1 单一数据源：单一数据源指的是全局的 state 都存储在一个 store 的对象树中。

   ```js
   console.log(store.getState())
   ```

   2.2 state 是只读的：即对于 state 的修改必须触发 action，这样做的目的是可以保证对于 state 的修改被集中化管理。

   ```js
   store.dispatch({
     type: 'todoList/addList',
     payload: 1,
   })
   ```

   2.3 纯函数执行：Action 触发修改依靠的是 Reducer 纯函数，Reducer 会接收 State 和对应 Action，返回修改后的新 State；

   ```js
   import { createSlice } from '@reduxjs/toolkit'
   export const listSlice = createSlice({
     name: 'todoList',
     initialState: {
       list: [
         { name: '苹果', price: '$3000' },
         { name: '华为', price: '$1000' },
       ],
     },
     reducers: {
       addList: (state, action) => {
         state.list = [...state.list, action.payload]
       },
     },
   })
   // 每个 case reducer 函数会生成对应的 Action creators
   export const { addList } = listSlice.actions
   export default listSlice.reducer
   ```

3. Redux 是一个用于管理应用程序中全局状态的库
   3.1 Redux 通常与 React-Redux 库一起使用，用于将 Redux 和 React 集成在一起
   3.2 Redux Toolkit 是编写 Redux 逻辑的推荐方式

**mobx 的介绍：**

1. mobx 目前最新的版本是 6，版本 4 和版本 5 已不再支持，同时版本 6 不推荐使用装饰器语法，原因是不是 es 的标准，MobX >=5 版本运行在任何支持 ES6 proxy 的浏览器。
2. 核心概念：observable 用于添加一个可观测的数据对象。computed 相当于 vue 中的计算属性。action 用于修改状态。
3. mobx 从版本 5 开始使用 proxy 作为数据劫持，在这之前使用的 Object.defineProperty()。

## vue 和 react 的区别？{##4}

设计理念：
1、vue 采用的是模版声明式渲染，这使得 HTML 模版和 javascript 的代码之间更加清晰和直观，易于理解。
2、react 采用的 jsx 语法，它是 javascript 语法的一种扩展，可以很好的融合 HTML 和 javascrit。同时 react 更加注重组件化思想和函数式编程。

状态管理：
1、vue 采用的是 MVVM 的设计模式，即响应式系统，即数据发生变化则页面更新，同时页面的变化也会触发数据的更新，vue 在状态管理上采用的 props 和 state，同时可以使用 props 和 event 的方式进行组件通信，对于层级嵌套比较深的组件可以使用 eventBus 的方式通信以及 vuex 进行全局状态管理。
2、react 是也是通过 state 和 props 来管理自己的状态，同时对于复杂的状态管理可以采用 redux 和 mobx 进行管理。

学习曲线和生态系统：
1、对于初学者来说，vue 的上手更加简单，同时随着 vue3 的升级，vue 的性能和优势也越来越明显。
2、react 的发展更久，其周边的生态和社区更加完善，react 的对于大型项目的可扩展性更强。

vue 和 react 数据绑定:
1、vue 是采用双向数据绑定的，这就意味着数据的变化会触发视图的更新，视图的变化同时也会导致数据的变化，vue 是在模版中绑定数据，会自动追踪数据的依赖关系。
2、react 是采用单向数据流，即数据只能从父级流向子级，同时子级不能修改父级的状态，当父级状态发生改变的时候，父级和子级组件都会被重新渲染。当然 react 也可以实现 vue 中双向数据绑定，只不过是使用受控组件，这也是 react 官方推荐使用的，将表单的元素的值保存在 react 的状态中，并通过事件处理函数更新状态，实现双向数据绑定。

## 为什么虚拟 DOM 会提升性能？{##5}

1、当 react 中属性和状态发生改变的时候，react 都会生成一个新的虚拟 DOM 树，然后与旧的虚拟 DOM 树进行比较，这个比较的过程叫做调和，或者叫差异检测，当比对完成之后会计算出最小的 DOM 操作集合，然后去更新真实的 DOM，相对比直接更新真实的 DOM，这种操作更加的高效，因为操作 DOM 的行为是昂贵的，会引发重绘和回流。
2、使用虚拟 DOM 可以更好的实现跨平台兼容，因为它可以轻松的在不同环境下渲染出类似的 UI。
3、同时使用虚拟 DOM 和模块化组件的结合可以使开发者提升开发效率，react 中提供了生命周期和钩子，可以使开发者精准的控制组件的渲染和更新的过程。
注意事项：虽然虚拟 DOM 在提升性能方面有很多的优势，但是当组件树非常庞大且频繁更新的时候，虚拟 DOM 的过程将变得相对的昂贵。
