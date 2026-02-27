## JS 中 this 指向？

### 全局对象中的 this

```js
function fn() {
  return this
}
console.log(fn())
```

在函数中，函数所属者绑定 this，上面的函数 fn 在全局调用，所以此时指向的是全局对象，如果是浏览器中指向的是 window，如果是在 node 中指的是 global 对象。

### 严格模式中的 this

"use strict";

```js
function fn() {
  return this
}
console.log(fn())
```

严格模式下函数是没有绑定到 this 上，这时候 this 是 undefined。

### 嵌套函数中的 this

#### 第一种：在一个函数中调用另一个函数

```js
function fn() {
  fo()
}
function fo() {
  console.log(this)
}
fn()
```

这里的函数 fo 虽然是在 fn 中调用的，但是函数本身并不会直接形成作用域，this 指向的是调用它的对象，如果在浏览器中指向的是 window

#### 第一种：在一个函数返回另一个函数

```js
function fn() {
  return function fo() {
    return this
  }
}
console.log(fn()())
```

同样的道理，这里返回一个函数，指向的也是最外层的作用域 window。

### 箭头函数中的 this

箭头函数是 es6 提出的新特性，它有以下的特征：

1. 箭头函数中没有自己的 this，在箭头函数中的 this 会指向其定义的作用域。
2. 箭头函数不需要额外的 return，自身会返回。
3. 箭头函数中没有 arguments 对象。
4. 箭头函数不支持 new 操作符。

#### 第一种：全局箭头函数中的 this 指向

```js
let fn = () => {
  console.log(this)
}
```

全局箭头函数中的 this 调用指向全局对象，如果是浏览器中调用，则指向的 window。

#### 第二种：对象中函数的 this 指向

```js
let person = {
  fn: () => {
    console.log(this)
  },
  fo: function () {
    console.log(this)
  }
}
person.fn()
person.fo()
```

上面的对象中分别调用了普通函数和箭头函数，在箭头函数中并没有自己的 this，它绑定的是定义时上下文中的 this，即浏览器中的 window。而 fo 是普通函数，普通函数是有 this 的，fo 中的 this 指向它的调用者 person。

#### 第三种：嵌套多层对象中的箭头函数中的 this

```js
let person = {
  name: {
    fn: () => {
      console.log(this)
    }
  }
}
person.name.fn()
```

同理，虽然此次箭头函数外层嵌套了多层的对象，但是绑定的还是全局的 this，即 window 对象。

#### 第四种：嵌套函数的箭头函数中的 this

```js
let person = {
  name: function () {
    return () => {
      console.log(this)
    }
  }
}
person.name()()
```

调用箭头的 this 指向的是上下文中的 this，也就是 name 函数中的 this，所以这里的 this 绑定的 person 对象。

总结：箭头函数中的 this 是绑定上文函数中的 this，如果箭头函数的上下文中有函数时，this 绑定的是上下文函数中 this，如果没有的话则绑定的是全局的 this。

### 嵌套对象中的 this

#### 第一种：多层嵌套对象的调用

```js
var province = {
  city: {
    area: function () {
      console.log(this)
    }
  }
}
province.city.area()
```

虽然这里嵌套了多层对象，但是最终还是看调用 area 函数的对象是那个，显然这里是 city 对象调用的，所以 this 指向的 city 对象。

#### 第二种：把对象赋值给变量后调用

```js
var province = {
  city: {
    area: function () {
      console.log(this)
    }
  }
}
let P = province.city.area
P()
```

这里 area 函数的调用者发生了改变，这里是是将 area 函数赋值给一个变量后再调用，同时变量 P 是在全局中调用的，所以这里的 this 指向调用者 P。

#### 第三种：在对象中 return 一个独立函数

```js
var province = {
  city: {
    area: function () {
      return function () {
        console.log(this)
      }
    }
  }
}
province.city.area()()
```

