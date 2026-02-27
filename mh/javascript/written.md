## 美图：如何找出字符串中出现最多的字符？

1. let str = "aaabbbbacccdde";

```js
let str = 'aaabbbbacbccdde'
let obj = str.split('').reduce((pred, item, index, arr) => {
  arr.indexOf(item) === index ? (pred[item] = 1) : pred[item]++
  return pred
}, {})
let maxNum = Math.max(...Object.values(obj))
for (let key in obj) {
  if (obj[key] === maxNum) {
    console.log(key)
  }
}
```

第一步：声明一个全局变量对象字面量，遍历当前的字符串，判断当前的字符中的每一个字符是否存在当前的字面量的 keys 中，如果存在则当前的字符进行自增 1，如果不存在则赋值默认为 1，这样可以获取一个新的对象，对象中存储每一个字符出现的次数。

```js
let str = 'aaabbbbacccdde'
let obj = {}
for (let i = 0; i < str.length; i++) {
  if (Object.keys(obj).includes(str[i])) {
    obj[str[i]]++
  } else {
    obj[str[i]] = 1
  }
}
console.log(obj) // {a: 4, b: 4, c: 3, d: 2, e: 1}
```

第二种：拿到对象后，通过 Object.values()的方式取出当前 value 组成的数组，然后通过 Math.max()函数取出最大的数，再用 for..in 遍历当前的对象，通过 value 去查找 key。

```js
// 第一种
let obj = { a: 4, b: 4, c: 3, d: 2, e: 1 }
for (let key in obj) {
  if (obj[key] === Math.max(...Object.values(obj))) {
    console.log(key) // a,b
  }
}

// 第二种
var max = 0
let num = ''
for (var key in obj) {
  if (max < obj[key]) {
    max = key
    num = obj[key]
  }
}
console.log({ [max]: num }) //{a: 4}
```

## 美团：数组去重排序: let arr = [1, 4, 6, [2, 1, 3, 0, [19, 1, 23, 6, 32, 10]]];

```js
let arr = [1, 4, 6, [2, 1, 3, 0, [19, 1, 23, 6, 32, 10]]]
let newArr = []
function toNewArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) ? toNewArr(arr[i]) : newArr.push(arr[i])
  }
}
toNewArr(arr)
let filterArr = newArr.filter((item, index, arr) => arr.indexOf(item) === index)
console.log(filterArr)
```

## 美团：如何实现批量打印数字：比如有 0-100 个数字，第一秒打印 0-4，第二秒打印 5-9，依次类推，直至打印完所有数字。

```js
// 第一种使用 setInterval 实现
let arr = []
for (let i = 0; i < 101; i++) {
  arr.push(i)
}
let index = 0
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    console.log(arr[index]) //
    index++
  }
}, 1000)

// 使用 setTimeout 实现
let i = 0
function run() {
  for (let j = 0; j < 5 && i < 100; i++, j++) {
    console.log(i)
  }
  setTimeout(() => {
    run()
  }, 1000)
}
run()
```

## 美团:将 name 相同的项目合并，他们的 menu 值相加（数据合并）

```js
let arr = [
  { name: 'a', menu: 2 },
  { name: 'g', menu: 2 },
  { name: 'a', menu: 21 },
  { name: 'c', menu: 4 },
  { name: 'g', menu: 33 },
  { name: 'g', menu: 33 },
  { name: 'c', menu: 44 },
]

// 转换后

let arr = [
  { name: 'a', menu: 23 },
  { name: 'g', menu: 68 },
  { name: 'c', menu: 48 },
]
```

答案：

```js
// 第一种方式
let keys = Array.from(new Set(arr.map(item => item.name)))
let all = keys.map(item => {
  let values = 0
  for (let i = 0; i < arr.length; i++) {
    if (item == arr[i].name) {
      values = arr[i].menu + values
    }
  }
  return {
    name: item,
    menu: values,
  }
})
console.log(all)

// 第二种方式
let all = Object.entries(
  arr.reduce((pred, item) => {
    pred[item.name] = pred[item.name] + item.menu || item.menu
    return pred
  }, {}),
).map(item => {
  return {
    name: item[0],
    menu: item[1],
  }
})
console.log(all)
```

