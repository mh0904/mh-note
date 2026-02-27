# ES6探索之旅

## es5 和 es6 继承有什么区别？

ES5 和 ES6 在继承方面的主要区别在于 ES5 是通过原型链或构造函数机制来实现继承，而 ES6 则是通过 class 和 extends 关键字来实现继承。（具体的去区别后续在class中会进一步探讨）

## ES6 中有那些新特性？

1. let 关键字和 const 关键字。
2. 数据类型：symblo 基本数据类型，表示独一无二的值。
3. 模版字符串，同时增加了新的方法 includes 等。
4. 数组对象的解构赋值。
5. 模块的导入和导出：import 和 export。
6. Map 和 Set 数据对象。
7. 增加的 Array.from 方法，可以用于将一个可迭代对象转换数组结构，数组的 for...of..循环。
8. 对象的方法：Object.is(), Object.keys(), Object.values(), Object.assign(), Object.entries()。
9. 函数新增了参数默认值、以及剩余参数、箭头函数、扩展运算符等等。
10. 增加了 promise，class 类等。
11. 增加了 Reflect 对象与 Proxy 对象。

## 常见的变量解构赋值有哪些？

**一、数组解构赋值**

```js
// 基础用法
let [x, y] = [1, 2]
console.log(x, y) // 1 2

// 跳过元素进行解构
let [, , z] = [1, 2, 3]
console.log(z) // 3

// 剩余参数
let [x, ...rest] = [1, 2, 3, 4, 5]
console.log(rest) // [2,3,4,5]

// 默认值
let [x = 0, y = 1] = [5]
console.log(x, y) // 5,1
```

**二、对象解构赋值**

```js
// 基础解构赋值
const person = { name: 'Alice', age: 30 }
const { name, age } = person
console.log(name, age) // "Alice" 30

// 嵌套对象解构赋值
let obj = {
  p: ['Hello', { y: 'World' }],
}
let {
  p: [x, { y }],
} = obj
console.log(x, y) // Hello World

// 函数参数进行解构
function greet({ name, age }) {
  console.log(`Hello, ${name}, you're ${age} years old`)
}
greet(person) // "Hello, Alice, you're 30 years old"
```

**三、字符串解构赋值**

```js
// 基础用法
let [a, b, , c, d] = 'hello'
console.log(a, b, c, d) // h e l o

// 类数组对象都有自己的length
let { length: leg } = 'hello'
console.log(leg) // 5
```

**四、数值和布尔值解构赋值**

```js
let { toString } = 123
console.log(toString === Number.prototype.toString) // true

