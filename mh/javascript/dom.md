# 目录

- [元素拖动如何实现？原理是什么？](##2)
- [js 中事件绑定和普通事件的区别是什么？](##3)
- [延迟加载的方式有哪些？](##4)
- [js 中各种位置，比如 clientHeight、scrollHeight、offsetHeight 区别？](##5)
- [如何在原生中更改 dom 元素的 css 属性？](##6)
- [常见的 DOM 事件对象有哪些？](##7)
- [为什么 js 会阻碍渲染？](##9)
- [script 标签中 defer 和 async 的区别？](##10)
- [什么是事件冒泡，什么是事件捕获？如何阻止事件冒泡？](##11)
- [如何让事件先冒泡后捕获？](##12)
- [什么是事件委托？](##13)

## 元素拖动如何实现？原理是什么？{##2}

实现元素的拖动功能主要依赖于 JavaScript 的事件监听和处理机制，以及 CSS 样式的动态调整。（具体的可以后面有时间再尝试）

## js 中事件绑定和普通事件的区别是什么？{##3}

普通事件：
普通事件是直接触发事件，当一个 DOM 元素被添加多个相同事件的时候，只会触发一次。例如：

```js
var btn = document.getElementById('btn')
btn.onclick = function () {
  alert('你好 111')
}
btn.onclick = function () {
  alert('你好 222')
}
```

输出的结果只会有`你好 222`，这是由于一个处理器同一时间只能指向唯一的对象，虽然上面的 btn 对象绑定了两个事件，其结果会被覆盖。

事件绑定：
事件绑定对于多次绑定的事件对象，都会被触发。例如：

```js
var btn = document.getElementById('btn')
btn.addEventListener(
  'click',
  function () {
    alert('你好 111')
  },
  false
)
btn.addEventListener(
  'click',
  function () {
    alert('你好 222')
  },
  false
)
```

运行结果会依次弹出你好 111，你好 222 的弹出框。

## 延迟加载的方式有哪些？{##4}

方式一：可以使用图片懒加载，具体的做法就是一开始对图片的 src 设置为一个占位图片，然后将真实的地址赋值给 data-src 或者其他自定义属性中，当图片的图片进入视口时替换 src。
方法二：具体在 vue 和 react 的项目中可以结合实际请求使用路由懒加载或者组件懒加载等。
方式三：可以在 script 标签中使用 async 和 defer 属性，async 和 defer 属性都是用于异步加载 js 文件。

## js 中各种位置，比如 clientHeight、scrollHeight、offsetHeight 区别？{##5}

clientHeight：clientHeight 属性返回元素的内部高度（以像素计），包括填充（padding），但不包括水平滚动条（如果可见）、边框（border）和外边距（margin）。
scrollHeight：scrollHeight 属性返回元素的总高度（以像素计），包括填充（padding）、溢出内容（overflow）和边框（border）。
offsetHeight：offsetHeight 属性返回元素的布局高度（以像素计），包括填充（padding）、边框（border）、滚动条（如果可见）和外边距（margin）。

## 如何在原生中更改 dom 元素的 css 属性？{##6}

```js
const box = document.getElementById('box')
box.style.color = 'red' // 设置单独一个 css 属性
box.style = 'height: 100px; width: 100px; background: red;' // 设置一个或者多个 css 属性
box.style.cssText = ' height: 100px; width: 100px; background: red;' // 设置一个或者多个 css 属性
```

## 常见的 DOM 事件对象有哪些？{##7}

## script 标签中 defer 和 async 的区别？{##10}

正常的 javascript 文件是如何加载的？
1、浏览器会从上到下，从左到右对 HTML 文档进行解析，当遇到 script 标签的时候会停止解析 HTML，对 script 标签进行加载和执行。
2、对于内联 JavaScript（即直接写在 script 标签中的代码），浏览器会立即执行它。对于外部 JavaScript（即使用 src 属性指向的外部.js 文件），浏览器会发送一个 HTTP 请求到服务器，以获取该文件。所以在 js 文件下载的期间会阻塞 HTML 的解析，同时你会看到页面空白的情况。

使用 async 异步加载？
1、async 的加载是异步的，相对于正常的 javascript 文件来说，async 的加载是一开始就会下载，而不是等待解析到 javascript 文件时才去下载，同时 async 的执行会在 javascript 文件下载完成后立即执行，此时很有可能 HTML 元素并没有渲染完成。总结就是 async 是异步加载同时是加载完后立即执行，这样的不好地方是如果当前 script 中有对于 DOM 的修改，可能会出问题。所以适用于第三方脚本使用，不依赖当前的 DOM 的情景。

使用 defer 延迟执行？
1、defer 是也是异步加载的，但是和 async 不同的是 defer 不是加载完 js 脚本后立即执行的，而是等待当前的 DOM 执行完成后再执行 js 脚本，所以 defer 更加适用当前 script 中 DOM 有修改的情况。

## 什么是事件冒泡，什么是事件捕获？如何阻止事件冒泡？{##11}

事件冒泡指的是事件由内向外的事件传播，直到根元素，而事件捕获与冒泡相反，是由外向内进行事件的传播。事件通常是先捕获再冒泡，如果不设置，默认情况下事件是在冒泡阶段开始触发。

addEventListener()方法是一个监听器，用于监听事件，具体用法如下：
addEventListener(event, function, useCapture)
参数 event 是必须的，表示监听的事件，例如 click, touchstart 等，就是之前不加前缀 on 的事件。
参数 function 也是必须的，表示事件触发后调用的函数，可以是外部定义函数，也可以是匿名函数。
参数 useCapture 是选填的，填 true 或者 false，用于描述事件是冒泡还是捕获，true 表示捕获，默认的 false 表示冒泡。

阻止冒泡：
第一种：event.stopPropagation();
第二种：return false;
第三种：event.preventDefault();

## 如何让事件先冒泡后捕获？{##12}

根据 w3c 标准，应先捕获再冒泡。若要实现先冒泡后捕获，给一个元素绑定两个 addEventListener，其中一个第三个参数设置为 false（即冒泡），另一个第三个参数设置为 true（即捕获），调整它们的代码顺序，将设置为 false 的监听事件放在设置为 true 的监听事件前面即可。

## 什么是事件委托？{##13}

事件委托就是将子集的事件委托给父级处理。
优点：
减少了事件的绑定，减少了内存消耗。
为动态添加的元素绑定事件
缺点：
部分事件，如 focus、blur 等无冒泡机制，所以无法委托。
事件委托有对子元素的查找过程，委托层级过深，可能会有性能问题
频繁触发的事件如 mousemove、mouseout、mouseover 等，不适合事件委托
事件委托的实现案例：

```html
<ul>
  <li>香蕉</li>
  <li>苹果</li>
  <li>鸭梨</li>
</ul>
```

```js
const li = document.querySelectorAll('li')
const ul = document.querySelector('ul')
//不使用事件委托
for (let i = 0; i < li.length; i++) {
  li[i].onclick = function (e) {
    ul.removeChild(e.target)
  }
}
// 使用事件委托
ul.onclick = function (e) {
  ul.removeChild(e.target)
}
```
