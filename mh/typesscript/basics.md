## TypeScript 中有哪些常见的类型？

1. 基础类型：string number boolean null undefined symbol biglit
2. 复杂类型： array（数组） tuple（元祖） enum（枚举）object（对象）

```ts
// 数组
let numbers: number[] = [1, 2, 3]
let numbers: Array<number> = [1, 2, 3]

// 元祖
let x: [string, number] = ['hello', 10]

// 枚举
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green

// 对象
let person: { name: string; age: number } = { name: 'John', age: 30 }
```

3. 特殊类型
   any：表示任意类型，允许任意类型的值。
   unknown：表示未知类型。
   never：表示不会发生的值。
   vold：表示没有返回值的函数。

4. 高级类型和类型操作
   联合类型（｜）和交叉类型（&）
   类型别名：为类型创建别名
   interface（接口）：定义对象的类型

```ts
// 联合类型（｜）和交叉类型（&）
let id: string | number
let person: Person & Serializable

// 类型别名
type Point = { x: number; y: number }

// interface接口
interface Person {
  name: string
  age: number
}
let john: Person = { name: 'John', age: 30 }
```

## TypeScript 中的类型别名和接口有什么区别？

1. 用途不同：type 可以用于定义基础数据类型，复杂数据类型，联合类型，元祖等各种类型，interface 只用于定义对象类型。

```ts
type primitive = string | number
let Name: primitive = '张三'
let Age: primitive = 20
```

2. 声明合并： 接口支持声明合并，即多次声明同一个接口的时候会合并成同一个声明，这点在项目中当你使用第三方的库需要为其添加额外的属性的时候非常有用，这是 type 不具备的。

```ts
interface User {
  name: string
}
interface User {
  age: number
}
let person: User = {
  name: '张三',
  age: 22,
}
```

3. 扩展方式不同：interface 通过 extends 进行继承，而 type 使用交叉类型实现组合。

```ts
interface Animal {
  name: string
}
interface Dog extends Animal {
  breed: string
}
let dog: Dog = {
  name: '小黑',
  breed: '土狗',
}

type Animal2 = { name: string }
type Dog2 = Animal2 & { breed: string }

let do2: Dog2 = {
  name: '小黑',
  breed: '土狗',
}
```

## 什么是 TypeScript 中的泛型？

1. 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```ts
function create<T>(value: T): number {
  return Number(value)
}
create('333')
```
