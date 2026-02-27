## 修改下面的定时器，输出 1-5?

```js
for (var i = 0; i < 6; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
```

代码实现

::: code-group

```js [第一种]
// 利用块级作用域
for (let i = 0; i < 6; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
```

```js [第二种]
// 利用setTimeout第三个参数
for (var i = 0; i < 6; i++) {
  setTimeout(
    val => {
      console.log(val)
    },
    1000,
    i,
  )
}
```

```js [第三种]
// 利用闭包
for (var i = 0; i < 6; i++) {
  ;(function (y) {
    setTimeout(function () {
      console.log(y)
    }, 1000)
  })(i)
}
```

:::

## 提取url中的参数并转换成对象？

将`let url = "https://google.com?id=123&searchKey=word"`; 提取出 `{id:'123',searchKey:'word'}`;

<script setup>
  import W from './written.vue'
</script>

```js
let url = 'https://google.com?id=123&searchKey=word'
let str = url.split('?')[1]
let obj = {}
str.split('&').forEach(item => {
  let key = item.split('=')[0]
  let value = item.split('=')[1]
  obj[key] = value
})
let newObj = url.split('?')[0] + '?' + JSON.stringify(obj)
```
