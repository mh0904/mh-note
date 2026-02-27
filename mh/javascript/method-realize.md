## 如何手动实现 instanceof 方法？ {##1}

介绍 instanceof 方法： instanceof 方法用于检测当前对象是否存在另一个构造函数的原型链的原型上，存在返回 ture，不存在返回 false。
案例：console.log([] instanceof Array) // true
实现思路： 1.定一个函数，并接受两个参数，第一个参数是需要验证的对象，第二个参数是构造函数。 2.在函数中对传入的参数进行检验，确保传入的是对象和构造函数。 3.拿到对象的原型链(`__proto__`),使用 while 遍历该对象的原型链，直到该对象的原型链和构造函数的显示原型（prototype）相等返回 ture，不等则返回 false。

```js
const MyInstanceof = () => {
  function Animal() {}
  let dog = new Animal()
  function myInstanceof(obj, constructor) {
    // 确保传入的对象和构造函数都是有效的
    if (typeof obj !== 'object' || obj === null) {
      return false
    }
    if (typeof constructor !== 'function') {
      throw new TypeError('Second argument must be a constructor')
    }
    // 获取对象的原型链
    let proto = obj.__proto__
    // 遍历原型链，直到找到constructor.prototype或达到原型链的末尾
    while (true) {
      if (proto === null) {
        // 原型链结束，没有找到constructor.prototype
        return false
      }
      if (proto === constructor.prototype) {
        // 找到constructor.prototype
        return true
      }
      // 继续向上遍历原型链
      proto = proto.__proto__
    }
  }
  // console.group('myInstanceof')
  // console.log(myInstanceof(dog, Animal))
  // console.log(myInstanceof(dog, Object))
  // console.log(myInstanceof(dog, Array))
  // console.log(myInstanceof(null, Animal))
  // console.log(myInstanceof({}, Animal))
  // console.groupEnd()

  // console.group('instanceof')
  // console.log(dog instanceof Animal)
  // console.log(dog instanceof Object)
  // console.log(dog instanceof Array)
  // console.log(null instanceof Animal)
  // console.log({} instanceof Animal)
  // console.groupEnd()

  return <div>实现instanceof</div>
}
```

## 如何手动实现 Object.create 方法？

```js
let obj = {
  a: 1,
}
function Create(obj) {
  let F = {}
  F.__proto__ = obj
  return F
}
let O = Create(obj)
console.log(O)
```

分析： 第一种在 create 方法中创建一个空对象，并将传入的对象赋值给这个空对象的隐式原型对象，返回创建的对象。

```js
let obj = {
  a: 1,
}
function Create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
let O = Create(obj)
console.log(O)
```

分析：第二种在 create 方法中创建一个空函数，并将传入的对象赋值给这个函数的原型对象，使用构造函数的形式生成一个新的对象实例，返回当前的实例对象。
