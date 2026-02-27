## ajax 的请求的步骤有那些？{##1}

```js
// 创建 XMLHttpRequest 对象
var ajax = new XMLHttpRequest()

// 规定请求的类型、URL 以及是否异步处理请求。
ajax.open('GET', url, true)

// 发送信息至服务器时内容编码类型
ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

// 发送请求（此处可以添加请求的参数）
ajax.send(data)

// 接受服务器响应数据
ajax.onreadystatechange = function () {
  if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {
  }
}
```

## 如何使用 json-server 在本地创建一个服务？{##2}

第一步：全局安装 npm install json-server -g
第二步：根目录下新建一个 db.json 文件以及数据
第三步：根目录下快速搭建配置文件 npm init -y
第四步：将模块存储到 package.json 文件中 npm install json-server --save
第五步：修改 package.json 文件，启动服务 npm run json-server

## 谈谈 axios 的介绍？{##3}

概述：首先 axios 是基于 promise 的 http 库，可以在浏览器和 node.js 中运行，本质是对于 XHR 的封装，同时支持 promise 的实现版本，符合最新的 es 规范。
特点：支持 node.js 和浏览器运行
支持 promise 的所有 api
支持拦截请求及响应
支持转换请求数据及响应数据
支持取消请求
自动转换 json 数据
客服端支持防御 XSRF

JAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
AJAX 不是新的编程语言，而是一种使用现有标准的新方法。
AJAX 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。
优点：
可以实现页面进行局部更新，不需要刷新整个页面。
增加了对 JSONP 的支持，可以简单处理部分跨域等等
缺点：
ajax 不支持浏览器 back 按钮。

## get 和 post 请求方式的区别？{##4}

首先说一下 GET 和 POST 有什么区别：
1，GET 一般是从服务器上获取数据，POST 是向服务器提交数据。
2，GET 通过 URL 提交数据，数据在 URL 中可以看到，POST 则是在请求体内提交。
3，GET 提交的数据不能大于 2KB，而 POST 不受限制。
4，GET 数据容易泄露，POST 较为安全
5，GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留

get 是想服务器获取数据，post 是向服务器传递数据，或者说添加新的数据。
get 传递数据较小，一般小于 2kb，post 传递数据较大，一般默认不受限制。
get 安全性较低，post 相对安全性更高。
GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息
GET 参数通过 URL 传递，POST 放在 Request body 中
GET 请求在 URL 中传送的参数是有长度限制的，而 POST 没有
从缓存的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
从编码的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
从幂等性的角度，GET 是幂等的，而 POST 不是。(幂等表示执行相同的操作，结果也是相同的)
从 TCP 的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

BootCDN：https://www.cdn.bootcdn.net/
json-server 官网：https://www.npmjs.com/package/json-server
axios 中文文档：http://www.axios-js.com/zh-cn/docs/

## 请说明 webSocket 和 Ajax 有哪些不同？分别有什么限制？{##5}

区别：
1、通信方式：WebSocket 是一种双向通信协议，它使用 HTTP 协议进行握手后，在建立的 TCP 连接上进行数据传输。这意味着 WebSocket 连接建立后，服务器和客户端可以互相推送消息。相对之下，Ajax 是一种单向通信方式，它通过在后台向服务器发送 HTTP 请求来获取数据，通常是通过周期性地向服务器发送请求来更新数据。
2、实时性：由于 WebSocket 建立的是长连接，并且会话中保持连接，因此它非常适合实时通信。而 Ajax 则是异步的，实时性相对较差。
3、浏览器兼容性：WebSocket 在一些旧版本的浏览器中可能不被支持，而 Ajax 则具有更广泛的浏览器兼容性。

## axios 中请求拦截器和响应拦截器可以做什么? {##6}

请求拦截器使用场景:
发送请求时添加‘正在加载中...’图标
某些请求必须用户登陆，判断是否有用户 token，没有跳转到登陆页
对请求的参数进行序列化

响应拦截器使用场景：
status 是 200，响应拦截成功操作，返回 res.data 响应数据

如果 status 是 401，响应拦截失败，那么通常是 token 失效，没有授权，要跳转至登陆页；
// 请求拦截器 axios.interceptors.request.use(req=>{}, err=>{});
// 响应拦截器 axios.interceptors.reponse.use(req=>{}, err=>{});

## Token 一般是存放在哪里？Token 请求的流程？{##7}

解释：token 就是访问资源的凭证，一般是用户通过用户名和密码登录成功之后，服务器将登陆凭证做数字签名，加密之后得到的字符串作为 token。登录成功后会将 token 返回给客户端，方便下次登陆验证。
存储在 localStorage 中，每次调用接口的时候都把它当成一个字段传给后台。
存储在 cookie 中，让它自动发送，不过缺点就是不能跨域。

客户端携带账号和密码请求服务端
服务端验证请求，请求通过则签发 token 给客户端
客户端接收 token 后存储在 localstrage 中
下次客户端请求需要携带 token，如果服务端验证通过，则返回请求内容。

## 并发请求，怎么处理，如何控制并发量？{##8}

见并发请求案例
