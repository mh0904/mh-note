## 什么是闭包?闭包使用场景？

1. 官方的解释是：闭包是一个函数对于其周边环境的状态的引用的组合叫做闭包，这里的周边环境叫词法环境。
2. 特点：常见的闭包形式是函数嵌套函数，内部函数可以访问外部函数的局部作用域，外部函数访问不到内部函数的作用域。由于闭包中的变量存储在内存中，所以不会被垃圾回收机制回收。同时也避免了被全局变量的污染。
3. 写一个简单的闭包分析代码。

```js
function fn() {
  let num = 1 // 初始化一个局部变量 num，用于记录调用次数
  return function () {
    num++ // 递增局部变量 num
    console.log(num) // 打印递增后的 num 值
  }
}
let result = fn()
result() // 2
result() // 3
result() // 4
```

场景：闭包的常见应用十分广泛，例如常见的防抖，节流函数、定时器，事件回调、一个函数内部返回一个匿名函数、ajax 请求、promise 等。

## 什么是内存泄露？

1. 解释：内存泄露是指不再用的内存没有被及时释放出来，导致该段内存无法被使用就是内存泄漏。
2. 内存泄漏指我们无法在通过 js 访问某个对象，而垃圾回收机制却认为该对象还在被引用，因此垃圾回收机制不会释放该对象，导致该块内存永远无法释放，积少成多，系统会越来越卡以至于崩溃。
3. 常见的导致内存泄露
   3.1、全局变量导致的内存泄露：
   如果在函数内部声明变量时忘记使用 var、let 或 const 关键字，那么这个变量就会成为全局变量。全局变量的生命周期是整个应用程序的运行期，即使不再需要它，它也不会被垃圾回收机制回收，从而导致内存泄露。

   3.2、闭包导致的内存泄露：
   闭包是 JavaScript 中强大的特性之一，但它也可能导致内存泄露。如果闭包引用了外部函数的变量，并且这个闭包被持续引用，那么即使外部函数执行完毕，它的变量也无法被垃圾回收。特别是当闭包作为回调函数使用时，如果回调函数被频繁创建且长时间存在，就可能造成内存泄露。

   3.3、定时器未及时清除：
   使用 setInterval 或 setTimeout 创建的定时器如果没有被清除（使用 clearInterval 或 clearTimeout），那么即使相关的函数或对象已经不再需要，定时器仍然会存在并占用内存。

   3.4、DOM 的引用没有及时释放：
   如果 JavaScript 对象持续引用了不再需要的 DOM 元素（如通过 document.getElementById 获取的 DOM 对象），即使该 DOM 元素已经从 DOM 树中移除，它也无法被垃圾回收。

   3.5、事件监听器没有移除：
   如果为 DOM 元素添加了事件监听器，但没有在适当的时机移除它们（使用 removeEventListener），那么即使相关的 DOM 元素或 JavaScript 对象不再需要，事件监听器仍然会占用内存。

## 垃圾回收机制都有哪些策略？

1.  标记清除法：垃圾回收机制获取根并标记他们，然后访问并标记所有来自它们的引用，然后在访问这些对象并标记它们的引用…如此递进结束后若发现有没有标记的（不可达的）进行删除，进入执行环境的不能进行删除
2.  引用计数法：当声明一个变量并给该变量赋值一个引用类型的值时候，该值的计数+1，当该值赋值给另一个变量的时候，该计数+1，当该值被其他值取代的时候，该计数-1，当计数变为 0 的时候，说明无法访问该值了，垃圾回收机制清除该对象
3.  缺点： 当两个对象循环引用的时候，引用计数无计可施。如果循环引用多次执行的话，会造成崩溃等问题。所以后来被标记清除法取代。

### 什么是原型？什么是原型链？

原型： 原型分为隐式原型和显式原型，每个对象都有一个隐式原型，它指向自己的构造函数的显式原型。
原型链： 多个`__proto__`组成的集合成为原型链
所有实例的`__proto__`都指向他们构造函数的 prototype
所有的 prototype 都是对象，自然它的`__proto__`指向的是 Object()的 prototype
所有的构造函数的隐式原型指向的都是 Function()的显示原型
Object 的隐式原型是 null

原型：每一个 JavaScript 对象（null 除外）在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性，其实就是 prototype 对象。
原型链：由相互关联的原型组成的链状结构就是原型链。

如图所示：我们通过 new 的形式构造一个实例对象（person），每一个实例对象身上都有隐藏的属性`__proto__`，这是链接实例对象和原型的桥梁，（ `__proto__` 就是一条原型链中的一环），通过这种方式我们可以访问原型对象上的属性和方法。由于原型对象本身也是一个对象，它也有`__proto__`属性，同样它也可以向上查找它的原型属性和方法，这种链式的查找结构就是原型链。

### 常见的继承?