## 美团：将 array1 转换成 array2

```js
let array1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
]

let array2 = [
  [5, 1],
  [6, 2],
  [7, 3],
  [8, 4],
]
```

解答：

```js
let array1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
]

let newArr = array1[0].map((item, index) => [array1[1][index], item])
console.log(newArr)
```

对上面的题目进行变形，还是将 array1 转换成 array2?

```js
let array1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20],
]

let array2 = [
  [17, 13, 9, 5, 1],
  [18, 14, 10, 6, 2],
  [19, 15, 11, 7, 3],
  [20, 16, 12, 8, 4],
]
```

转换后

```js
let array2 = []
let rows = array1.length
let cols = array1[0].length
for (let index = 0; index < cols; index++) {
  let aa = []
  for (let i = 0; i < rows; i++) {
    aa.push(array1[rows - i - 1][index])
  }
  array2.push(aa)
}
console.log(array2)
```

## 盛派：面试题

```js
// 第一题考察类相关知识
class A {
  constructor() {
    this.name = '123'
  }
  sayName() {
    console.log(this.name)
  }
}

class B extends A {
  constructor() {
    super()
    this.name = '456'
  }
}
let obj = new B()
obj.sayName()

// 第二题考察 promise 的链式调用
Promise.reject('error')
  .then(
    () => {
      console.log('success1')
    },
    () => {
      console.log('error1')
    },
  )
  .then(
    () => {
      console.log('success2')
    },
    () => {
      console.log('error2')
    },
  )

// 第三题 考察定时器
function getsomething() {
  return setTimeout(() => {
    return 'hello'
  })
}
let something = getsomething()
console.log(something)

// 第四题 考察 this 指向
window.n = 'window name'
let obj = {
  n: 'obj name',
  sayN() {
    console.log(this.n)
  },
}
let fn = obj.sayN
fn()

// 第五题 考察 this 指向
window.n = 'window name'
let obj = {
  n: 'obj name',
  sayN() {
    console.log(this.n)
  },
}
obj.sayN()

// 第六题 考察 this 指向
window.n = 'window name'
let obj = {
  n: 'obj name',
  sayN: () => {
    console.log(this.n)
  },
}
obj.sayN()

// 第七题 考察 this 指向
var a = 1
function fn() {
  var a = 2
  function a() {
    console.log(3)
  }
  return a
  function a() {
    fconsole.log(4)
  }
}
var b = fn()
console.log(b)
```

## 协创：面试题

```js
// 第一题 考察事件循环
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
}, 0)

new Promise(function (resolve, reject) {
  console.log(4)
  setTimeout(function () {
    console.log(5)
    resolve(6)
  }, 0)
}).then(res => {
  console.log(7)
  setTimeout(() => {
    console.log(res)
  }, 0)
})
console.log(1)

// 第二题 盒模型,问题：box-sizing的属性值为content-box和border-box时，div的宽度分别为：
// div {
//     width: 200px;
//     border: 25px;
//     padding: 25px;
// 	  box-sizing: [content-box|border-box];
// }
// 答案： 总宽度分别是300px 200px

// 第三题 下面js代码执行后终端输出内容是什么？
var str = 'abc'
str += 1
var test = typeof str
if (test.length == 7) {
  var sign = 'typeof返回结果可能为String'
}
console.log(sign)

// 第四题 下面js代码执行后终端输出内容是什么？
var a = []
a.push(1, 2)
console.log(a)
a.shift(3, 4)
console.log(a)
a.concat([5, 6])
console.log(a)
a.splice(0, 1, 2)
console.log(a)

// 第五题 下面js代码执行后终端输出内容是什么？
function fn(a) {
  console.log(a)
  var a = 123
  console.log(a)
  function a() {}
  console.log(a)
  console.log(b)
  var b = function () {}
}
fn(2)

// 第六题 使用三目运算符简化以下代码（function括弧内代码缩减成一行）？
function getPayCode(payType) {
  let payCode = null
  if (payType === '支付宝') {
    payCode = 1
  } else if (payType === '微信') {
    payCode = 2
  }
  console.log(payCode)
  return payCode
}
// 改造后
function getPayCode(payType) {
  payType === '支付宝' ? (payCode = 1) : payType === '微信' ? (payCode = 2) : (payCode = null)
  return payCode
}
```