这里 return 一个独立的函数,独立函数中的 this 也是指向 window 的。

### 回调函数中的 this

#### 第一种： 普通的回调函数

```js
function callback() {
  console.log(this)
}
function fn(callback) {
  callback()
}
fn(callback)
```

显然浏览器中上面的 callback 函数的 this 是指向全局的 window，callback 函数的调用是在 fn 函数中，而函数本身并不会形成作用域。

#### 第二种： 对象函数中的回调函数

```js
function callback() {
  console.log(this)
}
const obj = {
  fn(callback) {
    callback()
  }
}
obj.fn(callback)
```

虽然当前的 callback 函数是在 fn 函数中调用的，在 fn 函数中 this 是指向 obj 的，但是调用 callback 的时候并没有绑定对应的 this，属于直接调用，并不是作为 obj 的方法调用，所以这里的 this 还是指向的 window。

#### 第三种：复杂的回调函数

```js
var obj = {
  fn: function () {
    function callback() {
      console.log(this)
    }
    func(callback)
  }
}

function func(callback) {
  callback()
}
obj.fn()
```

仔细观察会发现上面的函数调用除了 fn 是对象 obj 调用的，其他函数都是在函数中进行的调用，只是进行了嵌套的传递调用，所以上面的函数中除了 fn 的 this 是指向 obj 对象的，其他的都是指向 window 对象的。

### 构造函数中的 this

```js
//情景一
function Keith() {
  this.height = 180
  return {
    height: 200
  }
}
var boy = new Keith()
console.log(boy.height) //200

//情景二
function Keith() {
  this.height = 100
  return 200
}
var boy = new Keith()
console.log(boy.height) //100
```

构造函数中的 this 指向的是实例化对象。如果构造函数内部有 return 语句，而且 return 后面跟着一个复杂数据类型（对象，数组等），new 命令会返回 return 语句指定的对象；如果 return 语句后面跟着一个简单数据类型（字符串，布尔值，数字等），则会忽略 return 语句，返回 this 对象。

### 定时器中的 this

#### 第一种：关于定时器延迟回调中的 this

```js
let obj = {
  fn: function () {
    setTimeout(function () {
      console.log('普通函数', this)
    }, 1000)
    setTimeout(() => {
      console.log('箭头函数', this)
    }, 1000)
  }
}
obj.fn()
```

在定时器中，延迟回调函数使用普通函数和箭头函数指向的 this 并不相同，使用普通函数，this 始终指向的是 window 对象，而使用箭头函数 this 绑定的是当前上下文中的 this，所以第一个普通函数的 this 指向的 window 对象，而第二个箭头函数中的 this 指向的是 obj 对象。

#### 第二种：延迟回调中传入对象函数

```js
const obj = {
  fn() {
    console.log(this)
  }
}
// 第一种
setTimeout(object.fn, 1000)
// 第二种
setTimeout(() => {
  object.fn()
}, 1000)
```

上面的第一种 this 是指向 window 的，因为对于 fn 函数的调用并不是 obj 进行调用的，而是 setTimeout 中延迟函数进行调用的，所以实际还是 window 调用。第二种中的调用并不是延迟回调的直接调用，而是在延迟回调函数中的间接调用，相当于在函数中去调用了一个对象函数，所以 this 指向的是 obj 对象。

### 事件回调中的 this

```html
<input type="button" value="one" onclick="console.log(this)" />
<input type="button" value="two" onclick="(()=>{console.log(this)})()" />
<input type="button" value="three" onclick="change()" />
<input type="button" value="four" onclick="person.say()" />
<script>
  function change() {
    console.log(this)
  }
  let person = {
    say: function () {
      console.log(this)
    }
  }
</script>
```

