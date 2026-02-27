## 简单介绍下 symbol？

Symbol 是 es6 中新增的一种基础数据类型，特点是通过 Symbol 函数生成唯一的 Symbol 值。
Symbol 中可以接收一个参数，这个参数是对于 Symbol 的一种描述，两个相同的 Symbol 也是不相等的。
Symbol 可以作为属性名使用，同时用 for..in 不会遍历 Symbol 属性名。

```js
// 两个相同的 Symbol 并不相等
let name1 = Symbol('小明')
let name2 = Symbol('小明')

// Symbol 可以作为属性名
let age = Symbol('age')
let person = {
  [age]: 12,
}
```

## 例举 3 种强制类型转换和 2 种隐式类型转换?

强制：parseInt()、parseFloat()、Number()
隐式：== 、console.log()、alert()

## == 和 === 的区别？

两个等号会进行类型转换，然后再进行比较。例如：

```js
console.log(0 == false) // 输出 true
console.log('' == 0) // 输出 true
```

三个等号是严格相等运算符，不会进行类型转换，直接比较类型和值，只要有一个不相等就返回 false。例如：

```js
console.log(0 === false) // 输出 false
console.log('' === 0) // 输出 false
```

### set 的基础介绍？

1. set 是 es6 提出的一种新的数据结构，返回不重复的 set 数据结构。

2. set 的方法有：
   add(value)向 set 中添加一个新的值。
   has(value)判断当前的 value 值是否存在 set 结构中。
   delete(value)删除 set 中的一个值，删除成功返回 true。
   size 返回 set 中数据的个数。
   clear() 清空所有成员，没有返回值。

3. 遍历 set 的方法：
   forEach:由于 set 结构中没有键名，只有键值，所以返回的键值和键名是一样的。
   for...of..
   values()
   keys()
   entries() // 返回键值对（这里的 keys 和 values 返回值是一样的，都是键值）

4. set 的方法有

```js
let S = new Set()
console.log(S) // Set(0) {}

S.add(1)
S.add(2)
let add = S.add(3)
console.log('add', add) // Set(3) { 1, 2, 3 }

let has = add.has(1)
console.log('has', has) //true

let remove = add.delete(2)
console.log('remove', remove) // true

let size = add.size
console.log('size', size) // 2

let clear = add.clear()
console.log('clear', clear) // undefined
```

5. 遍历 set 的方法

```js
let S = new Set(['a', 'b', 'c'])
console.log('S', S) // Set(3) { 'a', 'b', 'c' }

S.forEach((key, value, arr) => {
  console.log(key, ':', value) // a : a b : b c : c
})

for (let value of S) {
  console.log('value', value) // a,b,c
}

let keys = S.keys() // [Set Iterator] { 'a', 'b', 'c' }
let values = S.values() // [Set Iterator] { 'a', 'b', 'c' }
let entries = S.entries() // [Set Entries] { [ 'a', 'a' ], [ 'b', 'b' ], [ 'c', 'c' ] }
```

6. 求几组数据中的交集和并集和差集

```js
let a = new Set([1, 2, 3])
let b = new Set([2, 3, 4])

// 求 a，b 的交集
let intersection = [...a].filter(item => b.has(item))
console.log(intersection) // [2,3]

// 求 a，b 的并集
let all = new Set([...a, ...b])
console.log(all) // Set(4) { 1, 2, 3, 4 }

// 求 a，b 的差集
let difference = Array.from(all).filter(item => !intersection.includes(item))
console.log(difference) // [1,4]
```

### map 的介绍？

1. map 是 es6 中的一种新的数据结构，相对于传统的键值对对象，map 中允许键值不是字符串的形式。
2. map 数据结构的属性和方法？
   set(key,value) 用于设置键值。
   get(key)根据已有的键获取值，没有返回 undefined。
   size 返回已有键值对的个数。
   has(key) 判断当前的 key 是否存在，返回的是一个布尔值。
   delete(key) 删除指定的 key，返回布尔值，key 不存在返回 false。
   clear() 清空当前的 map 数据。
   keys() 返回 key 值组成的集合。
   values() 返回 value 值组成的集合。
   entries() 返回 map 结构中的【key value】键值对。
3. 对象和 map 之间的互相转换？
4. 数组和 map 之间的互相转换？
5. map 的妙用，比如统一字段？

6. map 数据结构的属性和方法？

```js
let map = new Map()
console.log(map) // Map(0) {}
map.set('age', '15')
console.log(map.set('name', '狂徒张三')) // Map(1) { 'name' => '狂徒张三' }
console.log(map.get('name')) // 狂徒张三
console.log(map.size) // 2
console.log(map.has('age')) // true
console.log(map.keys()) //[Map Iterator] { 'age', 'name' }
console.log(map.values()) // [Map Iterator] { '15', '狂徒张三' }
console.log(map.entries()) // [Map Entries] { [ 'age', '15' ], [ 'name', '狂徒张三' ] }
console.log(map.delete('age')) // true
console.log(map.clear()) // undefined
```

7. 对象和 map 之间的互相转换？

```js
let person = {
  name: 'jack',
  age: 14,
}
// 将对象转换成 map 数据
console.log(Object.entries(person)) // [ [ 'name', 'jack' ], [ 'age', 14 ] ]
let map = new Map(Object.entries(person))
console.log(map) // Map(2) { 'name' => 'jack', 'age' => 14 }

// 将 map 结构转换成对象
let newObj = {}
map.forEach((key, value) => {
  newObj[key] = value
})
console.log(newObj)
```

8. 数组和 map 之间的互相转换？

```js
const myMap = new Map()
myMap.set(1, true)
myMap.set(0, false)
// 将 map 数据转换成数组
let arr = [...myMap]
console.log(arr) // [ [ 1, true ], [ 0, false ] ]
// 将数组转换成 map
let newMap = new Map([
  [true, 7],
  [false, 0],
])
console.log(newMap) // Map(2) { true => 7, false => 0 }
```

9. map 的妙用，比如统一字段？比如后端返回不同的 code 码，前端转换成对应的文字显示。

```js
let code = 200
let code = [200, 404]
function codetoString(code) {
  let errors = new Map([
    [200, '请求成功'],
    [404, '页面不存在'],
    [500, '服务端错误'],
  ])
  if (Array.isArray(code)) {
    return code.map(item => errors.get(item))
  } else {
    return errors.get(code)
  }
}
console.log(codetoString(code))
```

### proxy 的基础使用？

一、proxy 代理，指的在目标对象上设置一层拦截，外界对于该对象的访问必须经过这层拦截。
二、语法：var proxy = new Proxy(target, handler); target 目标对象 handler 定制拦截行为
三、proxy 的实例方法：
1、get()方法：用于拦截属性的读取，接收三个参数，目标对象，属性名，proxy 实例.
2、set()方法：用于拦截某个属性的赋值操作，可以接收 4 个参数，分别是，目标对象，属性名，属性值，proxy 实例

### 读取一个对象上属性，读取不到返回 ‘该属性不存在’

```js
let data = {
  person: '人类',
}
let proxy = new Proxy(data, {
  get: (obj, key, proxy) => {
    return obj[key] ? obj[key] : '该属性不存在'
  },
})
console.log(proxy.person) // 人类
console.log(proxy.age) // 该属性不存在
```

### 读取数组中的参数，可以传入负数，负数代码重后向前读取

```js
let arr = ['a', 'b', 'c']
let proxy = new Proxy(arr, {
  get: (obj, key) => {
    if (Number(key) < 0) {
      return obj.reverse()[key.split('-')[1]]
    } else {
      return obj[key]
    }
  },
})
console.log(proxy[-3])
```
