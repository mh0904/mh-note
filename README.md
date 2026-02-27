# blog

## 项目简介

blog 是一个使用 VitePress 构建的技术笔记网站，专注于前端开发相关技术文档的整理与分享。

## 项目结构

```
blog/
├── mh/                 # VitePress 文档源码
│   ├── .vitepress/     # VitePress 配置
│   │   ├── theme/      # 主题配置
│   │   └── config.mts  # 站点配置
│   ├── images/         # 图片资源
│   ├── public/         # 公共资源
│   ├── views/          # 文档内容
│   │   ├── css/        # CSS 相关文档
│   │   ├── harmony-os/ # Harmony OS 相关文档
│   │   ├── interview/  # 面试相关文档
│   │   ├── javascript/ # JavaScript 相关文档
│   │   ├── nuxt/       # Nuxt 相关文档
│   │   ├── others/     # 其他技术文档
│   │   ├── plan/       # 年度计划
│   │   ├── react/      # React 相关文档
│   │   ├── typescript/ # TypeScript 相关文档
│   │   ├── vue/        # Vue 相关文档
│   │   └── webpack/    # Webpack 相关文档
│   └── index.md        # 网站首页
├── .vscode/            # VS Code 配置
├── .gitignore          # Git 忽略文件
├── .prettierrc.json    # Prettier 配置
├── README.md           # 项目说明
├── package.json        # 项目依赖
├── package-lock.json   # 依赖锁定文件
└── 问题.md             # 问题记录
```

## 功能特点

- **技术文档全面**：涵盖 CSS、JavaScript、React、Vue、Nuxt、Webpack 等前端核心技术
- **结构清晰**：按技术类别组织文档，便于查找和学习
- **内容丰富**：包含基础知识、进阶技巧、性能优化等多个层面的内容
- **面试准备**：提供面试真题和高频问题的整理
- **年度计划**：记录个人学习和发展计划
- **主题定制**：支持自定义主题配置，提升阅读体验

## 本地开发

### 环境要求

- Node.js 16+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

然后访问 http://localhost:5173 查看网站。

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

## 部署

构建完成后，可以将 `mh/.vitepress/dist` 目录下的文件部署到任何静态网站托管服务，如：

- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS + CDN

## 贡献指南

欢迎提交 Issue 和 Pull Request 来完善这个项目。

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系

- GitHub: [mh0904/mh-note](https://github.com/mh0904/mh-note)
