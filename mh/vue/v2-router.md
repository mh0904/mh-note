## vue-router 的实现原理？

        1、vue-router是前端路由，主要用于实现无需刷新页面更新视图的效果。
        2、vue-router中有两种模式，分别是hash模式和history模式，这两种的模式的区别是hash模式是通过修改window.location.hash值变化来修改url，同时通过hashchange函数监听hash值的变化，使用hash路由的时候默认会有#，#号后面的内容就是hash值，同时hash值的变化不会传递给服务端。history模式是利用了HTML5中的history API去实现的，比如常见的pushState和replaceState方法分别用于增加浏览器的历史记录栈和替换浏览器的记录栈。同时对于用户在浏览器上的页面前进和后退可以通过监听popState换取。history路由相比hash路由更加美观，同时对于SEO更加的友好。
        3、vue-router中提供了router-link和router-view两个组件，分别实现路由的跳转<router-link to='/name'/>和渲染当前路由对应的组件<router-view/>。
        4、vue-router中还提供了两个路由实例：分别是$router和$route,他们分别代表的是整个路由实例和当前激化的路由实例。

## Vue-Router 的原理是什么?

1. vue-router 是通过 url 映射对应的组件，通过监听 url 的变化去渲染不同的组件。
2. vue-router 有两种模式，第一种是 hash 模式，第二种是 history 模式。hash 模式在域名中添加#，通过监听 window.onhashchange 事件拿到对应的#后面的内容实现跳转。
3. history 模式是通过监听 HTML5 中 History API 监听路由的变化，例如：pushState、replaceState 等。
4. 简易的 hash 路由实现。

```html
<nav>
  <a href="#/home">Home</a>
  <a href="#/about">About</a>
</nav>
<div id="route-view"></div>
<script>
  const routelist = [
    {
      path: '/home',
      component: 'home pages',
    },
    {
      path: '/about',
      component: 'about pages',
    },
  ]
  const routeView = document.getElementById('route-view')
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || '/'
    let items = routelist.find(item => item.path === hash)
    routeView.innerHTML = items.component
  })
</script>
```

4. 简易的 history 路由实现。

```html
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
<div id="route-view"></div>

<script>
  const routelist = [
    {
      path: '/home',
      component: 'home pages',
    },
    {
      path: '/about',
      component: 'about pages',
    },
  ]

  const routeView = document.getElementById('route-view')
  // 拦截所有 <a> 标签点击事件，使用 History API 替换默认跳转
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault() // 阻止默认跳转
      const href = link.getAttribute('href')
      history.pushState({}, '', href) // 更新 URL（不刷新页面）
      let items = routelist.find(item => item.path === href)
      routeView.innerHTML = items.component
    })
  })
</script>
```

## vue 中如何配置路由？说出路由配置项常用的属性及作用？

配置路由：
第一步：安装路由：npm install vue-router --save-dev  
 第二步：在 main.js 中引入当前的路由插件 ：import VueRouter from 'vue-router'
第三步：将路由注入到 vue 中： Vue.use(VueRouter) //全局使用该组件
第四步：在 src 目录下新建一个 router 文件，用于配置路由器。
第五步：在 main.js 的 vue 实例中，将路由器注入到整个项目。

路由配置参数：  
path : 跳转路径
component : 路径相对于的组件
name:命名路由
children:子路由的配置参数(路由嵌套)
props:路由解耦
redirect : 重定向路由

## vue 中`$route`和`$router`的区别？

`$router`是 VueRouter 的一个实例，他包含了所有的路由，包括路由的跳转方法，钩子函数等，
`$route`是一个跳转的路由对象（路由信息对象），每一个路由都会有一个`$route` 对象，是一个局部的对象。
区别是一个是全局的对象，一个是局部的对象，`$router`是用来操作路由的，`$route` 是用来获取路由信息的。

## 什么是命名视图？

常见的视图和路由的渲染是一一对应的，一个组件对应一个路由，但我们想要一个路由展示多个视图组件的时候，就可以使用命名视图的方式。
第一步：需要在 router 的配置文件中配置需要展示的组件。
{
path: 'home',
name: 'home',
title: '主页',
key: 'home',
components: {
homeRight: () => import('@/views/advanced/routerss/homeRight'),
homeLeft: () => import('@/views/advanced/routerss/homeLeft')
}
}
第二步：找到对应的 router-view，通过 name 属性指定对应展示的区域。
<router-view name="homeLeft" />
<router-view name="homeRight" />

## vue 中路由怎么传参的？如何检测路由参数的变化？

vue 路由如何传递参数：

      检测路由参数的变化：
        1、使用watch监听$route对象
        watch: {
          $route (newVal, oldVal) {
            // console.log5(newVal, oldVal) // 监听路由的变化
          }
        },

        2、使用beforeRouterUpdate钩子函数
        beforeRouteUpdate (to, from, next) {
          // to表示去哪里，跳转到那个页面
          // from 表示 来自那个页面
          // next() 表示继续执行页面,要加上的
        },

## VueRouter 中,子路由 path 路径带‘/‘与不带的区别？

区别:
不带 / （推荐）:
如示例代码所示, 当 layout 的子路由 home 在定义 path 路径时没有在路径前书写 / , 那么在 layout 跳转至 home 时, 以$router.push方法为例, 在书写跳转地址时需要与父级路由地址一同书写, 如下 :
$router.push('/layout/home')
浏览器地址栏显示: http:xxxxxxxxxx/layout/home ;

        带 / :
          如示例代码, layout 的子路由 user 定义 path 路径时书写了 / , 那么在 layout 跳转至 user 时, 同样以$router.push方法为例, 只需书写 user 自身的 path 定义的路由地址, 如下:
          $router.push('/user')
          浏览器地址栏显示: http:xxxxxxxxxx/user .

## 什么是路由守卫？路由的钩子函数有哪些？

一、路由守卫就是路由跳转前后做的一些验证。
二、路由常见的钩子函数如下：
berforeEach（全局前置钩子）：初始化执行一次，每次路由改变前的时候执行一次。应用场景：路由跳转前的一些处理，比如登陆验证，管理员权限等。
参数：
to： route：即将要进入的目标 路由对象
from：route：当前导航正要离开的路由
next：function：一定要调用该方法来 resolve 这个钩子
afterEach （全局后置钩子）：初始化执行一次，每次路由改变后的时候执行一次。afterEach 在路由跳转完成时执行，所以没有 next 参数。
berforeEnter （单个路由钩子）：可以单独在路由的配置项上进行配置，参数和全局路由前置钩子参数一致。

在组件中使用的三个路由守卫
beforeRouteEnter:当路由进入之前:登陆验证、热力图的记录、
beforeRouteUpdate:当路由进行更新的时候。如果当前路由发生了变化，但是不需要组件的创建销毁的过程的时候， 就需要用到这个钩子函数
beforeRouterLeave:当路由离开的时候、当用户没有进行支付离开的时候、当用户填写完信息没有保存的时候......

## 完整的导航解析流程？

导航被触发。
在失活的组件里调用离开守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

## 路由懒加载的使用？

作用：像 vue 这种单页面应用，如果没有应用懒加载，运用 webpack 打包后的文件将会异常的大，造成进入首页时， 需要加载的内容过多，时间过长，会出现长时间的白屏，即使做了 loading 也是不利于用户体验，而运用懒加载 则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。
用法：在配置路由时使用：component:（）=>import(“路由的路径")  
 原理：ES6 的动态地加载模块 —— import()
对比：配置路由懒加载的页面首屏只会加载 app.js 的文件，其他文件 js 文件会在点击响应的路由加载。
