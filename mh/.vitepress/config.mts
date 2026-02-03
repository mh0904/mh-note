import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'mh',
  description: 'mh note',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'css', link: '/views/css/basics' },
      { text: 'javascript', link: '/views/javascript/basics' },
      { text: 'react', link: '/views/react/basics' },
    ],
    sidebar: [
      {
        text: '年度计划',
        items: [
          { text: '2026年年度计划', link: '/views/javascript/ES6-trip' },
          { text: '2027年年度计划', link: '/views/javascript/ES6-trip' },
        ],
      },
      {
        text: 'JS文档',
        items: [
          { text: 'ES6探索之旅', link: '/views/javascript/ES6-trip' },
          { text: '代码优化', link: '/views/javascript/optimize' },
          { text: 'browser', link: '/views/javascript/browser' },
          { text: 'canvas', link: '/views/javascript/canvas' },
          { text: 'js入门', link: '/views/javascript/basics' },
          { text: 'js进阶', link: '/views/javascript/advance' },
          { text: '方法实现', link: '/views/javascript/method-realize' },
          { text: 'object', link: '/views/javascript/object' },
          { text: '数据处理', link: '/views/javascript/data-correlation' },
          { text: '性能优化', link: '/views/javascript/performance-optimization' },
          { text: '笔试', link: '/views/javascript/written-examination' },
        ],
      },
      {
        text: 'vue文档',
        items: [{ text: 'vue3内置组件', link: '/views/vue/v3-built-in-components' }],
      },
      {
        text: 'css文档',
        items: [
          { text: '快速入门', link: '/views/css/style-basics' },
          { text: '使用技巧', link: '/views/css/style-techniques' },
          { text: '问题归纳', link: '/views/css/style-issue' },
          { text: '进阶', link: '/views/css/advance' },
          { text: '元素', link: '/views/css/element' },
          { text: '布局', link: '/views/css/layout' },
          { text: 'css属性计算', link: '/views/css/attribute-calculation' },
          { text: '包含块', link: '/views/css/containing-block' },
        ],
      },
      {
        text: 'nuxt文档',
        items: [
          { text: 'WASM的介绍', link: '/views/nuxt/wasm' },
          { text: '错误处理', link: '/views/nuxt/error-handling' },
          { text: 'JSX/TSX语法', link: '/views/nuxt/tsx-jsx' },
          { text: 'Module Extend Pages', link: '/views/nuxt/modules' },
          { text: '内置组合式函数', link: '/views/nuxt/composables' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: 'webapack', link: '/views/others/webpack' },
          { text: '代码提交校验及提交规范', link: '/views/others/code-submission' },
          { text: 'react中全局配置less', link: '/views/others/configure-less' },
          { text: 'git相关', link: '/views/others/git' },
          { text: '微前端', link: '/views/others/micro-frontend' },
        ],
      },
      {
        text: 'react文档',
        items: [
          { text: '基础', link: '/views/react/basics' },
          { text: '进阶', link: '/views/react/advance' },
          { text: '内置hooks', link: '/views/react/built-in-hooks' },
          { text: 'useState', link: '/views/react/use-state' },
          { text: 'useState', link: '/views/react/use-state' },
          { text: 'useRef', link: '/views/react/use-ref' },
          { text: 'useCallback', link: '/views/react/use-callback' },
          { text: 'useContext', link: '/views/react/use-context' },
          { text: 'useEffect', link: '/views/react/use-effect' },
          { text: 'useLayoutEffect', link: '/views/react/use-layout-effect' },
          { text: 'useMemo', link: '/views/react/use-memo' },
          { text: 'useReducer', link: '/views/react/use-reducer' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
