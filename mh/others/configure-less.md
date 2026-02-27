## react 项目中如何全局使用 less，并配置 less 模块化？

在 react 项目中的创建过程中，我们可以需要使用 less 预处理工具，但是使用 creact-react-app 创建项目的时候并不支持，这个时候就需要我们手动的添加 less 的配置。常见的配置方式有两种。

第一种：修改 webpack.config.js 配置（不推荐：由于需要暴露隐藏的配置文件，且这种暴露是不可逆的，同时不利于项目的升级，所以不推荐）

第二种：修改 craco.config.js 配置（推荐）

推荐理由：craco 是一个用于扩展和覆盖 Create React App（CRA）默认配置的工具，可以通过开发者在不脱离 Create React App 默认配置的情况下完成定制化配置的需求。

核心优势：
1、无需脱离：使用 CRACO，开发者可以在保留 Create React App 全部好处的同时进行定制，无需执行破坏性的 eject 操作。
2、简单配置：只需创建一个 craco.config.js 文件，即可轻松开始配置之旅。
3、广泛兼容：支持多种流行的技术栈，如 Babel、Webpack、ESLint 等。
4、可扩展：可以方便地添加自定义插件和配置，使项目适应更多场景。

使用方法：

1. 安装 less 及 craco 相关的依赖： `npm i less less-loader @craco/craco craco-less craco-css-modules -D`

```js
  "@craco/craco": "^7.1.0",
  "craco-css-modules": "^1.0.5",
  "craco-less": "^3.0.1",
  "less": "^4.2.0",
  "less-loader": "^12.2.0"
```

2. 在根目录下配置 craco.config.js 文件。

```js
const CracoLessPlugin = require('craco-less')
const CracoCSSModules = require('craco-css-modules')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 示例：全局变量
            javascriptEnabled: true, // 允许在LESS文件中使用JavaScript表达式
            module: true,
          },
        },
      },
    },
    { plugin: CracoCSSModules },
  ],
}
```

3. 修改 package.json 文件。

```js
  "scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

4. 在 app.js 文件下使用 less 模块化语法。

```js
import styles from './App.less'
function App() {
  console.log('styles', styles)
  return (
    <div className="container">
      <div className="box"></div>
    </div>
  )
}
export default App
```

如果你的项目启动成功，并控制台打印的 styles 是一个对象的形式，说明 less 模块化配置成功了。
![alt text](../../images/configure-less-01.png)

如果你不想使用模块化的的方式引入也是可以的。

```js
import './App.less'
function App() {
  return (
    <div className="container">
      <div className="box"></div>
    </div>
  )
}
export default App
```
