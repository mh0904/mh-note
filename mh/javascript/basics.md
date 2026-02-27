# js 入门

## js 的数据类型有哪些？如何判断 js 的数据类型？

1.  **Symbol 类型 (ES6 新增)**

- 表示独一无二的值，即使创建时传入相同的值，两个 Symbol 也不相等。
- 主要用途：解决对象属性名冲突问题，可用作唯一标记。

2. **BigInt 类型 (Chrome 67+ 支持)**
   - 用于安全存储和操作大整数（超出 `Number` 类型安全范围的整数）。
   - 注意：虽然 BigInt 是 ES2020 正式加入的标准类型，但部分开发者不将其视为基础数据类型。
3. **存储区别**

- **基本数据类型**：直接存储在栈内存中（如 `Number`、`String`、`Boolean`、`null`、`undefined`、`Symbol`、`BigInt`）。
- **复杂数据类型**（如 `Object`、`Array`、`Function`）：
  - 实际数据存储在堆内存中，
  - 栈中仅保存指向堆内存的引用地址。

4. **判断 js 的数据类型**
   - typeof 操作符​：判断基本数据类型（`number`、`string`、`boolean`、`undefined`、`symbol`、`bigint`），但对 `object` 和 `null` 的判断不准确。
   - instanceof 操作符​：检查一个对象是否是某个构造函数的实例（判断引用类型，如 `Array`、`Object`、`Date` 等）。
   - Object.prototype.toString.call()： 返回 `[object Type]` 格式的字符串，可以精确判断所有数据类型，通用型。
   - Array.isArray()：专门用来判断数组
   - === 严格相等（判断 `null` 和 `undefined`）。

## null 和 undefined 的区别?

使用 undefined 表示“未定义、未初始化、默认情况”​

::: code-group

```js [场景一]
// 变量声明了但未赋值
let a
console.log(a) // undefined
```

```js [场景二]
// 函数没有返回值时，默认返回 undefined
function foo() {}
console.log(foo()) // undefined
```

```js [场景三]
// 访问的对象不存在
const obj = {}
console.log(obj.key) // undefined
```

```js [场景四]
// 函数的参数没有传值
function bar(x) {
  console.log(x)
}
bar() // undefined
```

:::

使用 null 表示“空的、无值的、有意为之”​

::: code-group

```js [场景一]
// 表示“没有对象”、“空引用”
let b = null
console.log(b) // null
```

```js [场景二]
// 常用于函数中，表示“没有返回值对象”（主动语义）
function findUser() {
  // 假设没找到用户
  return null // 明确告诉调用者：没找到，返回空
}
const user = findUser()
if (user === null) {
  console.log('没有找到用户')
}
```

:::

## js中字符串的属性和方法有哪些？

**属性：**
::: details 点我查看

- length：字符串的长度，唯一属性；

:::

**方法：**

::: details 说出10种字符串的方法

- split：将字符串转换成数组；
- substring：截取字符串中一段字符,包含截取的开始下标，不包含截取的结束下标；
- slice：截取字符串中的一段字符，包含截取的开始下标，不包含截取的结束下标；
- includes：查找字符串中的字符是否存在，如果存在返回true，不存在返回false；
- indexOf: 查找字符串中的字符是否存在，存在返回当前字符的下标，不存在返回-1；
- trim： 去除字符串中的收尾空格；
- trimStart：去除字符串中的开始空格；
- trimEnd： 去除字符串中的结束空格；
- replace(/\s+/g, '')： 去除所有空格；
- toUpperCase: 将字符串的小写转换成大写；
- toLowerCase: 将字符串中的大写转换成小写；
- search: 查找一个字符，返回查找的字符下标，没有返回-1,与 indexOf 的区别是支持正则，indexOf 不支持正则表达式；

:::

## 数组常见的去重的方法?

::: details 说出3种数组去重的方法

> [!TIP]
> 常见的有三种。
>
> - 利用 es6 中的 set 数据结构直接去重，set 中不包含重复的元素，然后使用 Array.from 将 set 结构转换成数组。
> - 利用 indexOf 或者 includes 去判断当前项的下标是否和等于当前元素的下标，如果相等则 push 进新数组。
> - 利用传统的双 for 循环，进行排序去重，如果第一项和第二项相等，则使用 splice 删除第二项。
>   :::

::: code-group

```js [双 for 循环]
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(j, 1)
      j--
    }
  }
}
```

```js [filter + indexOf]
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
arr.filter((i, index) => arr.indexOf(i) === index)
```

```js [Array.from + new Set()]
let arr = ['h', 'e', 'l', 'l', 'o', 'h', 'e', 'l', 'l', 'o']
Array.from(new Set(arr))
```

:::

## 多维数组如何扁平化？

::: details 说出3种多维数组扁平化的方法？

> [!TIP]
>
> - 利用 flat 函数，es2019 提出的方法。flat 方法用于拉平嵌套的数组 flat 方法中可以传入一个整数，表示拉平的层数，默认是 1，使用 infinity 关键字作为参数表示无论嵌套多少层都可以转换成一组数组，flat 方法不会改变原数组。
> - 如果你的数组中​​全部都是数字​​（没有字符串等其他类型），你可以使用 toString() 方法，然后通过 split 和 map(Number) 转换。
> - 使用 reduce + 递归（兼容性好，适用于任意深度）。

::: code-group

```js [flat 函数]
let arr = [
  [1, 2, 3, [9, 10, 11]],
  [4, 5, 5, 6, [7, 8, 9, [10, 11, 12, 12]]],
]
arr.flat(3)
```

```js [toString 函数]
let arr = [
  [1, 2, 3, [9, 10, 11]],
  [4, 5, 5, 6, [7, 8, 9, [10, 11, 12, 12]]],
]
arr.toString().split(',').map(Number)
```