let { toString: s } = true
console.log(s === Boolean.prototype.toString) // true
```

> [!TIP]
> 上面的数值和布尔值是原始数据类型，本身不是对象，但 JavaScript 有 “临时装箱” 机制：当对它们使用对象的操作（如访问属性、解构）时，会自动创建一个对应的包装对象（Number对象或Boolean对象）。 值得注意的是null和undefined是特殊的原始值，JavaScript 明确规定它们不能被转换为对象：

## 箭头函数和普通函数的区别?

**一、基础概念**

1. 语法更加简洁：省略了 function 关键字，当只有一个参数的时候可以省略括号，当返回一条语句的时候可以省略大括号和return

```js
const add = a => a + 10
```

2. 普通函数的this指向调用它的对象（动态绑定），箭头函数没有自己的this，继承外层作用域的this（静态绑定）

```js
const obj = {
  name: 'Test',
  normalFunc: function () {
    console.log(this.name) // "Test"（this指向obj）
  },
  arrowFunc: () => {
    console.log(this.name) // undefined（this继承自外层作用域）
  },
}
```

3. 普通函数可以使用new关键字创建实例对象，箭头函数不可以作为构造函数使用。
4. 普通函数有arguments对象，箭头函数没有arguments 对象。

**二、案例巩固**

::: code-group

```js [案例一]
let obj = {
  name: '小明',
  a: function () {
    return () => {
      console.log(this.name)
    }
  },
  b: function () {
    return function () {
      console.log(this.name)
    }
  },
}
obj.a()()
obj.b()()
```

```js [案例二]
var name = 'John'
let obj = {
  name: 'Colin',
  pop: {
    name: 'Aurello',
    getname: function () {
      return this?.name
    },
    setname: () => this?.name,
  },
}
console.log(obj.pop.getname())
console.log(obj.pop.setname())
```

```js [案例三]
function Fn() {
  Fn.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
Fn.a = function () {
  console.log(3)
}
Fn.prototype.a = function () {
  console.log(4)
}
const obj = new Fn()
Fn.a()
obj.a()
Fn.a()
```

:::

## import 和 require 的区别？

#### 一、语法规范

1. require 是 CommonJS 中提出的引入模块的语法，是node.js中默认支持的。
2. import 是ES6提出的引入模块的语法，浏览器和node.js中都支持。

#### 二、加载方式

1. import 是编译时静态加载的，必须放在文件的顶部，不可以放在条件语句中。

```js
import module from './module' // 正确

if (condition) {
  import module from './module' // 错误
}
```

2. require 是运行时动态加载的，支持条件加载。

```js
if (condition) {
  const module = require('./module')
}
```

#### 三、导入方式

1. require 可以获取整个模块的导入内容

```js
const module = require('./module')
const { func } = require('./module') // 解构获取部分导出
```

2. import 支持多种导入方式，包括默认导入、命名导入和整体导入

```js
import defaultExport from './module' // 默认导入
import { namedExport } from './module' // 命名导入
import * as module from './module' // 整体导入
```

#### 四、异步特性

1. require是同步进行加载。
2. import可以通过import()方法进行异步加载，返回promise。

```js
import('./module').then(module => {
  // 使用模块
})
```

#### 五、性能差异

**加载时机的差异**

1.  require 是运行时同步加载，当执行到该语句的时候才会进行加载模块，会阻塞后续代码的执行。
2.  import 是编译时预加载，模块的加载在代码执行前完成，不会阻塞后续代码的执行，性能更好。

**静态加载中import带来的优势：**

由于import是编译时静态加载的，浏览器或者js引擎会在代码执行前：

1. 提前分析模块的依赖关系，构建依赖树。
2. 进行树摇（Tree-shaking），剔除未使用的代码。
3. 预加载关键模块。
4. import 的静态特性允许打包工具（如 Webpack、Rollup）在构建时优化，只保留被使用的代码，减少最终打包体积，提升运行时性能。而 require 的动态加载无法被静态分析，可能导致冗余代码被打包。

**异步加载场景（import()的优势）**

1. import()支持异步加载，适合非关键性模块进行懒加载。可以减少首屏的渲染时间。

#### 六、场景分析

::: tip
例如，如果 A 模块导入 B 模块，B 模块导入 C 模块, 请问 A B C的加载顺序是怎么样的？
:::

## 浅谈一下你对于promise的理解？

#### 基础概念

1. promise是一种异步编程的解决方案，比如解决了最初的回调函数嵌套问题（回调地狱）。最初是由社区提出和实现，ES6中将其写进了标准，并统一了用法。
2. promise 是一个容器，里面保存着未来才会结束的事件，promise中有以下特点：promise中有三种状态，分别是进行中、已成功和已失败，且状态的变化只能从进行中到已成功或者进行中到已失败，状态变化后就不会再变。你可以在任何时候得到这个结果。

#### 基础用法

1. promise本身是一个构造函数，所以可以使用new关键字去创建一个promsie实例。

```js
const P = new Promise((resolve, reject) => {
  if (success) {
    resolve('操作成功的结果') // 成功时调用 resolve
  } else {
    reject(new Error('操作失败的原因')) // 失败时调用 reject
  }
})
```

> Promise构造函数接受一个函数作为参数，同时该函数中传递两个回调函数，分别是resolve和reject，resolve的作用是将promsie的状态从未完成到已成功，reject的作用是将promsie的状态从未完成到已失败。

#### Promise静态方法

**Promise.resolve(value)**

- 功能：快速创建一个已 "成功" 的 Promise 对象。
- 参数：value 可以是普通值，也可以是另一个 Promise 对象。
- 用途：将现有值转换为 Promise，便于统一异步操作的处理方式。

```js
const p = Promise.resolve(100)
p.then(value => console.log(value)) // 输出: 100
```

**Promise.reject(reason)**

- 功能：快速创建一个已 "失败" 的 Promise 对象。
- 参数：reason 表示失败的原因（通常是错误信息）。
- 用途：直接返回一个失败的 Promise，常用于模拟错误场景。

```js
const p = Promise.reject('出错了')
p.catch(err => console.log(err)) // 输出: 出错了
```

**Promise.all(iterable)**

- 功能：接收一个可迭代对象（如数组），等待所有 Promise 都 "成功" 后，返回一个新的成功 Promise，结果为所有 Promise 的返回值组成的数组。
- 特点：只要有一个 Promise 失败，就立即返回失败的结果。
- 用途：并行执行多个异步操作，等待所有操作完成后再处理结果。

```js
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
Promise.all([p1, p2]).then(values => console.log(values)) // 输出: [1, 2]
```

**Promise.allSettled(iterable)**

- 功能：类似 Promise.all，但会等待所有 Promise 都 "完成"（无论成功或失败），返回一个包含所有结果数组的 Promise。
- 结果：每个元素是一个对象，包含 status（"fulfilled" 或 "rejected"）和对应的值（value 或 reason）。
- 用途：需要获取所有异步操作的结果（无论成功失败）时使用。

```js
const p1 = Promise.resolve(1)
const p2 = Promise.reject('error')
Promise.allSettled([p1, p2]).then(results => {
  console.log(results)
  // 输出: [
  //   { status: "fulfilled", value: 1 },
  //   { status: "rejected", reason: "error" }
  // ]
})
```

**Promise.race(iterable)**

- 功能：接收一个可迭代对象，返回第一个完成（成功或失败）的结果的 Promise。
- 用途：处理 "超时" 场景，例如设置一个超时 Promise 与异步操作竞争。

```js
const p1 = new Promise(resolve => setTimeout(resolve, 100, 'p1'))
const p2 = new Promise(resolve => setTimeout(resolve, 50, 'p2'))
Promise.race([p1, p2]).then(value => console.log(value)) // 输出: "p2"（更快完成）
```

**Promise.any(iterable)**

- 功能：接收一个可迭代对象，返回第一个成功的 Promise。
- 特点：如果所有 Promise 都失败，返回一个包含所有错误的 AggregateError。
- 用途：从多个异步请求中获取第一个成功的结果（忽略失败的）。

```js
const p1 = Promise.reject('err1')
const p2 = Promise.resolve('success')
Promise.any([p1, p2]).then(value => console.log(value)) // 输出: "success"
```

#### Promise 实例方法

**then(onFulfilled, onRejected)**

- 功能：为 Promise 注册 "成功" 和 "失败" 的回调函数。
- 返回值：一个新的 Promise 对象，因此可以链式调用。
- 用途：处理异步操作的结果，是 Promise 链式编程的核心。

```js
fetchData()
  .then(data => processData(data)) // 成功回调
  .then(result => console.log(result))
  .catch(err => console.log(err)) // 捕获链中任何错误
```

**catch(onRejected)**

- 功能：专门处理 Promise 失败的回调，相当于 then(null, onRejected)。
- 用途：集中捕获链式操作中的错误，简化代码。

**finally(onFinally)**

- 功能：注册一个回调函数，无论 Promise 成功或失败都会执行。
- 用途：执行清理操作（如关闭加载动画、释放资源等）。

```js
fetchData()
  .then(data => console.log(data))
  .catch(err => console.log(err))
  .finally(() => console.log('操作完成（无论成功失败）'))
```

## promsie 如何解决回调地狱？

1. 回调地狱：指的是在编写异步编程的过程中，回调函数嵌套越来越深，导致代码的可读性和维护性极差的现象。
2. promsie 通过链式调用，和错误处理里解决异步编程中嵌套过深的问题。

:::code-group

```js [多层嵌套的回调函数]
fetchUserData(
  userId,
  function (user) {
    fetchUserPosts(
      user.id,
      function (posts) {
        fetchPostComments(
          posts[0].id,
          function (comments) {
            fetchCommentLikes(
              comments[0].id,
              function (likes) {
                // 业务逻辑
              },
              handleError,
            )
          },
          handleError,
        )
      },
      handleError,
    )
  },
  handleError,
)
```

```js [使用promise的写法]
// 链式调用，代码呈线性结构
fetchUserData(userId)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchPostComments(posts[0].id))
  .then(comments => fetchCommentLikes(comments[0].id))
  .then(likes => {
    // 业务逻辑
  })
  .catch(error => {
    // 统一处理所有错误
    handleError(error)
  })
