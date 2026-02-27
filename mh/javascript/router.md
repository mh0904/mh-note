## hash 路由和 history 路由的实现原理是？在部署方面有什么区别呢？

url 的表现形式：
1、hash 路由的 url 后面会有#号，比如：http://www.example.com/#/home。#号后面的值表示hash值，hash值不会传递给服务端，只会在浏览器中解析和处理。
2、history 路由的 url 没有#，同时http://www.example.com/home，同时这种路由的变化需要服务端和客户端同时支持。所有history路由在客户端需要配置404页面，防止服务端解析不到对应的url。

实现原理：
1、hash 路由是利用 window.location.hash 属性实现路由的跳转，当 hash 值发生变化的时候就会触发 hashchange 事件，通过监听这个事件实现页面的无刷新跳转。同时兼容性较好。
2、history 路由的实现是通过 html5 中提供的 history api 实现路由的跳转。比如常见的方法有 history.pushState()、history.replaceState()、用于增加和修改浏览器的历史记录栈。不会触发页面的跳转。同时通过监听 popState 可以用于监听用户点击浏览器的前进和后退的行为。

部署方面：由于 hash 路由不会造成 404 Not Found，所以客户端不需要部署 404 页面，而 history 会造成 404 所以需要对于不存在的地址，服务端返回 404 Not Found，前端根据返回的 404 匹配到 404 页面。

适用场景：一般对于 SEO 要求不高的后台系统建议使用 hash 路由，对于 SEO 相对要求较高，同时体验要求较高的电商系统或者新闻网站可以使用 history。

## hash路由实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div>
      <ul>
        <li><a href="#/home">首页</a></li>
        <li><a href="#/user">用户中心</a></li>
        <li><a href="#/login">登陆</a></li>
      </ul>
      <div id="view"></div>
    </div>
  </body>
</html>

<script>
  // 声明一个view
  let view = null
  // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
  window.addEventListener('DOMContentLoaded', onload)
  // 监听hash的变化 hashchange用于监听hash值的变化
  window.addEventListener('hashchange', setViewChange)
  function onload() {
    view = document.getElementById('view')
    // 一开始进入页面匹配路由
    setViewChange()
  }
  function setViewChange() {
    if (!this.location.hash) {
      //初始化路由
      view.innerHTML = '首页'
    }
    switch (this.location.hash) {
      case '#/home':
        view.innerHTML = '首页'
        break
      case '#/user':
        view.innerHTML = '用户中心'
        break
      case '#/login':
        view.innerHTML = '登陆'
        break
    }
  }
</script>
```

## history路由实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <ul>
    <li><a href="?x=home" onclick="changeUl('home');return false">首页</a></li>
    <li><a href="?x=user" onclick="changeUl('user');return false">用户中心</a></li>
    <li><a href="?x=login" onclick="changeUl('login');return false">登陆</a></li>
  </ul>
  <div id="view">
</body>

</html>

<script>
  // const state = { 'page_id': 1, 'user_id': 5 }
  // const title = ''
  // const url = 'hello-world.html'
  // history.pushState(state, title, url)

  const view = document.getElementById('view')
  function changeUl(val) {
    let state = val
    //每一次执行pushState都会在浏览器的地址栏中增加新的网址
    history.pushState(state, null, '?x=' + val);
    setViewChange(val)
  }

  // 设置需要展示的页面
  function setViewChange(val) {
    if (!val) {  //初始化路由
      val = 'home'
    }
    switch (val) {
      case 'home':
        view.innerHTML = '首页'
        break
      case 'user':
        view.innerHTML = '用户中心'
        break
      case 'login':
        view.innerHTML = '登陆'
        break
    }
  }
  window.addEventListener('DOMContentLoaded', onload)
  function onload() {
    // 一开始进入页面匹配路由
    setViewChange()
  }
  // popstate是浏览器某些行为下触发的事件。
  window.addEventListener('popstate', function (e) {
    console.log(e);
    setViewChange(e.state)
  });

  // 与popstate用法相同
  // onpopstate = function (event) {
  //   console.log(event);
  // }
</script>

```
