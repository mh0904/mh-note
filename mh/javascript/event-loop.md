## 宏任务和微任务有那些？

宏任务和微任务是浏览器早期的叫法，现在对于任务的
1、宏任务：script、setTimeOut、setInterval、setImmediate
2、微任务:promise.then,process.nextTick、Object.observe、MutationObserver
注意：Promise 是同步任务

## 什么是进程和线程？

![alt text](../../images/javascript/event-loop-01.jpg)

进程
简单的理解就是程序运行的内存空间。
每个程序至少有一个进程，进程之间相互独立，即使需要通信也需要双方同意。
解释：比如手机中微信和支付宝所运行的内存空间是互相不影响的，微信卡死了，支付宝仍然可以使用

1. 浏览器中拥有多个进程和多个线程的，当浏览器启动的时候至少会开辟三块进程，比如：浏览器进程、渲染进程、网络进程。

2. 如何查看浏览器的进程？
   在浏览器的的更多工具中查看任务管理器。
   ![alt text](../../images/javascript/event-loop-02.jpg)

3. 浏览器中的渲染线程的介绍?
   默认情况下浏览器会为每个标签页开启一个渲染进程，当渲染进程开启后会默认开启一个渲染主线程，渲染主线程的工作就是执行 css，html，js 代码。

4. 渲染主线程是如何工作的？
   渲染主线程一开始进入无限循环，当消息队列中有任务需要执行的时候，渲染主线程会从任务队列中拿出任务进行执行，消息队列中的任务需要是先进先出，后进后出的原则，当消息队列中没有任务需要执行的时候，渲染主线程会进入休眠的状态。同时其他的线程可以随时向消息队列中添加任务，比如点击事件，定时器等等，这里其他的任务会添加在消息队列的末尾，等待渲染主线程空闲的时候进行执行。这样循环的过程就是事件循环。
   ![alt text](../../images/javascript/event-loop-03.jpg)

线程
有了进程就需要运行程序，那么线程的作用就是运行代码。
一般情况一个进程中包含多个线程，进程开启后会创建多个线程来运行代码。

## 谈一谈 js 的事件循环机制？

js 的事件循环是 js 执行异步代码和回调函数的核心机制，是实现单线程环境非阻塞执行的核心原理。
1、调用栈：调用栈又叫执行栈，用于执行代码。
2、任务队列：任务队列又叫消息队列，用于存放异步任务，事件循环的过程就是从任务队列中不断取出任务执行的过程。
3、线程：是操作系统中资源调度的基本单位，比如常见的有 js 引擎线程，事件触发线程，定时器线程，http 请求线程。
事件循环的过程：由于 js 是单线程的，但遇到同步代码，比如函数会将其压入执行栈中执行，待执行完成从执行栈中弹出。当遇到异步代码，比如定时器，会将它交给对应的线程处理，当定时器时间到了将其交给延时队列，所谓的事件循环就是将任务队列中的任务压入渲染主线程的执行栈中进行执行，可能在执行的过程中，又遇到了定时器，这个时候会将定时器再次交给对应的定时器线程进行处理，等待执行完成再交给延时队列，然后从延时队列中拿出对应的回调函数执行。以此往复就是事件循环的过程。在一次事件循环中事件的执行顺序是先执行同步任务，再执行异步任务，在异步任务中微任务中的优先级更高，宏任务的优先级较低，在宏任务中交互任务的优先级高于延时任务的优先级。
![alt text](../../images/javascript/event-loop-04.jpg)

## 如何理解 js 是异步的？

JS 是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的未尾排队，等待主线程调度执行。
在这种异步模式下，浏览器永不阻塞，从而显大限度的保证了单线程的流畅运行。

## 为什么 js 会阻碍渲染？

JS 之所以阻塞渲染，是因为 JS 执行与渲染相关任务都在争夺主线程有限的资源。
当 JS 执行时间过长，渲染相关任务就没时间执行了。

阻塞案例：

```js
<h2 id="hello">hello</h2>
<button onclick="change()">点击英文变中文</button>

const hello = document.getElementById('hello')
//制造一个死循环
function prevent(newVal) {
  var start = Date.now()
  while (Date.now() - start < newVal) {}
}
function change() {
  hello.innerHTML = '你好'
  prevent(3000)
}
```

## js 的计时器可以做到精确计时吗？为什么？

