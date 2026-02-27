## 常见的创建对象、遍历对象、合并对象的方法有哪些？{##1}

创建对象：

1. 对象字面量： `let obj = {}`
2. 创建实例对象： `let obj = new Object()`
3. 构造函数： `function Fn () {} let f = new Fn()`
4. 创建原型对象： `Object.create()` (es6 新增，使用指定的原型对象和属性创建一个新对象。)
5. 通过合并一个或者多个对象来创建一个新对象： `Object.assign()`
6. 工厂模式：通过函数传递不同的参数返回不同的对象。

遍历对象：

1. `for..in..` 获取自身和继承的可枚举属性；
2. `Object.keys()` 获取自身可枚举属性；
3. `Object.values()` 获取自身可枚举属性；
4. `Object.entries()` 获取自身可枚举属性；
5. `Object.getOwnPropertyNames()` 获取自身可枚举和不可枚举属性；
6. `Reflect.ownKeys() ` 获取自身可枚举和不可枚举属性；

```js
let dog = {
  name: 'Tom',
}
// 向对象的原型上添加属性
Object.prototype.hobby = '睡觉'
// 添加不可枚举属性
Object.defineProperty(dog, 'age', {
  value: 2,
  enumerable: false,
})
console.log(Object.values(dog)) // [ 'Tom' ]
console.log(Object.keys(dog)) // [ 'name' ]
console.log(Object.entries(dog)) // [ [ 'name', 'Tom' ] ]
console.log(Reflect.ownKeys(dog)) //[ 'name', 'age' ]
console.log(Object.getOwnPropertyNames(dog)) // [ 'name', 'age' ]
```

合并对象：

1. `Object.assign()` 用于合并一个或者多个对象。
2. `...` 扩展运算符
3. 嵌套数组对象的递归合并

## 如何检测对象中是否存在某个属性？{##2}

案例：

```js
// 判断对象中是否存在某个属性？
let dog = {
  name: 'Tom',
}
// 向对象的原型上添加属性
dog.__proto__.hobby = '睡觉'
// 添加不可枚举属性
Object.defineProperty(dog, 'age', {
  value: 2,
  enumerable: false,
})
```

第一种：遍历原来的对象然后判断属性是否存在。

1. `for...in...` 用于遍历自身和原型上的可枚举属性。

```js
for (let key in dog) {
  console.log(key) // name hobby
}
```

2. `Object.keys()` 用于遍历自身的可枚举属性

```js
console.log(Object.keys(dog)) // name
```

3. `Object.getOwnPropertyNames()` 用于遍历自身的可枚举属性和不可枚举属性

```js
console.log(Object.getOwnPropertyNames(dog)) // name age
```

第二种：直接判断

1. ` key in obj` 用于判断自身的和原型上可枚举属性和不可枚举属性

```js
console.log('hobby' in dog) //true
console.log('name' in dog) //true
console.log('age' in dog) //true
```

2. `obj.hasOwnProperty()` 用于获取自身的可枚举和不可枚举属性

```js
console.log(dog.hasOwnProperty('name')) // true
console.log(dog.hasOwnProperty('age')) // true
console.log(dog.hasOwnProperty('hobby')) //false
```

## 如何判断一个对象是不是为空？{##3}

1. 这个的判断方式和上面的检测对象中是否存在一个属性一样的，先判断对象自身是不是空的，再判断对象的原型上是否存在属性，再判断对象的原型上是否存在属性。可以是先遍历对象，看是否存在 key 值，比如使用`for...in..`可以遍历自身和原型上的可枚举属性，如果遍历的结果是空的，那么再使用`Object.getOwnPropertyNames()`去检查下不可以枚举属性是否存在。

2. 如果只是判断自身的可枚举属性，直接使用 `Object.keys().length == 0`就可以了。

## 深拷贝和浅拷贝的区别？常见的有那些？如何递归实现深拷贝？{##4}

浅拷贝，只拷贝第一层的原始类型值，和第一层的引用类型地址。
深拷贝，拷贝所有的属性值，以及属性地址指向的值的内存空间。
常见的深拷贝：递归，json.stringify(), json.parse()
常见的浅拷贝：扩展运算符，Array.concat() ,Object.assign() ,Array.since() ,for...in

实现深拷贝
第一步：先判断传入的数据的类型，如果是对象可以使用 for in 循环，如果是对象则继续 for 循环。
第二步：设置终止条件，如果当前循环的每一层都不是数组和对象则返回当前的对象。

