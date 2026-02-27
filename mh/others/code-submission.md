---
theme: vuepress
highlight: vs2015
---

# 代码提交校验

## 代码提交类型分类

| 类型     | 说明                           | 前端适用场景                             |
| -------- | ------------------------------ | ---------------------------------------- |
| feat     | 新增功能                       | 新增组件、页面、路由、API 接口等         |
| fix      | 修复 bug                       | 修复组件逻辑错误、样式兼容性问题等       |
| docs     | 文档更新                       | 更新 README、组件注释、开发文档等        |
| style    | 代码格式调整（不影响逻辑）     | 统一缩进、换行、注释格式等               |
| refactor | 代码重构（不新增功能/修复bug） | 优化组件结构、重命名变量、提取公共逻辑   |
| chore    | 构建/工具/配置相关变动         | 更新依赖、修改构建脚本、调整 ESLint 规则 |
| ci       | CI/CD 配置变更                 | 优化 GitHub Actions、Jenkins 等流程      |

## 前言

在项目管理中，设置代码提交检查是一个至关重要的环节，其目的在于确保代码质量、提高团队协作效率、预防错误和漏洞，减少潜在的风险。为此我们可以借助一些工具链帮助我们实现自动化代码检查、格式化以及提交校验等。

## 工具及功能

下面是前端常见的工具及对应功能

| 工具             | 功能                             | 代表工具           |
| ---------------- | -------------------------------- | ------------------ |
| **代码质量检查** | 提前发现潜在问题和语法错误       | ESLint             |
| **代码格式化**   | 统一代码风格，避免格式争议       | Prettier           |
| **自动化校验**   | 提交前检查代码是否符合规范       | Husky、lint-staged |
| **开发体验优化** | 提供即时反馈，保存时自动修复问题 | VS Code 插件       |

对于代码的质量检查和格式化相比大家都比较熟悉，这里只介绍代码的自动化校验。

## Husky 和 lint-staged 介绍

在前端开发中，Husky 和 lint-staged 是两个非常重要的工具，它们通常被一起使用来确保代码的质量和一致性。

### Husky

Husky 是一个 Git Hook 工具，它允许开发者在 Git 命令执行前后运行自定义脚本。通过 Husky，开发者可以轻松地添加 Git Hooks，并在特定的 Git 事件（如提交代码）发生时执行自定义的脚本。

### lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具。它可以在提交代码之前确保代码质量，避免不符合规范的代码进入代码库。lint-staged 只关注改动的文件，提高 lint 速度，并防止不符合代码规范的代码提交到仓库。

## 配置 Husky 和 lint-staged

### 安装依赖

`npm install husky lint-staged @commitlint/cli @commitlint/config-conventional -D`

安装完成后在 package.json 中可以查看安装的版本，这里安装的`@commitlint/cli @commitlint/config-conventional` 后面会用到，在后面会进行解释。
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3d686422d0ed429fb34c0ea1ece8b9c1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=oTBPV1YKLX6wzAYNg3zpCRTWuiA%3D)

### husky 初始化

`npx husky init`

初始化完成后会生成一个.husky 文件，同时在文件的下面有一个 pre-commit 文件，初始化的内容是 npm test，这里的 pre-commit 文件是 husky 提供的一个定义 git 钩子的文件，这些钩子会在执行`git commit`命令时自动运行。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5b63e51a47e64fe0ab4b5fb3b61fc409~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=mD%2F6gA%2F4cGi6FcRjyLXjlfFLRok%3D)

删除原来的 `npm test ` ，同时添加 `npx lint-staged` ，这是为了在`git commit` 的时候运行 `lint-staged`，所以接下来配置 `lint-staged`。

### 配置 lint-staged

在 package.json 文件中进行如下的配置

```js
{
  "script": {
    "prepare": "husky",
    "lint-staged": "lint-staged",
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.css": ["stylelint --fix"],
    "*.md": ["prettier --write"]
  }
}
```

