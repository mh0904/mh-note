# 并发请求

---

theme: jzman
highlight: a11y-dark

---

# 前言

并发请求是面试中的高频问题，同时也是项目中经常会遇到的问题，所以在这里记录一下，希望可以帮助到你。本文主要从以下几个方面进行展开：

1.  在本地使用 `node` 创建并启动一个服务模拟项目中真实开发场景
2.  并发请求场景分析
3.  并发请求代码实现

# 创建并启动服务

##### 1. 创建一个 `server` 文件夹📁，在终端中 `npm init -y`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/730075bd67fc47df86b1919916279450~tplv-k3u1fbpfcp-watermark.image?)

##### 2. 使用 `yarn add express` 下载 `express` 框架

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dcc81953085479c9e10735ca30a5e83~tplv-k3u1fbpfcp-watermark.image?)

##### 3. 修改 `package.json`，并在 `server` 目录下创建 `app.js` 文件

```js
 "scripts": {
    "dev": "nodemon ./app.js"
  },
```

##### 4. 启动服务` npm run dev` ,如果报错：则下载 `sudo npm install -g --force nodemon` 重新 ` npm run dev`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acccd6f7d908494693497d65cd461fc8~tplv-k3u1fbpfcp-watermark.image?)

##### 5. 编写 `app.js` 文件

```js
// 引入express中间件
const express = require('express')

// 创建web服务器
const app = express()

// 跨域处理
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  next()
})

//请求
for (let i = 0; i < 100; i++) {
  //最大请求接口数是100个
  app.get('/test' + i, (req, res) => {
    res.send({
      result: `请求成功:请求的接口是第${i}`,
    })
  })
}

// 启动服务器监听8000端口
app.listen(8000, () => {
  console.log('启动成功')
})
```

##### 6. 在根目录下新建一个 `index.html` 文件用于引入 `axios`。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d45e576ce0c041ff887e93cfaaae4baf~tplv-k3u1fbpfcp-watermark.image?)

##### 7. 在`index.html` 文件中使用的是 `cdn` 的形式引入 `axios`。

```js
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
<script type="module" src="./index.js"></script>
```

# 并发请求场景分析

所谓并发请求，首先需要考虑并发数，并发数就是一次最多可以发送多少个请求，假设现在有 `10` 个 `url` 需要发送请求，控制并发数是 `3` ，那么就是一次最多可以发送 `3` 个，第一次时候拿出三个。如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8274642dc4ce4780ae856488dbb06758~tplv-k3u1fbpfcp-watermark.image?)

### 🤔这里我们需要思考五个问题。

##### \* 第一个问题：如何每次都可以取到三个 `URL` 去发送请求？

> 这里我们可以把请求放入到一个函数中，循环三次，当每次循环这个函数的时候就会发送一次请求。

```js
function runRequest() {
  //发送请求
}

for (let i = 0; i < 3; i++) {
  runRequest()
}
```

##### \* 第二个问题：我怎么知道当前我请求的是第几个？

> 我们知道请求的地址是一个数组，这里可以指定`index ===0`，第一次请求的时候拿到的是数组的第一项，后面调用 `runRequest` 让 `index++`，这样每次请求 runRequest 都会依次从数组中取出请求地址进行请求。

```js
let index = 0 // 用于指定当前请求的那个

async function runRequest() {
  const url = URLS[index]
  index++
  await axios(url)
}

for (let i = 0; i < 3; i++) {
  runRequest()
}
```

##### \* 第三个问题： 我是等待当前三个都请求完成以后再取出三个请求，还是等待三个中的一个请求完成以后再取出一个进行请求呢？

> 第一种情况需要等待上一轮的三个请求完成才会进行下一轮的请求，假如其中一个请求耗时比较长，那么仍然需要等待，从响应的时间的角度来说的话，第二种更好，第二种可以保证当前始终是3个请求。所以在上面的基础上我们可以这样做。

```js
let index = 0 // 用于指定当前请求的那个
async function runRequest() {
  const url = URLS[index]
  index++
  try {
    await axios(url)
  } catch (error) {
    // 错误处理
  } finally {
    runRequest() //当前三个中有一个请求完成，调用自己添加一个请求
  }
}

for (let i = 0; i < 3; i++) {
  runRequest()
}
```

##### \* 第四个问题：当前的 `URL1，URL2，URL3`中请求的结果如何正确的存放在`res1，res2，res3`中，可以使用 `push` 吗？

> 答案是不可以的，因为无法控制他们三个中谁先请求完成，假如 `URL2` 请求先完成，返回的结果 `push` 到一个数组中，那个整个请求返回的结果顺序就会发生错误。解决办法是当每一次 index++之前都将 `index` 保存在一个变量 i 中，当一个请求完成之后它对应的 i 不会发生改变，这样就可以将它存放在对应的位置。

```js
const Results = [] // 存放请求返回的结果
let index = 0 // 用于指定当前请求的那个

// 处理请求
async function runRequest() {
  let i = index
  const url = URLS[index]
  index++
  try {
    const res = await axios(url)
    Results[i] = res
  } catch (error) {
    Results[i] = error
  } finally {
    runRequest()
  }
}

for (let i = 0; i < 3; i++) {
  runRequest()
}
```

##### \* 第五个问题：如果并发数量比接口数量大，假如只有5个接口，但是并发数量是10个，怎么处理？

```js
let minNum = Math.min(URLS.length, maxNum)
for (let i = 0; i < minNum; i++) {
  runRequest()
}
```

# 并发请求代码实现

这里请求主要有三个文件：分别是`index.html,index.js`和 `EruptRequest.js`。值得注意的是⚠️，这里的使用的模块化语法，打开` index.html` 的时候需要用服务。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da03b86d36e1408cbc52b9c2d352d686~tplv-k3u1fbpfcp-watermark.image?)

##### `index.html`代码：

```js
<body>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
  <script type="module" src="./index.js"></script>
</body>
```

##### `index.js`完整代码：

```js
import { dealtRequest } from './EruptRequest.js'

// 遍历拿到 url 的集合
function getStack(num) {
  const BASE_URL = 'http://localhost:8000/'
  let stacks = []
  for (let i = 0; i < num; i++) {
    stacks.push(BASE_URL + 'test' + i)
  }
  return stacks
}

let URLS = getStack(10) //请求总接口数
let maxNum = 3 //请求最大并发数

let result = dealtRequest(URLS, maxNum)
console.log(result)
```

##### `EruptRequest.js`完整代码：

```js
//处理并发请求
export function dealtRequest(URLS, maxNum) {
  const Results = [] // 存放请求返回的结果
  let index = 0 // 用于指定当前请求的那个

  // 处理请求
  async function runRequest() {
    //这里要控制 index 的长度，如果index++ 一直增加就会造成死循环
    if (URLS.length === index) return
    let i = index //
    const url = URLS[index]
    index++
    try {
      const res = await axios(url)
      Results[i] = res
    } catch (error) {
      Results[i] = error
    } finally {
      runRequest()
    }
  }

  // 比较并发数和接口的数量，防止出现只有5个接口，并发数10的情况
  let minNum = Math.min(URLS.length, maxNum)

  for (let i = 0; i < minNum; i++) {
    runRequest()
  }

  // 这个返回的是一个成功的 promise 对象 ，用于存储最后的请求结果
  return new Promise(reslove => {
    reslove(Results)
  })
}
```
