# 如何优雅的消除if-else

## 前言

在 JavaScript 开发中，if-else 语句是我们处理条件逻辑时最常用的工具之一。但随着业务复杂度提升，代码中往往会出现大量嵌套的 if-else，形成 "if-else 地狱"，不仅降低代码可读性，还会增加维护成本。本文将介绍几种在 JavaScript 中优雅消除 if-else 的方案，帮助你写出更简洁、可维护的代码。

## 一、使用对象字面量替代简单条件判断

第一种使用对象字面量映射，这也是最常见的一种写法，在对象字面量中有两种方式，第一种是返回固定的值，第二种是执行不同的函数。

**1. 返回固定的值**

```js
// 改进前
function getStatusText(status) {
  if (status === 'pending') return '待处理'
  else if (status === 'success') return '成功'
  else if (status === 'fail') return '失败'
  return '未知状态'
}

// 改进后
let statusMap = {
  pending: '待处理',
  success: '成功',
  fail: '失败',
  default: '未知状态',
}
function getStatusText(status) {
  return statusMap[status] || statusMap.default
}
```

**2. 执行不同的函数**

```js
// 改进前：根据操作类型执行不同逻辑
function handleAction(action, data) {
  if (action === 'add') {
    return data.a + data.b
  } else if (action === 'subtract') {
    return data.a - data.b
  } else if (action === 'multiply') {
    return data.a * data.b
  }
}

// 改进后：函数映射
let actionHandlers = {
  add: () => data.a + data.b,
  subtract: data => data.a - data.b,
  multiply: data => data.a * data.b,
}

function handleAction(action, data) {
  const handler = actionHandlers[action]
  return handler(data)
}
```

## 二、数组方法简化多条件判断

当需要匹配多个条件中的一个时，可以使用数组的find()、some()、includes()等方法来简化代码。

```js
// 改进前：判断是否为有效用户状态
function isActive(status) {
  if (status === 'online' || status === 'idle' || status === 'busy') {
    return true
  }
  return false
}

// 改进后：数组includes
function isActive(status) {
  return ['online', 'idle', 'busy'].includes(status)
}
```

## 三、提前返回（减少嵌套）

将多层 if-else 拆分为 “提前返回”，扁平化代码结构，避免嵌套地狱。

```js
// 改进前：多层嵌套
function processData(data) {
  if (data) {
    if (data.id) {
      if (typeof data.id === 'number') {
        return data.id * 2
      } else {
        throw new Error('id必须是数字')
      }
    } else {
      throw new Error('缺少id')
    }
  } else {
    throw new Error('数据不能为空')
  }
}

// 改进后: 提前返回
function processData(data) {
  if (!data) throw new Error('数据不能为空')
  if (!data.id) throw new Error('缺少id')
  if (typeof data.id !== 'number') throw new Error('id必须是数字')
  return data.id * 2
}
```

## 四、逻辑运算符（简单条件）

用 && 或 || 简化简单的条件执行逻辑，适合单行代码场景。

**1. &&**

```js
// 改进前：条件执行
if (user && user.isAdmin) {
  showAdminPanel()
}

// 改进后：&&
user && user.isAdmin && showAdminPanel()
```

**2. 可选链**

```js
// 改进前：默认值
let name
if (user && user.name) {
  name = user.name
} else {
  name = '访客'
}

// 改进后：可选链
let name = user?.name || '访客'
```

## 五、条件判断与对象属性强关联

典型场景：根据不同类型的配置（如 “用户配置” “商品配置”），从对象中提取不同字段并处理。

**1. 使用对象映射替代条件判断（推荐）**
通过建立 type 与处理逻辑的映射关系，消除 if-else 分支，使代码更清晰，新增类型时只需扩展映射表即可：

```js
// 优化前：根据类型提取字段
function getConfigInfo(config, type) {
  if (type === 'user') {
    return { name: config.userName, age: config.userAge }
  } else if (type === 'product') {
    return { name: config.productName, price: config.productPrice }
  }
}

// 优化后：定义类型与处理函数的映射
function getConfigInfo(config, type) {
  const typeMap = {
    user: () => ({ name: config.userName, age: config.userAge }),
    product: () => ({ name: config.productName, price: config.productPrice }),
  }
  // 执行对应类型的处理函数，默认返回空对象或抛出错误
  return typeMap[type] ? typeMap[type]() : {}
}
```

## 六、状态机

我们用 “订单状态流转” 这个场景来对比：先看用大量 if-else 实现的写法，再对应到状态机的优化思路，就能明显看出差异了。

**场景说明**
假设订单有以下状态和可执行的操作：

- 状态：pending（待支付）、paid（已支付）、shipped（已发货）、completed（已完成）、cancelled（已取消）
- 操作：pay（支付）、cancel（取消）、ship（发货）、confirm（确认收货）

