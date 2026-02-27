# 目录

- [浏览器的默认行为有哪些？如何阻止浏览器的默认行为？](##1)
- [你了解多少 cookie？](##2)
- [本地存储有哪些？他们有那些区别？](##3)
- [说下浏览器的缓存策略？说下缓存相关具体详细信息？](##4)
- [什么是回流与重绘？](##5)
- [请写出至少 5 种常见的 http 状态码以及代表的意义？](##6)
- [http1.0 和 http2.0 有什么区别？](##7)

## 浏览器的默认行为有哪些？如何阻止浏览器的默认行为？{##1}

浏览器的默认行为有很多，比如常见的如下几种：

第一种：浏览器中链接默认会点击后会跳转到指定的 url，如果需要阻止浏览器的跳转，可以在 onclick 事件中 return false，如下：

```html
<a herf="https://wwww.baidu.com" onclick="return false">跳转百度</a> 或者
<a href="https://www.baidu.com" onclick="event.preventDefault()">跳转百度</a>
```

第二种：默认情况下鼠标可以选择文本进行复制的，如果让鼠标不选中文本，可以使用 onselctStart 事件中设置 return false。例如：

```html
<div onselectstart="return false">
  这段内容不可选，禁止文字被选中
  <p>禁止页面中某一块或某一篇文章被选中复制</p>
</div>
```

第三种：默认情况下 form 表单中的 input 在使用回车键的时候会自动提交表单给服务器并刷新页面的，解决方案是在 form 中的 onkeydown 事件中判断回车键的 code 等于 13 的时候直接 return false。

```html
<form action="www.baidu.com" method="get" onkeydown="if(event.keyCode==13){return false;}">
  <input type="text" value="" />
</form>
```

## 你了解多少 cookie？{##2}

是什么？
它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。或者用户偏好、主题或者其他设置。

特点：
cookie 是每个用户身份的通行证。
cookie 是明文传送的安全性差，类似于 get 请求。
存储 cookie 比较小 （一般在 4kb，数量限制在 50 条）
cookie 机制：如果不在浏览器中设置过期时间，cookie 被保存在内存中，生命周期随浏览器的关闭而结束，这种 cookie 简称会话 cookie。如果在浏览器中设置了 cookie 的过期时间，cookie 被保存在硬盘中，关闭浏览器后，cookie 数据仍然存在，直到过期时间结束才消失。

常见的属性：
path：指定路径，如果没有设置默认当前页面。
key：value ：当前设置的 cooke 属性和属性值
expires：指定过期时间，没有设置默认关闭浏览器删除 cookie。
size：cookie 的大小。在所有浏览器中，任何 cookie 大小超过限制都被忽略，且永远不会被设置
HttpOnly：如果这个属性设置为 true，就不能通过 js 脚本 document.cookie 读取到 cookie 信息，这样能有效的防止 XSS 攻击，窃取 cookie 内容，这样就增加了 cookie 的安全性，即便是这样，也不要将重要信息存入 cookie
Secure：当这个属性设置为 true 时，此 cookie 只会在 https 和 ssl 等安全协议下传输

用法：
创建 cookie
document.cookie = "username=John Doe";

删除 cookie：默认是浏览器关闭删除 cookie，如果设置了过期时间会在当前时间过期时候删除。
document.cookie = "name=jick; expires=Mon May 12 2023 10:21:47 GMT+0800 (中国标准时间)"

读取 cookie：可以读取当前页面设置的多个 cookie
document.cookie = "username=John Doe";
document.cookie = "name=jick;"
console.log(document.cookie); // username=John Doe; name=jick

修改 cookie：修改类似于创建，会覆盖之前的 cookie
document.cookie = "username=John Doe";
document.cookie = "username=John Smith;";
console.log(document.cookie); // username=John Smith
注意事项：在浏览器打开的时候必须选择 open with Live Server ，选择 file 路径打开看不见存储的内容（可以实现 7 天免登陆，但是项目中一般后端解决）

## 本地存储有哪些？他们有那些区别？{##3}

Cookie（饼干存储）
存储的大小一般限制在 4kb 左右，数量限制在 60 条，根据不同的浏览器略微有区别。
Cookie 的删除可以通过设置过期时间 expires 来实现，默认是关闭浏览器后删除 Cookie
Cookie 的设置和获取，删除都是通过 document.cookie 去设置，例如 document.cookie = "name=jick; expires=Mon May 12 2023 10:21:47 GMT+0800 (中国标准时间)"
cookie 的常见属性有：
1、expires：设置过期时间。
2、key：value 设置当前的 key 和 value 值。
3、size：设置 cookie 的大小，当超过设置的 cookie 的大小时，设置无效。
4、path：指定路径，默认当前浏览器路径。
5、HttpOnly：如果这个属性设置为 true，就不能通过 js 脚本 document.cookie 读取到 cookie 信息，这样能有效的防止 XSS 攻击，窃取 cookie 内容，这样就增加了 cookie 的安全性，即便是这样，也不要将重要信息存入 cookie。
6、Secure：当这个属性设置为 true 时，此 cookie 只会在 https 和 ssl 等安全协议下传输

LocalStorage（本地存储）
html5 的新方法
存储没有数量限制，大概在 5MB
没有过期时间限制，关闭浏览器不会消失，默认生命周期是永久的，但是数据实际是存在浏览器的文件夹下，可能卸载浏览器就会删除。
操作方法：
获取键值：localStorage.getItem(“key”)
设置键值：localStorage.setItem(“key”,”value”)
清除键值：localStorage.removeItem(“key”)
清除所有键值：localStorage.clear()

sessionStorage（绘画存储）
seesionStorage 的数据不会跟随 HTTP 请求一起发送到服务器，只会在本地生效，并在关闭标签页后清除数据。
不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在 5MB 以下
seesionStorage 的存储方式采用 key、value 的方式。value 的值必须为字符串类型
操作方法：
获取键值：sessionStorage.getItem(“key”)
设置键值：sessionStorage.setItem(“key”,”value”)
清除键值：sessionStorage.removeItem(“key”)
清除所有键值：sessionStorage.clear()

## 说下浏览器的缓存策略？说下缓存相关具体详细信息？{##4}

浏览器的缓存分为两种：协商缓存和强制缓存
强制缓存：浏览器会将第一次请求的资源（js，css，image）等存放在内存中，当第二次请求资源不需要向服务端发送请求，直接从内存中获取。
协商缓存：第一次请求返回资源和资源标志，第二次拿资源标志进行请求，如果资源更新则返回新的资源和资源标志，如果资源没有更新则返回 304.

什么是缓存：把不需要重新获取的内容再重新获取一次
缓存的分类：
服务器缓存(代理服务器缓存、CDN 缓存)，第三方缓存，浏览器缓存等。
缓存的相关术语：

缓存命中率：从缓存中得到数据的请求数与所有请求数的比率。理想状态是越高越好。
过期内容：超过设置的有效时间，被标记为 '陈旧' 的内容。通常过期内容不能用于回复客户端的请求，必须重新向源服务器请求新的内容或者验证缓存的内容是否仍然可用。
验证：验证缓存中的过期内容是否仍然有效，验证通过的话刷新过期时间或策略。
失效：失效就是把内容从缓存中移除。当内容发生改变时就必须移除失效的内容。
另： 浏览器缓存是代价最小的，因为浏览器缓存依赖的是客户端，而几乎不耗费服务器端的资源(极端情况下相当于纯静态页面)。

缓存的作用：
减少网络带宽消耗
降低服务器压力
减少网络延迟，加快页面打开速度

详细：https://juejin.cn/post/7061588533214969892#heading-42

## 什么是回流与重绘？{##5}

总结：
回流：当渲染树上的全部或者部分元素的几何信息需要发生改变的时候，这个过程叫做回流。
重绘：重绘发生在分层完成之后进行，重绘不会改变元素的几何信息，比如改变颜色只会引起重新绘制。
回流必将引起重绘，而重绘不一定会引起回流。
回流何时发生：
添加或者删除可见的 DOM 元素；
元素位置改变；
元素尺寸改变——边距、填充、边框、宽度和高度
内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
页面渲染初始化；
浏览器窗口尺寸改变——resize 事件发生时；

## 请写出至少 5 种常见的 http 状态码以及代表的意义？{##6}

200（OK）：请求已成功，请求所希望的响应头或数据体将随此响应返回。
400（Bad Request）：请求错误，服务端不理解当前请求。
401 用户未登录或者 token 过期，用户未授权
403 资源不可用，一般是用户权限不够，拒绝请求
404（Not Found）：请求失败，请求所希望得到的资源未被在服务器上发现，请求网页不存在
500（Internal Server Error）：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。

## http1.0 和 http2.0 有什么区别？{##7}

1、连接方式：HTTP1.0 是无状态的，每次请求都需要建立新的连接，这意味着每次请求都需要进行 TCP 握手，这会导致大量延迟。然而，HTTP2.0 支持多路复用，允许在一个 TCP 连接上并发多个请求或响应，从而显著提高了网络效率和性能。
2、数据格式：HTTP1.0 的数据是文本格式，虽然方便阅读，但不利于传输和解析。相比之下，HTTP2.0 的数据是二进制格式，这种格式更有效地减少了数据传输量，并且不易出错，从而提高了数据传输的可靠性。