概念：
一个对象能够访问另一个对象的属性，同时，这个对象还能够添加自己新的属性或是覆盖可访问的另一个对象的属性，我们实现这个目标的方式叫做“继承”。

以构造函数的方式解析继承：
javaScript 通过原型链的方式实现继承。

常见的继承方式：
原型链继承
构造函数继承（借助 call）
组合继承
原型式继承
寄生式继承
寄生组合式继承

```js
function Animal() {
  // 原型链的继承 //本质是重写原型对象
  this.name = '大毛'
}
Animal.prototype.sendEat = function () {
  return '吃饭了'
}
function Cat() {
  this.age = 18
}
// 这里是关键，创建 Animal 的实例，并将该实例赋值给 Cat.prototype
Cat.prototype = new Animal()

var cat1 = new Cat()
console.log(cat1.name) //大毛
```

### 具名导出和默认导出的区别?

1、具名导出可以在一个文件中使用多次，而默认导出只能使用一次
2、具名导出需要声明的同时导出，而默认导出允许先声明后导出
3、同时使用默认导出和具名导出在导入的时候也有所不同，具名导出时在导入时必须使用{},默认导出在导入时不需要使用{},且可以为导入的内容指定任意名称。

```js
// --------具名导出-------
// // 导出声明
export let str = 'hello word';
export function fn() {
return 1 + 1;
}

// 导出列表
let arr = [1, 2, 3];
class ClassName {}
export { arr, ClassName };

// 使用 as 重命名导出
function Car() {}
let car = new Car();
export { car as xiaohua };

// (一)错误示范
let num = 123
export num
// 解释：export 中需要你声明的同时需要导出，而不是先声明后导出，export 不可以导出一个值，如果需要导出一个值可以使用默认导出的方式，当然你可以使用声明导出的方式 export let num = 123 或者命名导出的方式 let num = 123; export { num }。

// (二)错误示范
function person() { }
export person
// 解释：同理上面的这种也是不行的，使用 export 导出时需要明确导出的内容。
// -------- 默认导出 ---------
function expression() {}
let fun = function(){}
export default expression
// 或者
export default {
  expression,
  fun
}

// 甚至你可以这样写
export default 1 + 1
// 或者
export default 2

function dog() {}
export {dog as default}
// 和这种写法是一样的
export default dog
```

### import 的几种用法？

1、import 的作用是导入另一个模块中的只读动态绑定。
解释：这里的导出绑定称为只读动态绑定，意思是对于从另一个模块中导出的内容是只读的，不可以在导入模块中修改，同时是动态的，因为如果需要修改只能是导出模块进行更新。
2、默认导入（对于默认导入的内容是可以任意命名）例如:import defaultExport from "module-name";
3、具名导入（对应的是具名导出的内容） 例如：import { export1, export2 } from "module-name";
4、命名空间导入 例如：import \_ as all from "./export_command.js"; 解释：可以将导入的所有内容放在一个 Module 对象中，这样通过命名空间取出导入的内容
5、副作用导入 例如：import "module-name"; 解释：这里导入的 module-name 文件的内容并没有对其进行使用，只是在当前的文件中引入了它，而这个模块的加载可能会触发某些网络请求，或者改变全局变量，这些改变是由导入模块的代码引起的，而不是 import 语句本身引起的。

### import 函数初体验?

1、import 语句用于静态加载模块（es6 提出），import()函数用于动态加载模块（es2020 提出）。
2、import 语句在编译时已经确定了加载的对象，所以不能写在条件判断和函数中，一般写在模块的顶层。
if (x === 2) {import MyModual from './myModual';} // 报错
3、import 函数是在运行时加载相应的模块，同时支持动态加载，所以可以写在任何地方。
4、import()函数返回的是一个 promise 对象。例如：import('./export_command.js').then(({sayName})=>{ sayName() })
5、Node 的 require 方法和 import()函数的加载方式类似，不同的是 require()函数是同步加载，import()支持异步加载。 例如：import('./export_command.js').then(({sayName})=>{ sayName() })

### js 的执行上下文？

1. js 执行上下文可以理解为当前代码运行的环境，js 执行上下文分为全局执行上下文，函数执行上下文和 eval 执行上下文。

### 什么情况下会创建执行上下文？

1. 进入全局代码;
2. 进入 function 函数体
3. 进入 eval 函数指向的代码
4. 进入 module 代码

### 全局执行上下文？

1. 全局执行上下文的文本环境有两部分组成，第一部分是全局对象，全局对象指向 window，第二部分是全局 scope。
2. var，function 创建的对象保存在全局对象中，let、const、class 声明的对象保存在全局 scope 中
3. js 代码执行过程中，查找变量的顺序是先查找全局 scope，如果没有再查找全局对象。

```js
// 案例一
function foo() {}
function bar() {
  let a = 1
  foo()
}
console.log(a)
var a = 2
bar()
```