1. 不同的操作系统中的计时器有少量的偏差，js 中的计时器本身调用的是操作系统中的函数，所以存在偏差。
2. 由于事件循环的影响，计时器是在浏览器的空闲时进行执行，所以也会有偏差。

## 案例

```js
//-------------------------js的事件循环机制？**-----------------------
// var p = new Promise((resolve) => {
//   console.log(4)
//   resolve(5)
// })
// function fun1() {
//   console.log(1)
// }
// function fun2() {
//   setTimeout(() => {
//     console.log(2)
//   })
//   fun1()
//   console.log(3)
//   p.then((res) => {
//     console.log(res)
//   })
//     .then(() => {
//       console.log(6)
//     })
//     .then(() => {
//       console.log(7)
//     })
// }
// fun2()

//  宏任务和微任务都是怎样执行的？
// 1.执行宏任务script，
// 2.进入script后，所有的同步任务主线程执行
// 3.所有宏任务放入宏任务执行队列
// 4.所有微任务放入微任务执行队列
// 5.先清空微任务队列，
// 6.再取一个宏任务，执行，再清空微任务队列
// 7.依次循环

// ----------------    案例一   **--------------------
// setTimeout(function () {
//   console.log('1')
// })
// new Promise(function (resolve) {
//   console.log('2')
//   resolve()
// }).then(function () {
//   console.log('3')
// })
// console.log('4')
// new Promise(function (resolve) {
//   console.log('5')
//   resolve()
// }).then(function () {
//   console.log('6')
// })
// setTimeout(function () {
//   console.log('7')
// })
// function bar() {
//   console.log('8')
//   foo()
// }
// function foo() {
//   console.log('9')
// }
// console.log('10')
// bar()
// 解析：
// 1.首先浏览器执行Js代码由上至下顺序，遇到setTimeout，把setTimeout分发到宏任务Event Queue中
// 2.new Promise属于主线程任务直接执行打印2
// 3.Promis下的then方法属于微任务，把then分到微任务 Event Queue中
// 4.console.log(‘4’)属于主线程任务，直接执行打印4
// 5.又遇到new Promise也是直接执行打印5，Promise 下到then分发到微任务Event Queue中
// 6.又遇到setTimouse也是直接分发到宏任务Event Queue中，等待执行
// 7.console.log(‘10’)属于主线程任务直接执行
// 8.遇到bar()函数调用，执行构造函数内到代码，打印8，在bar函数中调用foo函数，执行foo函数到中代码，打印9
// 9.主线程中任务执行完后，就要执行分发到微任务Event Queue中代码，实行先进先出，所以依次打印3，6
// 10.微任务Event Queue中代码执行完，就执行宏任务Event Queue中代码，也是先进先出，依次打印1，7。

// -------------------  案例二  ***--------------
// setTimeout(() => {
//   console.log('1')
//   new Promise(function (resolve) {
//     console.log('2')
//     setTimeout(() => {
//       console.log('3')
//     }, 0)
//     resolve()
//   }).then(function () {
//     console.log('4')
//   })
// }, 0)
// console.log('5')
// setTimeout(() => {
//   console.log('6')
// }, 0)
// new Promise(function (resolve) {
//   console.log('7')
//   resolve()
// })
//   .then(function () {
//     console.log('8')
//   })
//   .catch(function () {
//     console.log('9')
//   })
// console.log('10')

// -------------------  案例三  美团 ***--------------
// async function async1() {
//   console.log(1)
//   await async2()
//   console.log(2)
// }
// async function async2() {
//   console.log(3)
// }
// console.log(4)
// setTimeout(function () {
//   console.log(5)
// }, 0)
// async1()
// new Promise(function (resolve) {
//   console.log(6)
//   resolve()
// }).then(function () {
//   console.log(7)
// })
// console.log(8)

// -------------------  案例三 协创 ***--------------
// setTimeout(() => {
//   console.log(2)
//   Promise.resolve().then(() => {
//     console.log(3)
//   })
// }, 0)
// new Promise(function (resolve) {
//   console.log(4)
//   setTimeout(function () {
//     console.log(5)
//     resolve(6)
//   }, 0)
// }).then((res) => {
//   console.log(7)
//   setTimeout(() => {
//     console.log(res)
//   }, 0)
// })
// console.log(1)
```
