# vue3中内置组件初体验

## Teleport（传送门）

在 Vue 3 中，​​Teleport（传送门）​​ 是一个内置组件，它允许你将某个组件的子节点 ​​“传送”到 DOM 树的其他位置​​，而不是局限在当前组件的父级 DOM 层级中渲染。

**使用场景：**

在某些 UI 场景中，你可能希望某个组件（比如弹窗、通知、全局加载提示等）​​最终渲染到 `<body>` 或某个特定的 DOM 节点下​​，而不是嵌套在当前组件的 DOM 结构里。例如：

1. 弹窗（Modal）通常应该放在 `<body>` 下，以避免被父元素的 overflow: hidden或 z-index层级限制。
2. Toast 通知也希望脱离当前组件层级，直接显示在页面顶层。

但按照 Vue 的组件化思想，这些 UI 可能是由某个子组件控制的，如果直接渲染，它们会被嵌套在父组件的 DOM 中，带来样式或功能上的限制。

这时候，​​Teleport 就派上用场了​​，它可以将子元素“传送”到 DOM 中你想要的位置，但在逻辑上仍然由当前组件控制。

**modal代码展示：**

```vue [myModel.vue组件]
<script setup>
  import { ref } from 'vue'
  const open = ref(false)
</script>

<template>
  <button @click="open = true"><span>Open Modal</span></button>
  // [!code ++]
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="content">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </div>
    // [!code ++]
  </Teleport>
</template>

<style scoped lang="less">
  button {
    font-size: 14px;
    height: 32px;
    padding: 4px 15px;
    border-radius: 6px;
    border: 1px solid transparent;
    color: #fff;
    background-color: #8fbc8f;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    cursor: pointer;

    span {
      display: inline-block;
      white-space: nowrap;
      text-align: center;
    }
  }

  .modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.45);

    .content {
      width: 300px;
      position: absolute;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
```

**图形化DOM结构对比：**

1. 不使用 Teleport

```
<body>
  └── <div id="app">                            <-- Vue 应用的根挂载节点 (#app)
        └── <Father />                          <-- 父组件（逻辑上的中间层）
              ├── <button>Open Modal</button>   <-- 用于触发/打开 Modal 的按钮
              └── <div class="modal">           <-- Modal 的 DOM 节点！位于 Father 内部
                    ├── <p>这是 Modal 内容</p>
                    └── <button>Close</button>
                  </div>
      </div>
</body>
```

2. 使用 Teleport

```
<body>
  └── <div id="app">
        └── <Father />                          <-- 父组件（逻辑上的中间层）
              ├── <button>Open Modal</button>
              └── ...
      </div>

  └── <div class="modal">              <-- Modal 被 Teleport 到了 body 下！
         ├── <p>这是 Modal 内容</p>
         └── <button>Close</button>
      </div>
</body>
```

### Teleport核心问题：

> [!TIP]
> **被Teleport传递到body下面的`<model/>`组件为什么没有样式和逻辑没有受到影响？**
>
> ---
>
> `<Teleport>`的作用是：将某部分 Vue 组件渲染出的 DOM（比如一个 Modal 的 div）渲染到 DOM 树中的其他位置（如 `<body>`），但该 DOM 对应的 Vue 组件逻辑（JS）、样式（CSS）、状态、事件等，仍然由原来的 Vue 组件实例管理，并未移动。​

> [!TIP]
> **Teleport的作用时机？**
>
> ---
>
> 在整个vue的渲染过程中，Teleport是在虚拟DOM生成之后，将VNode转换成真实DOM之前产生作用的。在虚拟DOM转化成真实DOM的过程中，识别出`<Teleport>`组件,并将其中的子 VNode “传送”（渲染）到指定的目标 DOM 节点（如 `<body>`）下。