上面分别有四个 input 框，第一种是在 onclick 事件中直接调用语句，这个时候 this 是指向元素自身的。第二种是一个自执行函数包裹一个箭头函数，箭头函数的 this 是绑定当前上下文中的 this，所以这里的 this 还是指向元素自身。第三种的事件回调是调用了一个 change 函数，它并不是直接执行 onclick 函数，而是在 onclick 函数中去调用 change 函数，属于间接的调用，所以 this 是指向全局对象的。第四中也是间接调用，不同的是调用者是 person，所以这里的 this 指向的 person 对象。

### bind，call，apply 的区别？

首先三个方法都是用于改变上下文中的 this 指向，不同的是它们的调用方式和传递的参数不同。

1. 它们的第一个参数都是需要指向的对象。
2. bind 和 call 中可以传递多个参数，apply 中第二个参数是一个数组。
3. call 和 apply 都是会立即调用，bing 不会立即调用。

```js
let Person = {
  name: '小明'
}
let p = {
  sayName(age) {
    console.log(this.name + age)
  }
}
p.sayName.bind(Person, '18')()
p.sayName.call(Person, '18')
p.sayName.apply(Person, ['18'])
```

上面的案例可以清晰的看出它们之间的区别。

#### 第一种：简单的 this 判断

```js
var name = '小明'
var person1 = {
  name: '小张',
  say: function () {
    console.log(this.name)
  }
}
var person2 = { name: '小李' }
person1.say.call(person2)
```

在 person1 中调用 say 方法，通过 call 去改变 say 方法的指向，让它指向 person2，所以执行 say 方法时 this 指向 person2 对象中的 name，打印的是小李。

#### 第二种：使用的是箭头函数

```js
var name = '小明'
var person1 = {
  name: '小张',
  say: () => {
    console.log(this.name)
  }
}
var person2 = { name: '小李' }
person1.say.call(person2)
```

这里调用 say 方法时 this 的指向了 person2,但是由于 say 方法是箭头函数，箭头函数中的 this 指向上下文中的 this,所以这里的 this 指向的是 window 下的 this，打印的是小明。

#### 第三种：方法调用前和方法调用后的区别

```js
var name = '小明'
var person1 = {
  name: '小张',
  say: function () {
    return function () {
      console.log(this.name)
    }
  }
}
var person2 = { name: '小李' }
person1.say.call(person2)()
person1.say().call(person2)
```

上面的代码是关于 say 方法执行前改变 this 指向，还是 say 方法执行后改变 this 指向。如果是第一种是 say 方法执行前已经改变了 this 指向，相当于将 say 方法放在 person2 中进行执行，又由于 say 方法中是直接返回一个函数，我们知道直接返回函数的 this 指向的全局对象，所以第一个打印的 name 是小明，第二种是 say 方法调用完成后再改变 this 的指向，say 方法调用完成时返回的是一个函数，这个时候相当于将返回的函数放在 person2 对象中去执行，所以打印的是小李。

```js
var name = '小明'
var person1 = {
  name: '小张',
  say: function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person2 = { name: '小李' }
person1.say.call(person2)() // 小李
person1.say().call(person2) // 小明
```

### 总结：

1.全局作用域下的普通函数中：this->window  
 2.全局对象中：this->window  
 3.定时器中：this->window  
 4.箭头函数中： this 指向外层函数，如果外层没有函数就指向 window 5.构造函数中：this->当前实例化的对象  
 6.事件处理函数中：this->事件触发对象 7.在 js 中一般理解就是谁调用这个 this 就指向谁

普通函数中：this->window
定时器中：this->window
在箭头函数中 this 指向执行上下文
构造函数中：this->当前实例化的对象
事件处理函数中：this->事件触发对象
在 js 中一般理解就是谁调用这个 this 就指向谁

全局作用域下的普通函数中：this->window  
 全局对象中：this->window  
 定时器中：this->window  
 箭头函数中： this 指向外层函数，如果外层没有函数就指向 window
构造函数中：this->当前实例化的对象  
 事件处理函数中：this->事件触发对象
在 js 中一般理解就是谁调用这个 this 就指向谁
