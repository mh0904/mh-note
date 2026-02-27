## nuxt 中常见的内置的组合式函数？

## useState 的使用？

**介绍：** useState 是 nuxt 中简单而强大的内置工具函数，适合跨组件共享状态，特别是对于不需要持久化的临时状态和简单的全局状态。

**类型：**

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

key：是唯一的键值，保证在整个应用的唯一性，如果您未提供键，系统将为您生成一个与文件和实例行号对应的唯一键。
init：为当前状态提供初始值的函数。

**跨组件状态共享：**

```ts
// ComponentA.vue
const sharedData = useState('shared-data', () => 'Hello from A')
sharedData.value = 'Updated by A'

// ComponentB.vue
const sharedData = useState('shared-data') // 获取同一个状态
console.log(sharedData.value) // 'Updated by A'
```

**注意事项：**
对于 key 值冲突的问题，建议使用命名空间的方式进行命名，提高代码的可维护性和可读性。值得注意的是命名空间只是提供一种命名的方式，并不能实现功能的隔离，所以在 cart 中命名的 total 在 user 中也是可以使用的。

```ts
// 使用命名空间避免冲突
const userAuth = useState('auth:user')
const userProfile = useState('profile:user')

// 或者按功能模块划分
const cartItems = useState('cart:items')
const cartTotal = useState('cart:total')
```
