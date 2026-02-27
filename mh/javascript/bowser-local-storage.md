## cookie 的介绍？

介绍：cookie 一般是服务端创建，保存在客户端的，cookie 的存储形式一般以键值对的形式，例如 name=jack。一般用来保存用户的信息的，在 http 下 cookie 是明文传输的,较不安全。设置的属性如下：

1. key-value：存储的 cookie 的键值和键名。
2. path：这个定义了 Web 站点上可以访问该 Cookie 的目录。
3. Expires：cookie 的最长有效时间，若不设置则 cookie 生命期与会话期相同，即用户关闭浏览器失效，这种是保存在客户端的内存中的，如果设置则保存在用户的内存中，直至有效期结束。
4. size：这个表示 cookie 的大小。
5. http-only: 用于防止客户端脚本通过 document.cookie 属性访问 Cookie，有助于保护 Cookie 不被跨站脚本攻击窃取或篡改。但是，HTTPOnly 的应用仍存在局限性，一些浏览器可以阻止客户端脚本对 Cookie 的读操作，但允许写操作；此外大多数浏览器仍允许通过 XMLHTTP 对象读取 HTTP 响应中的 Set-Cookie 头。
6. Secure：只允许在 https 下传输。
7. Max-age: cookie 生成后失效的秒数。

### cookie 的使用？

```js
// ----- 设置cookie -----
let arr = [
  {
    key: 'username',
    value: 'John Doe',
    day: 7,
  },
  {
    key: 'age',
    value: 18,
    day: 7,
  },
]
function getDay(day) {
  var d = new Date()
  d.setTime(d.getTime() + day * 24 * 60 * 60 * 1000)
  return 'expires=' + d.toGMTString()
}
function setCookie(arr) {
  arr.forEach(item => {
    let expires = getDay(item.day)
    let pairs = `${item.key}=${item.value};`
    let cookie = `${pairs}${expires}`
    document.cookie = cookie
  })
}
setCookie(arr)

// ----- 读取cookie -----
function getCookie(nowKey) {
  let pairs = document.cookie.split(';')
  let param = ''
  pairs.forEach(item => {
    let key = item.split('=')[0].trim()
    let value = item.split('=')[1].trim()
    if (key == nowKey) {
      param = value
    }
  })
  return param
}
console.log(getCookie('age'))

// ----- 删除cookie -----
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-10;' // 设置 Max-Age 为负值删除 Cookie
}
eraseCookie('username') // 删除 'username' 的 Cookie
```

### 注意事项：

1. Cookie 的大小限制通常为 4KB（包括名字、值和属性）。
2. 每个域名下的 Cookie 数量通常限制为 20-50 个不等。
3. JavaScript 操作 Cookie 时，如果设置了 HttpOnly 属性，Cookie 将无法通过 document.cookie 进行访问。

## localStorage 的介绍？

介绍：本地存储（localStorage）指的是用户浏览器中存储数据的方式，它允许 Web 应用程序将少量数据保存在用户设备上，方便页面之间、甚至关闭浏览器后的数据持久化。这种存储方式与传统的 Cookie 相比，有以下显著优点：

1. 存储容量大：相比 Cookie 的 4KB 限制，localStorage 可以存储大约 5MB 的数据（具体大小因浏览器不同略有差异）。
2. 不会随着 HTTP 请求发送：与 Cookie 不同，本地存储的数据不会在每次请求时发送到服务器，从而减少了带宽的消耗。
3. 基于键值对存储：通过简单的键值对形式来存储和访问数据，使用方便。
4. 生命周期：关闭浏览器后数据依然保留，除非手动清除，否则一直在
5. 作用域：相同浏览器的不同标签在同源情况下可以共享 localStorage

### localStorage 的使用？

```js
// 存储数据
localStorage.setItem('username', 'John Doe')

// 读取数据
localStorage.getItem('username')

// 删除数据
localStorage.removeItem('username')

// 修改数据
localStorage.setItem('username', '小明')

// 清空所有数据
localStorage.clear()
```

## localStorage 与 sessionStorage 的区别?

1. localStorage：数据的持久化程度高，即使用户关闭浏览器后，数据依然会被保留。除非显式删除，数据可以一直存在，适用于持久保存用户偏好设置、用户认证信息等需要长时间保存的数据。
2. sessionStorage：数据仅在浏览器的会话期间有效。一旦关闭页面或标签页，数据就会被清除，适用于存储临时性的数据，如表单状态、页面之间的传递数据等。

### 应用场景

localStorage 的应用场景：

1. 用户偏好设置：如主题颜色、语言设置等。
2. 用户身份信息：保存用户登录状态以便后续访问无需重新登录。
3. 长期数据保存：保存一些用户操作数据或浏览历史，以便下次访问时继续使用。

sessionStorage 的应用场景：

1. 临时数据存储：表单数据的暂存、用户填写进度的保存等。
2. 页面跳转数据传递：在多页应用中，页面之间传递数据但不希望数据持久化。
3. 一次性设置：例如购买流程中保存用户选择的产品信息，用户关闭页面后清空。