## 美团：如何将下面的数组转换转换成树结构

```js
const arr = [
  { id: 1, name: '节点 1', parentId: null },
  { id: 2, name: '节点 1-1', parentId: 1 },
  { id: 3, name: '节点 1-2', parentId: 1 },
  { id: 4, name: '节点 1-1-1', parentId: 2 },
  { id: 5, name: '节点 1-1-2', parentId: 2 },
  { id: 6, name: '节点 1-2-1', parentId: 3 },
  { id: 7, name: '节点 1-2-3', parentId: 3 },
  { id: 8, name: '节点 1-1-1-1', parentId: 4 },
  { id: 9, name: '节点 1-1-1-2', parentId: 4 },
  { id: 10, name: '节点 1-1-2-1', parentId: 5 },
  { id: 11, name: '节点 1-1-2-2', parentId: 5 },
]
```

解答：

```js
// 第一种实现思路
function arrtoTree(arr, parentId = null) {
  return arr.reduce((pred, item) => {
    if (item.parentId === parentId) {
      const children = arrtoTree(arr, item.id)
      if (children.length) {
        item.children = children
      }
      pred.push(item)
    }
    return pred
  }, [])
}
console.log(arrtoTree(arr))

// 第二种实现思路
let result = []
let map = arr.reduce((pred, item) => {
  pred[item.id] = item
  return pred
}, {})
for (let item of arr) {
  if (!item.parentId) {
    result.push(item)
  }
  if (item.parentId in map) {
    let parent = map[item.parentId]
    parent.children = parent.children || []
    parent.children.push(item)
  }
}
console.log(result)
```

## 美团：当 a=？下面的等式成立

```js
if (a == 1 && a == 2 && a == 3) {
  console.log('Hello Word')
}
```

解答：

## 实现一个 add 函数，让它满足一下条件

```js
add(1)(2)(3)() // ====>输出 6
add(1, 2, 3)() // ====>输出 6
add(1, 2)(3)(4, 5, 6)(7, 8)() //====>输出 36
add(1, 2)(3, 4, 5, 6)() //====>输出 21
```

解答：

```js
function add(...args) {
  let sum = 0
  // 返回一个函数，这个函数可以继续接收参数并累加
  function next(...nextArgs) {
    sum += Array.isArray(nextArgs[0])
      ? nextArgs.flat().reduce((a, b) => a + b, 0)
      : nextArgs.reduce((a, b) => a + b, 0)
    // 如果当前没有传入任何参数，返回累加的和
    if (nextArgs.length === 0) {
      return sum
    }
    // 否则返回一个新的函数，用于继续累加
    return next
  }
  // 初始调用时，如果有参数，则先累加这些参数
  if (args.length > 0) {
    sum += Array.isArray(args[0])
      ? args.flat().reduce((a, b) => a + b, 0)
      : args.reduce((a, b) => a + b, 0)
  }
  // 返回用于继续累加的函数
  return next
}
// 测试
console.log(add(1)(2)(3)()) // 输出 6
console.log(add(1, 2, 3)()) // 输出 6
console.log(add(1, 2)(3)(4, 5, 6)(7, 8)()) // 输出 36
console.log(add(1, 2)(3, 4, 5, 6)()) // 输出 21
```

## 假设前端有 n 个请求，想每次只请求 3 个，直到请求完成，如何写？