```

:::

## 如何使用 promise 封装 ajax？

1. xmlHttpRequest 是 ajax 的核心。
2. readyState 属性，当 xmlHttpRequest 对象被创建后，readyState 属性标志当前对象的状态。

```js
function caseXml(url) {
  const p = new Promise((resolve, reject) => {
    // 1.引入 xml
    const xml = new XMLHttpRequest()
    console.log(xml)
    xml.responseType = 'json' //指定返回的结果类型
    // 2.指定请求方式，请求地址 是否异步
    xml.open('POST', url)
    // 3.发送请求
    xml.send()
    // 4.处理返回的结果
    xml.onreadystatechange = function () {
      if (xml.readyState === 4) {
        if (xml.status >= 200 && xml.status < 300) {
          resolve(xml.response)
        } else {
          reject(xml.status)
        }
      }
    }
  })
  return p
}
caseXml('https://www.fastmock.site/mock/c49f0f85fc61eb33e3f5709421b48465/hello/home').then(
  res => {
    console.log(res)
  },
  err => {
    // console.log(err);
  },
)
```

## 如何实现一个 promise 对象？

::: code-group

```js [实现Promise的构造器]
class MyPromise {
  #state = 'pending'
  #result = 'undefined'
  #changeState = function (state, res) {
    // 只有当前状态为pending时才能修改状态（状态不可逆）
    if (this.#state !== 'pending') return
    // 更新状态为目标状态（fulfilled或rejected）
    this.#state = state
    // 存储结果值
    this.#result = res
  }
  constructor(callback) {
    const resolve = res => {
      // 调用状态修改方法，传入成功状态和结果值
      this.#changeState('fulfilled', res)
    }
    const reject = res => {
      // 调用状态修改方法，传入失败状态和错误信息
      this.#changeState('rejected', res)
    }
    try {
      // 立即执行执行器函数，并传入resolve和reject
      callback(resolve, reject)
    } catch (error) {
      console.log(errror)
    }
  }
}