```js [reduce + 递归]
let arr = [
  [1, 2, 3, [9, 10, 11]],
  [4, 5, 5, 6, [7, 8, 9, [10, 11, 12, 12]]],
]
function flatten(arr) {
  return arr.reduce(
    (pre, item) => (Array.isArray(item) ? pre.concat(flatten(item)) : pre.concat(item)),
    [],
  )
}
let result = flatten(arr)
```

:::

## 数组方法的实现？

::: details forEach、map、filter、find、reduce方法的实现？

::: code-group

```js [forEach 的实现]
Array.prototype.myEach = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    callBack(item, index, array)
  }
}
let arr = [4, 5, 6, 7]
arr.myEach(item => console.log(item + 1))
```

```js [map 的实现]
Array.prototype.myMap = function (callBack) {
  let all = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    all.push(callBack(item, index, array))
  }
  return all
}
let arr = [4, 5, 6, 7]
let newMap = arr.myMap(item => {
  return { key: item }
})
```

```js [filter 的实现]
Array.prototype.myFilter = function (callBack) {
  let all = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    if (callBack(item, index, array)) {
      all.push(item)
    }
  }
  return all
}
let arr = [4, 5, 6, 7]
let newArr = arr.myFilter((item, index) => index > 0)
```

```js [find 的实现]
Array.prototype.myFind = function (callBack) {
  let allFalse = []
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    if (callBack(item, index, array)) {
      return item
    }
    allFalse.push(callBack(item, index, array))
  }
  return allFalse.every(i => !i) && undefined
}
let arr = [4, 5, 6, 7]
let newArr = arr.myFind((item, index) => index > 10)
```

```js [reduce 的实现]
Array.prototype.myReduce = function (callBack, pre) {
  let pred = pre || 0
  for (let i = 0; i < this.length; i++) {
    let item = this[i]
    let index = i
    let array = this
    pred = callBack(pred, item, index, array)
  }
  return pred
}
let arr = [4, 5, 6, 7]
let newArr = arr.myReduce((pred, item) => pred + item)
```

:::

## 构造函数介绍?

#### 介绍下构造函数及new方法的实现？

在javascript中构造函数用于创建和初始化对象的特殊函数，通常以大写字母开头（约定俗成），构造函数通过new关键字初始化一个新的对象，具体的初始化的过程如下：

下面是一个基础的构造函数案例：

```js
function Animal(name, age) {
  this.name = name
  this.age = age
}
let a = new Animal('dag', 12)
```

::: details new 命令的作用：

> 执行一个构造函数，并且返回一个对象实例。使用 new 命令时，它后面的函数调用就不是正常的调用，而是依次执行下面的步骤
>
> a：创建一个空对象，作为将要返回的对象实例。
>
> b：将空对象的`__proto__`指向了构造函数的 prototype 属性。
>
> c：将空对象赋值给构造函数内部的 this 关键字。
>
> d：构造函数中如果没有 return 语句，则将新创建的对象返回。
>
> 也就是说，构造函数内部，this 指向的是一个新生成的空对象，所有针对 this 的操作，都会发生在这个空对象上。构造函数之所谓构造函数，意思是这个函数的目的就是操作一个空对象（即 this 对象），将其构造为需要的样子。
>
> 注意事项：构造函数实际是一个函数，this 指向的构造函数创建的实例对象。

:::

**模拟new的实现：**

```js
function myNew(fn, ...args) {
  // 判断参数是否是一个函数
  if (typeof fn !== 'function') {
    return console.error('type error')
  }
  // 创建一个对象，并将对象的原型绑定到构造函数的原型上
  const obj = Object.create(fn.prototype)
  const value = fn.apply(obj, args) // 调用构造函数，并且this绑定到obj上
  // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回obj
  return value instanceof Object ? value : obj
}
```

## call apply bind 的区别？

::: details

> call、apply、bind都是用于改变this的指向，他们的区别是在于传递的参数和调用的时机不同。
>
> - apply的语法： `fun.apply(thisArg, [argsArray])`；第一个参数是需要指向的 this 对象（函数），如果传递的是 null 和 undefined 会指向全局。同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。第二个参数是数组或者类数组对象，会将该值一次传递给第一个参数。
> - call的语法： `fn.call(thisArg, arg1, arg2, argN)`；作用基本和 apply 相同，不同的是传递的第二个参数或者后面的 n 个参数会以列表的形式依次传递给 call，而 apply 是数组的形式传递。
> - bind的语法：`fn.bind(thisArg, arg1, arg2, argN)()`；作用基本和 call 相同,不同的 bind 会重新创建一个函数，需要再次调用才会执行

:::

::: code-group

```js [apply]
// 场景一： 使用 apply 将一个数组中的元素添加到另一个数组中
let arr1 = [1, 2, 3, 4, 5]
let arr2 = [7, 8, 9]
let T = arr1.push.apply(arr1, arr2)

// 场景二：找出数组中的最大最小值。
let arr1 = [1, 2, 3, 4, 5]
let min = Math.min.apply(null, arr1) // 1
let max = Math.max.apply(null, arr1) // 5
```

```js [call]
// 场景继承一个构造函数的方法：
function Animal(name, age) {
  ;((this.name = name), (this.age = age))
}
function Cat(name, age) {
  Animal.call(this, name, age)
}
let cat = new Cat('Tom', 2)
console.log(cat.name) // Tom
```

```js [bind]
var a = {
  name: 'Cherry',
  fn: function (a, b) {
    console.log(a + b)
  },
}
var b = a.fn
b.bind(a, 1, 2)()
```

:::