### 执行步骤。

第一步：进入全局代码，创建全局执行上下文，并压入执行栈中。
第二步：收集顶级变量，并进行 foo，bar 以及 a 变量的查重处理（查重规则可参考关键字的规则）。
第三步：创建绑定，初始化处理。
解释：此时全局有三个顶级变量，分别是 foo，bar 以及 a，因为 function 和 var 的变量都是创建在全局对象中的，如图，并且将 var 声明的变量初始化为 undefined， function 声明的变量初始化为函数对象，并且函数初始化时保存了创建时候的文本环境，所以此时 foo 和 bar 都保存了创建时候的全局文本环境。（注意：对于 let，const，class 声明的变量这一步并没有进行初始化）
第四步：执行语句。
解释：将 var 声明的全局变量 a 赋值 2，然后执行 bar 函数，执行 bar 函数同时也会创建 bar 函数执行上下文，并加入执行栈中，bar 函数执行上下文的文本环境中有 let 声明的变量 a，以及 foo 执行函数，此时会继续第二步的操作，进行查重处理。
第五步：此时会将 let 声明的变量 a 登记在函数 scope 中，此处的 a 存在 bar 函数的文本环境中，所以不会影响全局的 a，又由于 a 是 let 声明的，所以此时的 a 并没有进行初始化。(注意：函数的文本环境只有 scope，区别于全局执行上下文有全局对象以及全局 scope)
第六步：执行 foo 函数同时创建 foo 函数执行上下文，并加入执行栈中，只有输出 a，当前的 foo 函数的文本环境中并没有变量 a，所以它会去父级作用域中全寻找，并打印

## 谈谈你对作用域的理解？

作用域是可访问变量的集合或者说范围（例如全局的范围、函数的范围、语句块的范围），在作用域内，变量可访问，在作用域外变量不可访问。
js 是词法作用域，变量的访问范围仅由声明时候的区域决定。
js 的作用域可以分为 3 类
全局作用域：在全局环境下声明的变量。在任意位置可以访问到。
函数作用域：在函数内部声明的变量，函数内部和函数内部声明的函数中都可以访问到。访问变量时候先在函数内部找，找不到则在外层函数中找，直到全局作用域，形成“作用域链”。 函数作用域有“变量提升”和“函数声明提升”的特性。
块级作用域：在语句块声明的变量，使用 let 和 const 声明的变量才作用于块级作用域，块级作用域没有变量提升。

## 什么是作用域链？如何延长？

作用域链：默认情况下，js 代码处于全局作用域（0 级），当我们声明一个函数的时候，就会开辟一个局部作用域（1 级）。 函数里面也可以声明函数，就会又形成局部作用域（2 级）,以此类推就会形成作用域链。

延长作用域链的方法：
1、try-catch 语句的 catch 块：会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。
2、with 语句：会将指定的对象添加到作用域链中。

## 变量提升是什么？与函数提升有什么区别？

变量提升：
1、变量的提升只有声明会被提升，初始化不会被提升。
2、变量提升的位置是当前作用域的顶部

      案例一
        console.log(str) // undefined
        var str = 111
      案例一编译后
        var str
        console.log(str) // undefined
        str = 111

      案例二
        if (!foo) {
          var foo = 5
        }
        console.log(foo) // 5
      案例二编译后
        var foo //会将if语句中的声明提升
        if (!foo) {
          foo = 5
        }
        console.log(foo) // 5

      案例三
        let str = 3
        function fn() {
          var str = str || 5
          console.log(str) // 5
        }
        fn()
      案例三编译后
        let str = 3
        function fn() {
          var str
          str = str || 5 //编译后变量str会被提升，所以等号右边的str是undefined
          console.log(str)
        }
        fn()

      函数提升：
        1、函数的声明和初始化都会被提升。
        2、函数的表达式不会被提升。

      案例一
        console.log(fn(3)) // 6
        function fn(num) {
          return num + num
        }
      案例一编译后
        function fn(num) {
          return num + num
        }
        console.log(fn(3)) // 6

      案例二
        console.log(fn(3)) // fn is not a function
        var fn = function (num) {
          return num + num
        }
      案例二编译后
        var fn
        console.log(fn(3)) // fn is not a function
        fn = function (num) {
          return num + num
        }

      案例三
        foo() // 2
        var foo = function () {
          console.log(1)
        }
        foo() // 1
        function foo() {
          console.log(2)
        }
        foo() // 1
      案例三编译后
        var foo
        function foo() {
          console.log(2)
        }
        foo() // 2
        foo = function () {
          console.log(1)
        }
        foo() // 1
        foo() // 1

## 基础的函数作用域

```js
var a = 1
function m1() {
  console.log(a)
}
function m2() {
  var a = 2
  m1()
}
m2()
// 解释：函数的作用域是在函数声明的地方，不是在函数调用的地方，使用打印 1
```