let P = new MyPromise((resolve, reject) => {
  resolve(456)
  setTimeout(() => {
    resolve(123)
  }, 1000)
})
```

```js [then 方法的实现和链式调用]
class Mypromise {
  // 设置状态
  #state = 'padding'
  #result = 'undefined'
  // 保存当前的状态以及 then 方法中回调
  #depThen = []

  constructor(callback) {
    const resolve = res => {
      this.#changeState('fulfilled', res)
    }
    const reject = err => {
      this.#changeState('rejected', err)
    }
    try {
      callback(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  //在这里调用 then 方法的回调
  #thenRun = () => {
    if (this.#state === 'padding') return //当状态发生改变的时候才会调用 then 方法
    while (this.#depThen.length) {
      try {
        const { onSucceed, onFail, resolve, reject } = this.#depThen.shift()
        if (this.#state === 'fulfilled') {
          // 若 onSucceed 不是函数，透传值
          if (typeof onSucceed !== 'function') {
            resolve(this.#result)
          } else {
            // 执行成功回调，获取返回值
            const ret = onSucceed(this.#result)
            // 如果返回值是 Promise，等待其完成后传递结果
            if (ret instanceof Mypromise) {
              ret.then(resolve, reject)
            } else {
              // 非 Promise 直接 resolve
              resolve(ret)
            }
          }
        } else if (this.#state === 'rejected') {
          // 若 onFail 不是函数，透传错误
          if (typeof onFail !== 'function') {
            reject(this.#result)
          } else {
            // 执行失败回调，处理返回值（同成功逻辑）
            const ret = onFail(this.#result)
            if (ret instanceof Mypromise) {
              ret.then(resolve, reject)
            } else {
              resolve(ret)
            }
          }
        }
      } catch (err) {
        // 捕获回调执行时的错误，传递给下一个 Promise
        reject(err)
      }
    }
  }

  then(onSucceed, onFail) {
    // 返回一个 promsie 对象
    return new Mypromise((resolve, reject) => {
      // 这里收集 then 方法的回调
      this.#depThen.push({
        onSucceed,
        onFail,
        resolve,
        reject,
      })
      // 如果是同步的直接执行
      this.#thenRun()
    })
  }

  #changeState = (state, result) => {
    //判断当前状态，如果不是 padding 就不执行
    if (this.#state !== 'padding') return
    this.#state = state
    this.#result = result
    //这里处理异步的情况
    this.#thenRun()
  }
}

const p = new Mypromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
p.then(
  res => {
    return res + 1
  },
  err => {
    console.log(err)
  },
).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  },
)
```

:::