```js
let obj = {
  name: '小明',
  age: 20,
  hobby: {
    a: '睡觉',
    b: ['篮球', '象棋'],
  },
}
function deepClone(any) {
  let type = Object.prototype.toString.call(any)
  if (type === '[object Object]') {
    let o = {}
    for (let i in any) {
      o[i] = deepClone(any[i])
    }
    return o
  }
  if (type === '[object Array]') {
    let a = []
    for (let i = 0; i < any.length; i++) {
      a[i] = deepClone(any[i])
    }
    return a
  }
  return any
}
deepClone(obj)
```

## 如何判断两个嵌套对象相等？{##5}

```js
function deepEqual(origin, target) {
  if (typeof target !== 'object' || typeof origin !== 'object') {
    return origin === target
  }

  // 当前是对象的情况
  if (Object.prototype.toString.call(target) === '[object Object]') {
    if (Object.keys(target).length !== Object.keys(origin).length) {
      return false
    }
    for (let id in target) {
      if (!deepEqual(origin[id], target[id])) return false
    }
  }

  // 当前是数组的情况
  if (Object.prototype.toString.call(target) === '[object Array]') {
    if (target.length !== origin.length) {
      return false
    }
    for (let id of Object.keys(target)) {
      if (!deepEqual(origin[id], target[id])) return false
    }
  }
  return true
}
```

## 如何实现阶乘? {##6}

```js
// 递归实现阶乘
function factorial(n) {
  if (n === 1) {
    return 1
  }
  return n * factorial(n - 1)
}
console.log(factorial(4))
// n===4 ---> 将 4(factorial(4 - 1))压入执行栈中 调用 factorial(3)
// n===3 ---> 将 3(factorial(3 - 1))压入执行栈中 调用 factorial(2)
// n===2 ---> 将 2(factorial(2 - 1))压入执行栈中 调用 factorial(1)
// n===1 ---> factorial(1)===1,此时不需要继续往下执行，将结果 1 传递给 factorial(2）
// n===2 ---> 2(factorial(2 - 1))===2,此时 factorial(2)===2，将结果 2 传递给 factorial(3）
// n===3 ---> 3(factorial(3 - 1))===2,此时 factorial(3)===6，将结果 6 传递给 factorial(4）
// n===4 ---> 4(factorial(4 - 1))===2,此时 factorial(4)===24，将结果 24 弹出
```

```js
// 闭包递归实现阶乘
function fn(n) {
  let N = 1
  let fo = n => {
    N = N * n
    if (n !== 1) {
      n--
      fo(n)
    }
  }
  fo(n)
  return N
}
console.log(fn(4))
```

## Object.defineProperty 如何监听对象？如果是嵌套对象如何监听？{##7}

介绍：`Object.defineProperty` 可以用于设置对象的属性，同时可以用于监听对象属性的访问和修改。

语法：`Object.defineProperty(obj, prop, descriptor)`

1. obj:定义的属性对象。
2. prop:要定义或者修改的属性名称。
3. descriptor:属性描述对象，用于定义和修改属性的特性。

属性描述符：

1. value：属性的值，默认 undefined。
2. writable：如果为 true，属性的值可以被重写。默认为 false，即属性为只读。
3. enumerable：如果为 true，则属性会被枚举（例如，通过 for...in 循环或 Object.keys()方法）。默认为 false，即属性不可枚举。
4. configurable：如果为 true，属性可以被删除或修改（例如，通过 delete 运算符或再次调用 Object.defineProperty()）。默认为 false，即属性不可配置。
5. get：一个函数，作为 getter，当访问此属性时会被调用。如果没有 getter 函数，那么尝试访问该属性将返回 undefined（除非同时设置了 value）。
6. set：一个函数，作为 setter，当修改此属性时会被调用。如果没有 setter 函数，那么尝试设置该属性的值将静默失败（不会报错，除非属性是只读的）。

默认情况下设置的属性，不可以修改，不可以删除，不可以枚举。

```js
let person = {}
Object.defineProperty(person, 'name', {
  value: '川普宝宝',
})
person.name = '汤姆' // 不可修改
delete person.name // 不可删除
for (let key in person) {
  console.log(key) // 不可枚举
}
console.log(person) // {name: '川普宝宝'}
```

存取描述符介绍:

```js
let person = {}
let value = '川普'
Object.defineProperty(person, 'name', {
  get: function () {
    console.log(`访问了属性name的值是${value}`)
    return value
  },
  set: function (val) {
    console.log(`设置了属性name的值是${val}`)
    value = val
  },
})
// 第一步：console.log(person.name)
// 第二步：person.name = '汤姆'
```