规则：

- 待支付（pending）→ 可执行支付（pay）→ 变为已支付（paid）；可执行取消（cancel）→ 变为已取消（cancelled）
- 已支付（paid）→ 可执行发货（ship）→ 变为已发货（shipped）
- 已发货（shipped）→ 可执行确认收货（confirm）→ 变为已完成（completed）
- 已取消 / 已完成 → 不能执行任何操作

**1. 用 if-else 处理状态流转**

```js
function handleOrderEvent(currentState, event) {
  // 当前状态是 pending（待支付）
  if (currentState === 'pending') {
    if (event === 'pay') {
      // 支付操作：状态变为 paid，执行支付成功逻辑
      return { nextState: 'paid', message: '支付成功，订单已确认' }
    } else if (event === 'cancel') {
      // 取消操作：状态变为 cancelled，执行取消逻辑
      return { nextState: 'cancelled', message: '订单已取消，将为您退款' }
    } else {
      // 无效操作（比如 pending 状态下执行 ship）
      return { error: `待支付状态不能执行 ${event} 操作` }
    }
  }

  // 当前状态是 paid（已支付）
  else if (currentState === 'paid') {
    if (event === 'ship') {
      // 发货操作：状态变为 shipped，执行发货逻辑
      return { nextState: 'shipped', message: '订单已发货，请注意查收' }
    } else {
      return { error: `已支付状态不能执行 ${event} 操作` }
    }
  }

  // 当前状态是 shipped（已发货）
  else if (currentState === 'shipped') {
    if (event === 'confirm') {
      // 确认收货：状态变为 completed，执行完成逻辑
      return { nextState: 'completed', message: '订单已完成，感谢您的购买' }
    } else {
      return { error: `已发货状态不能执行 ${event} 操作` }
    }
  }

  // 当前状态是 cancelled 或 completed（已取消/已完成）
  else if (currentState === 'cancelled' || currentState === 'completed') {
    return { error: `【${currentState}】状态不能执行任何操作` }
  }

  // 未知状态
  else {
    return { error: '未知订单状态' }
  }
}
```

**问题分析（为什么 if-else 不好）**

- 嵌套深、可读性差：每个状态下的操作都要嵌套一层 if-else，状态越多，代码越臃肿。
- 扩展性差：如果新增状态（如 “退款中”）或新增操作（如 “申请退款”），需要修改函数内部逻辑，违反 “开闭原则”。
- 容易漏判：比如新增一个状态后，可能忘记在最后的 else 中处理，导致逻辑漏洞。

**2. 用状态机优化后的代码（对应前面的示例）** 状态机的核心是把 “状态 - 操作 - 结果” 的规则用配置表定义，而非硬编码判断：

```js
// 状态机配置表：当前状态 → 操作 → 结果（下一个状态 + 消息）
const stateMachine = {
  pending: {
    pay: { nextState: 'paid', message: '支付成功，订单已确认' },
    cancel: { nextState: 'cancelled', message: '订单已取消，将为您退款' },
  },
  paid: {
    ship: { nextState: 'shipped', message: '订单已发货，请注意查收' },
  },
  shipped: {
    confirm: { nextState: 'completed', message: '订单已完成，感谢您的购买' },
  },
  cancelled: {}, // 无可用操作
  completed: {}, // 无可用操作
}

// 处理函数：直接从配置表中查找，无需 if-else
function handleOrderEvent(currentState, event) {
  // 查找当前状态下的操作配置
  const transition = stateMachine[currentState]?.[event]
  if (transition) {
    return transition // 匹配到则返回结果
  }
  // 未匹配到（无效状态或无效操作）
  return { error: `【${currentState}】状态不能执行 ${event} 操作` }
}
```

**对比**

- if-else 写法：逻辑分散在多个条件判断中，新增状态 / 操作需要修改函数内部。
- 状态机写法：逻辑集中在配置表中，新增状态 / 操作只需扩展配置表，函数无需修改，更符合 “高内聚低耦合”。
  当业务中存在明确的状态流转规则（如订单、流程审批、游戏角色状态等），状态机模式能极大简化代码，避免冗长的 if-else 嵌套。

## 总结

消除 if-else 的核心思想是将条件判断转换为更结构化、更具可读性的代码。根据不同的场景，我们可以选择对象字面量、逻辑运算符、数组方法等不同方案。

记住，代码的可读性和可维护性是我们追求的目标，而不是为了消除 if-else 而消除。选择最适合当前场景的方案，才能写出真正优雅的代码。

希望本文介绍的这些技巧能帮助你在 JavaScript 项目中更好地处理条件逻辑，写出更简洁、更易维护的代码！
