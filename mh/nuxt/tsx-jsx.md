## 在nuxt中如何使用JSX/TSX语法？

**​内置支持​​：**

Nuxt 3 基于 Vite，默认支持 JSX/TSX 语法，无需额外插件。直接在 .vue文件或独立 .tsx文件中编写即可。

::: code-group

```tsx [HelloWorld.tsx]
// 编写TSX组件：
// components/HelloWorld.tsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: { title: { type: String, required: true } },
  setup(props) {
    const count = ref(0)
    return () => (
      <div>
        <h1>{props.title}</h1>
        <button onClick={() => count.value++}>Count: {count.value}</button>
      </div>
    )
  },
})
```

```vue [hello.vue]
<!-- 在页面中使用tsx组件： -->
<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld'
</script>

<template>
  <HelloWorld title="Nuxt 3 + TSX" />
</template>
```

更多内容请阅读：[https://cn.vuejs.org/guide/extras/render-function](https://cn.vuejs.org/guide/extras/render-function)