## 如果有三个 promise，想串行执行如何写？

## 头条：写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

```js
function mySetInterVal(fn, a, b) {
  this.a = a
  this.b = b
  this.time = 0
  this.handle = -1
  this.start = () => {
    this.handle = setTimeout(
      () => {
        fn()
        this.time++
        this.start()
        console.log(this.a + this.time * this.b)
      },
      this.a + this.time * this.b,
    )
  }

  this.stop = () => {
    clearTimeout(this.handle)
    this.time = 0
  }
}

var a = new mySetInterVal(
  () => {
    console.log('123')
  },
  1000,
  200,
)
a.start()
a.stop()
```

## 递归比较两个对象是否相等？

```js
let origin = {
  a: 1,
  c: {
    d: [
      1,
      {
        k: 22,
      },
    ],
    f: {
      age: 19,
    },
  },
}
let target = {
  a: 1,
  c: {
    d: [
      1,
      {
        k: 22,
      },
    ],
    f: {
      age: 19,
    },
  },
}

function deepEqual(origin, target) {
  if (typeof target !== 'object' || typeof origin !== 'object') {
    return origin === target
  }

  // 当前是对象的情况
  if (Object.prototype.toString.call(target) === '[object Object]') {
    if (Object.keys(target).length !== Object.keys(origin).length) {
      return false
    }
    for (let key in target) {
      if (!deepEqual(origin[key], target[key])) return false
    }
  }

  // 当前是数组的情况
  if (Object.prototype.toString.call(target) === '[object Array]') {
    if (target.length !== origin.length) {
      return false
    }
    for (let key of Object.keys(target)) {
      if (!deepEqual(origin[key], target[key])) return false
    }
  }
  return true
}

console.log(deepEqual(origin, target))
```

## 嵌套数组对象的递归合并？

问题：将对应的省份合并在一起

```js
let data1 = [
  {
    key: '220000',
    value: '吉林省',
    data: [
      {
        key: '220100',
        value: '长春市',
        data: [
          { key: '220102', value: '南关区' },
          { key: '220103', value: '宽城区' },
        ],
      },
    ],
  },
  {
    key: '330000',
    value: '浙江省',
    data: [{ key: '330200', value: '宁波市' }],
  },
]

let data2 = [
  {
    key: '220000',
    value: '吉林省',
    data: [
      {
        key: '220200',
        value: '吉林市',
        data: [{ key: '220202', value: '昌邑区' }],
      },
      {
        key: '220100',
        value: '长春市',
        data: [
          { key: '220102', value: '南关区' },
          { key: '220104', value: '朝阳区' },
        ],
      },
      { key: '220300', value: '四平市' },
    ],
  },
  {
    key: '330000',
    value: '浙江省',
    data: [{ key: '330100', value: '杭州市' }],
  },
]
```

## 输出下面函数的执行顺序？（考察函数的表达式和函数的声明式的区别？）{##1}

```js
var foo = function () {
  console.log('foo1')
}
foo()

var foo = function () {
  console.log('foo2')
}
foo()

function foo() {
  console.log('foo1')
}
foo()

function foo() {
  console.log('foo2')
}
foo()
```

分析：

1. 上面的代码可以分开来看，前两个 foo 函数是表达式，后面两个是函数的声明式，函数的表达式和函数的声明式的区别是，函数表达式提升的函数的赋值的变量 foo，而不是函数本身，函数声明提升的是函数自身。
2. 所以前面两个函数的表达式的执行实际是依次从上向下执行，执行的结果是 foo1 和 foo2。
3. 后面两个是函数的声明，存在函数的提升，同时由于函数作用域的特性，声明两个相同的函数，后面一个函数会覆盖前面一个函数，这样在执行 foo()的时候第四个 foo 函数会覆盖第三个 foo 函数，所以输出的是 foo2 和 foo2。
4. 综上的结果是 foo1 foo2 foo2 foo2 。