上述的配置实现了针对不同文件类型运行不同的工具：

1.  eslint --fix：自动修复 ESLint 能处理的问题。
2.  prettier --write：自动格式化代码。
3.  stylelint --fix（可选）：处理 CSS 样式问题。

解释：这里需要解释下 `prepare`，`prepare`  是 NPM 的一个特殊生命周期脚本，它会在以下场景自动执行：1. 安装依赖时（运行 `npm install`）。2.发布包时（运行 `npm publish`）。如果不添加  `prepare`  脚本，团队中的其他开发者在拉取代码后，需要手动运行  `npx husky install`  才能激活 Husky 钩子。通过  `prepare`，可以省略这一步。

## 代码提交测试

在 user 文件下新建一个 vue 文件，并写一段错误的代码，并提交到仓库，这个时候会校验提交不通过，如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f3502782e89c45b7a7363bd290e54213~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=bcT%2BGz57raaPWBkMRlsGHF0qiUs%3D)

删除错误代码，再次提交，显示提交成功。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/11090fe906a740c2a5edeeef1dd69a3c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=xX%2FLsH4EALlucNmk4rWfczVGt9o%3D)

# 代码提交规范

## 前言

在代码的提交过程中怎么保证代码提交的规范性，比如这样的代码提交 `git commit -m 'update'`,明显不符合规范，其他的开发者并不知道提交的信息是更新那部分内容。这个时候可以借助`@commitlint/cli 和 @commitlint/config-conventional`对提交的内容描述进行一些限制。让提交更加规范。

## @commitlint/cli 和 @commitlint/config-conventional 介绍

### @commitlint/cli

`@commitlint/cli` 用于校验 Git 提交信息是否符合规范。它通常与 Husky（一个 Git Hook 工具）和 lint-staged（一个在 Git  暂存区的文件上运行指定的 lint 工具）配合使用，以在提交代码前对提交信息进行校验，从而确保提交信息的格式和内容符合项目规范和约定。

### @commitlint/config-conventional

`@commitlint/config-conventional`提供了一种标准化的提交规范。当使用 @commitlint/cli 进行提交信息校验时，可以引用此配置文件来确保提交信息符合既定的规范。包含了常见的提交类型，如 feat（新功能）、fix（修复 bug）、docs（文档修改）等，以及对应的描述和格式要求。

## 项目中的配置

第一步：在项目根目录下新建一个.commitlintrc.cjs 文件，并添加以下内容。

```js
// https://www.npmjs.com/package/@commitlint/config-conventional
// [
//   'build',
//   'chore',
//   'ci',
//   'docs',
//   'feat',
//   'fix',
//   'perf',
//   'refactor',
//   'revert',
//   'style',
//   'test'
// ];
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

第二步：在 `.husky` 的目录下创建一个 `commit-msg` 文件，在文件中添加以下内容：
`npx --no -- commitlint --edit ${1}`

## 代码提交测试

配置完成后还是刚才的文件，执行命令 `git commit -m 'update'`的时候就会提示添加的提交信息不规范。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/959115e6bb544d28aef453b4bd616f06~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=2C%2BnZovBsdk0VOvohpunG6GrI0U%3D)

使用 `git commit -m 'test: 提交测试'`的格式提交成功(值得注意的是:后面有一个空格)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8a12c967dad3430aa03febb2ddafb7ba~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWg=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNzEyMTM5MjY3NjQxOTUwIn0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741273032&x-orig-sign=sT5BZtFMZwhhlaXdWNoFzE9ly%2Fc%3D)

## 文档介绍

- [https://typicode.github.io/husky/zh/](https://gitee.com/link?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2Fzh%2F)
- [https://www.npmjs.com/package/lint-staged](https://gitee.com/link?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flint-staged)
- [https://www.npmjs.com/package/@commitlint/config-conventional](https://gitee.com/link?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40commitlint%2Fconfig-conventional)
