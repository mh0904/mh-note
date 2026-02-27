## 刷新浏览器之后，vuex 的数据是否存在？如何解决？

解释：刷新浏览器会导致 vuex 中的数据丢失，这是由于 vuex 中存储的数据是存储在内存中的，刷新浏览器会导致整个页面重新刷新，所以 vuex 中的数据会重新初始化。解决方案是使用本地存储。

## 简单说下 vuex 中的属性？简述 vuex 的数据传递流程？vuex 中为什么把异步操作封装在 action，把同步操作放在 mutations？

    总结：
      State 特性
      Vuex 就是一个仓库，仓库里面放了很多对象。其中 state 就是数据源存放地，对应于一般 Vue 对象里面的 data。
      state 里面存放的数据是响应式的，Vue 组件从 store 中读取数据，若是 store 中的数据发生改变，依赖这个数据的组件也会发生更新
      它通过 mapState 、mapGetters 把全局的 state 和 getters 映射到当前组件的 computed 计算属性中
      获取状态的方式 this.\$store.state.xx

      Getter 特性
      getters 可以对 State 进行计算操作，它就是 Store 的计算属性
      虽然在组件内也可以做计算属性，但是 getters 可以在多组件之间复用
      如果一个状态只在一个组件内使用，是可以不用 getters

      Mutation 特性
      Mutation 是变更 state 的唯一方式，mutation 中只能同步提交，异步在这里提交 devtools 监测不到数据的变化。
      使用 commit 方式提交 mutation，同时可以向 store.commit 中传入其他的参数，即 mutation 的载荷。

      Actions 特性
      Action 类似于 mutation，不同在于 Action 提交的是 mutation，而不是直接变更状态；
      action 中可以执行异步操作。
      actions 使用 store.dispatch() 方法触发 mutations ，

      Module 特征
      由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
      为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
      当组件进行数据修改的时候我们需要调用 dispatch 来触发 actions 里面的方法。actions 里面的每个方法中都会 有一个 commit 方法，当方法执行的时候会通过 commit 来触发 mutations 里面的方法进行数据的修改。 mutations 里面的每个函数都会有一个 state 参数，这样就可以在 mutations 里面进行 state 的数据修改 ，当数据修改完毕后，会传导给页面。页面的数据也会发生改变

      区分 actions 和 mutations 并不是为了解决状态问题，而是为了能用 devtools 追踪状态变化。

      事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步状态态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。
      同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。

      如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。
