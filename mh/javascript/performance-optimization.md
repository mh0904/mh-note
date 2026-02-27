## 减少DOM操作，使用文档碎片

```js
// ----------- 第一种 ----------
const list1 = document.getElementById('list1')
for (let index = 1; index < 5; index++) {
  const li = document.createElement('li')
  li.innerHTML = `项目${index}`
  list1.appendChild(li) // 操作了5次DOM
}

// ----------- 使用文档碎片 ----------
const list2 = document.getElementById('list2')
const fragment = document.createDocumentFragment()
for (let index = 1; index < 5; index++) {
  const li = document.createElement('li')
  li.innerHTML = `项目${index}`
  fragment.appendChild(li)
}
list2.appendChild(fragment) // 操作了一次
// 解释：fragment是存储在内存中的,
```

## 谈谈节流和防抖的实现及场景？

防抖：设置一段时间，当用户连续触发事件的时候，此时只会执行一次。
描述：防抖像电梯关门，进入一个人，则需要等待 3 秒钟，再进来一个人，则再等待 3 秒钟，直至没有人进入则关门。
应用场景： 1.用户连续点击按钮向服务端发送请求。 2.实时搜索框。 3.当浏览器尺寸变化，改变布局等等。

```js
function debounce(doSome, time) {
  let setT
  return function () {
    clearTimeout(setT)
    setT = setTimeout(doSome, time)
  }
}
let func = debounce(doSome, 500)

window.onresize = func

function doSome() {
  console.log('页面size改变了')
}
```

节流：设置一段时间，当用户连续点击的时候，每隔一段时间执行一次。
描述：节流的作用就是减少事件频率，和防抖最大的区别是节流是每隔一段时间触发，而防抖是防止事件在设定的时间内多次触发。举个例子：之前你的老板要求你上班的 12 个小时内每个小时都向他汇报工作，后来你把老板打了一顿，老板要求你每隔 3 个小时向他汇报一次工作，那么后者就做到了节流。
应用场景： 1.滚动条滚动 2.鼠标移动 3.当浏览器尺寸变化，改变布局等等。

```js
function throttle(doSome, time) {
  let isOpen = true
  return function () {
    if (isOpen) {
      doSome()
      isOpen = false
      setTimeout(() => {
        isOpen = true
      }, time)
    }
  }
}
let func = throttle(doSome, 2000)
window.onresize = func
function doSome() {
  console.log('页面size改变了')
}
```
