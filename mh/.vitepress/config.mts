import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'mh',
  description: 'mh note',
  lastUpdated: true, // 开启最近更新时间
  appearance: true,
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  vite: {
    server: {
      watch: {
        // 确保监听 mh 文件夹下的所有 md 文件变动  目前这里有问题！！！！
        ignored: ['!**/mh/**'],
      },
    },
  },
  themeConfig: {
    siteTitle: 'MH', // 站点标题
    logo: '/me.jpg', // 站点图标
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short',
      },
    },

    // 使用插件自动生成侧边栏
    sidebar: generateSidebar({
      documentRootPath: 'mh',
      resolvePath: '/',
      collapsed: false, // 是否默认折叠
      capitalizeFirst: true, // 标题首字母大写
      useTitleFromFileHeading: true, // 使用 md 文件内的 H1 作为侧边栏名称
    }),
    search: {
      provider: 'local', // 本地搜索
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'css', link: '/css/style-basics' },
      { text: 'javascript', link: '/javascript/basics' },
      { text: 'react', link: '/react/basics' },
    ],
    socialLinks: [
      {
        icon: 'juejin',
        link: 'https://juejin.cn/user/712139267641950/posts',
      },
      { icon: 'github', link: 'https://github.com/mh0904/mh-note' },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>',
    },
  },
})