分析：上面的代码当执行第一步的时候，访问 name 的值，这个时候会被 Object.defineProperty 中的 get 监听到。当修改 name 的值时会先将修改的值传递给 set 函数，所以 set 函数中可以监听到修改的值。

监听普通对象属性？
通过上面的用法我们了解到，get 方法和 set 方法的不同作用，同时可以简单的实现对于对象属性的监听，但是如果对象中的属性是动态的，那么就需要定义一个函数去实现，下面是实现动态监听对象属性的方法。

```js
let person = {
  name: '川普宝宝',
  hobby: '打球',
  gender: 'man',
}

for (let key in person) {
  dynamicMonitor(person, key, person[key])
}
function dynamicMonitor(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`访问了${key}的值是${value}`)
      return value
    },
    set(val) {
      console.log(`设置了${key}的值是${val}`)
      value = val
    },
  })
}
person.name = '普京' // 设置对象的值
console.log(person.name) // 访问对象的值
```

监听嵌套对象的属性？
如果嵌套了很多层对象，这个时候如何深度监听每一层对象的变化呢？

```js
let person = {
  name: '川普宝宝',
  hobby: {
    readBooks: ['我的大学', '围城'],
    sports: {
      playball: ['棒球', '高尔夫'],
    },
  },
}
observer(person)
function observer(data) {
  if (typeof data === 'object') {
    for (let key in data) {
      defineReactive(data, key, data[key])
    }
  }
}
function defineReactive(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get: function () {
      console.log(`访问了属性${key}的值${value}`)
      return value
    },
    set: function (v) {
      console.log(`设置了属性${key}的值${v}`)
      value = v
    },
  })
}
person.hobby.sports.playball[1] = '橄榄球'
```

## 什么是迭代对象？有什么用处？{##8}

## 迭代对象？

认识迭代器（迭代器本身是一个对象，它具有两个属性，分别是 value 和 done。迭代器的工作过程就是对当前数据集中的数据按照一定的顺序依次取出的过程。迭代器的就是提供 Iterator 接口，在 es6 中能否被 for...of...方法遍历。就是看当前数据结构是否提供 Iterator 接口，如果有则可以被遍历，如果没有则不能被遍历）

1. value：迭代对象中的值。
2. done：表示当前迭代对象是否迭代完成。
3. 在原生中具备迭代器的数据结构有 Array、String、Set 和 Map，特殊类数组对象：arguments、NodeList 等。

调用数组的迭代器

```js
let arr = ['a', 'b']
let arrIterator = arr[Symbol.iterator]()
console.log(arrIterator.next()) // {value: 'a', done: false}
console.log(arrIterator.next()) // {value: 'b', done: false}
console.log(arrIterator.next()) // {value: undefined, done: true}

var it = makeIterator(['a', 'b'])
console.log(it.next()) // { value: "a", done: false }
console.log(it.next()) // { value: "b", done: false }
console.log(it.next()) // { value: undefined, done: true }

function makeIterator(arr) {
  let index = 0
  return {
    next: function () {
      return arr.length > index
        ? { value: arr[index++], done: false }
        : { value: undefined, done: true }
    },
  }
}
```

为类数组添加迭代器？
解释：类数组指的是那些具有数组索引和长度属性的数据对象，但是并没有数组的 push，pop 等等方法的数据结构。

```js
// 使用 for...of...遍历当前数据
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}
for (let value of arrayLike) {
  console.log(value) // Uncaught TypeError: arrayLike is not iterable
}

// 添加迭代器
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

arrayLike.proto[Symbol.iterator] = function () {
  let index = 0
  return {
    next: () => {
      return this.length > index
        ? { value: this[index++], done: false }
        : { value: undefined, done: true }
    },
  }
}
for (let value of arrayLike) {
  console.log(value) // a b c
}
```

普通对象添加迭代器？

```js
// 普通对象本身是不存在迭代器的
let man = {
  name: '小明',
  age: 20,
}
for (let v of man) {
  console.log(v) // Uncaught TypeError: man is not iterable
}

// 为普通对象添加迭代器
// 分析：普通对象并不像类数组那样对象的 key 是一堆有序的数字，并且也没有长度，所以在为普通对象添加迭代器的时候先解决这两个问题，不妨我们试试先遍历对象。
let man = {
  name: '小明',
  age: 20,
}

man.proto[Symbol.iterator] = function () {
  let keys = []
  let index = 0
  for (let key in this) {
    // 筛选自身属性
    if (this.hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  return {
    next: () => {
      return keys.length > index
        ? { value: this[keys[index++]], done: false }
        : { value: undefined, done: true }
    },
  }
}

for (let v of man) {
  console.log(v)
}
```
