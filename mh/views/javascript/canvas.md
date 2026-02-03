# Canvas 绘制基础图形详解

Canvas 是 HTML5 核心绘图 API，支持在网页中动态绘制矢量图形。本文将系统讲解 Canvas 基础图形（线条、三角形、矩形、圆形）及组合图形（笑脸）的绘制方法，并附带完整代码与关键说明。

## 一、基础环境搭建（HTML + CSS + 初始化）

首先创建 Canvas 容器与绘图上下文，设置基础样式确保绘图区域清晰可见。

```html
<style>
  /* 容器样式：优化布局与视觉效果 */
  .canvas-container {
    background-color: #f8fafc; /* 浅灰背景，区分页面其他区域 */
    padding: 20px;
    max-width: 600px;
    margin: 20px auto; /* 水平居中 */
    border-radius: 8px; /* 圆角优化 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微阴影增强层次感 */
  }
  /* Canvas 样式：明确绘图边界 */
  #basic-canvas {
    border: 4px dashed #cbd5e1; /* 虚线边框，区分画布区域 */
    background-color: #ffffff; /* 白色画布，便于观察图形 */
    border-radius: 4px;
  }
</style>

<!-- 画布容器 -->
<div class="canvas-container">
  <!-- Canvas 核心元素：width/height 需直接设置（非CSS），确保图形不失真 -->
  <canvas id="basic-canvas" width="500" height="200"></canvas>
</div>

<script>
  // 1. 获取 Canvas 元素与 2D 绘图上下文（核心对象）
  const canvas = document.getElementById('basic-canvas')
  const ctx = canvas.getContext('2d') // 所有绘图操作都通过 ctx 实现

  // 2. 设置公共样式（避免重复代码）
  ctx.lineWidth = 2 // 线条宽度（所有图形通用）
  ctx.strokeStyle = '#2d3748' // 线条颜色（深灰，比黑色更柔和）

  // 3. 页面加载完成后执行绘图（确保 Canvas 已渲染）
  window.addEventListener('load', () => {
    drawLine() // 绘制线条
    drawTriangle() // 绘制三角形
    drawRectangle() // 绘制矩形（原 Square 更准确的命名）
    drawCircle() // 绘制圆形
    drawSmilingFace() // 绘制笑脸（组合图形）
  })
</script>
```

## 二、Canvas 路径绘制核心 API

在绘制路径之前先介绍几个常用的canvas的api。

1.  beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
2.  closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
3.  stroke() 通过线条来绘制图形轮廓。
4.  fill() 通过填充路径的内容区域生成实心的图形。
5.  moveTo(x, y) 将笔触移动到指定的坐标 x 以及 y 上。
6.  lineTo(x, y) 绘制一条从当前位置到指定 x 以及 y 位置的直线。

## 三、具体图形绘制实现

效果展示：
![alt text](../../images/javascript/canvas-01.png)

**1. 绘制直线（基础入门）**

通过 moveTo() 定位起点，lineTo() 绘制线段，最后用 stroke() 渲染轮廓。

```js
function drawLine() {
  ctx.beginPath() // 开启新路径（避免与其他图形混淆）
  ctx.moveTo(25, 25) // 起点：(25,25)（Canvas 左上角为原点 (0,0)）
  ctx.lineTo(105, 25) // 终点：(105,25)（水平向右绘制）
  ctx.stroke() // 渲染直线轮廓
}
```

**2. 绘制三角形（空心 + 实心）**

三角形由三条线段组成，空心需手动闭合路径，实心可直接填充（自动闭合）。

```js
function drawTriangle() {
  // 1. 绘制空心三角形
  ctx.beginPath()
  ctx.moveTo(150, 25) // 顶点1
  ctx.lineTo(200, 25) // 顶点2（水平向右）
  ctx.lineTo(150, 75) // 顶点3（向左下方）
  ctx.closePath() // 闭合路径（连接顶点3与顶点1）
  ctx.stroke() // 渲染空心轮廓

  // 2. 绘制实心三角形（位置偏移，避免与空心重叠）
  ctx.beginPath()
  ctx.moveTo(155, 30) // 顶点1（右移5px，下移5px）
  ctx.lineTo(185, 30) // 顶点2（缩短宽度，更美观）
  ctx.lineTo(155, 60) // 顶点3（上移15px，避免超出范围）
  ctx.fillStyle = '#4299e1' // 单独设置填充色（蓝色）
  ctx.fill() // 填充实心（无需 closePath()，自动闭合）
}
```

**3. 绘制矩形（专用 API，更高效）**

Canvas 为矩形提供了专用方法，无需手动写路径，直接指定位置与尺寸即可。

```js
function drawRectangle() {
  // 1. 空心矩形：strokeRect(x, y, 宽度, 高度)
  ctx.strokeRect(10, 100, 50, 50) // 位置(10,100)，尺寸50x50

  // 2. 实心矩形：fillRect(x, y, 宽度, 高度)（偏移避免重叠）
  ctx.fillStyle = '#48bb78' // 填充色（绿色）
  ctx.fillRect(15, 105, 40, 40) // 位置(15,105)，尺寸40x40

  // 3. 清除矩形区域：clearRect(x, y, 宽度, 高度)（生成“镂空”效果）
  ctx.clearRect(25, 115, 20, 20) // 清除中间20x20区域，变为透明
}
```

**4. 绘制圆形（arc () 方法详解）**

圆形通过 arc() 方法绘制，核心是理解「弧度制」与「绘制方向」。

arc () 方法语法: arc(x, y, radius, startAngle, endAngle, anticlockwise)

- x, y：圆心坐标
- radius：圆的半径
- startAngle/endAngle：起始 / 结束角度（必须用弧度制，公式：`弧度 = (Math.PI / 180) * 角度）`
- anticlockwise：是否逆时针绘制（布尔值，默认 false 顺时针）

```js
function drawCircle() {
  // 1. 绘制完整圆形（360° = 2π 弧度）
  ctx.beginPath()
  ctx.arc(100, 125, 25, 0, Math.PI * 2, false) // 圆心(100,125)，半径25
  ctx.stroke()

  // 2. 绘制上半圆（逆时针，180° = π 弧度）
  ctx.beginPath()
  ctx.arc(100, 125, 15, 0, Math.PI, true) // 半径15，逆时针绘制上半圆
  ctx.stroke()

  // 3. 绘制实心下半圆（顺时针）
  ctx.beginPath()
  ctx.arc(100, 130, 10, 0, Math.PI, false) // 圆心下移5px，半径10
  ctx.fillStyle = '#f6ad55' // 填充色（橙色）
  ctx.fill()
}
```

注意事项：为了保证新的圆弧不会追加到上一次的路径中，在每一次绘制圆弧的过程中都需要使用beginPath()方法。

**5. 绘制组合图形（笑脸）**

通过组合「圆形（脸）+ 小圆（眼睛）+ 半圆（嘴巴）」，实现复杂图形。

```js
function drawSmilingFace() {
  // 1. 绘制脸部轮廓（圆形）
  ctx.beginPath()
  ctx.arc(170, 125, 25, 0, Math.PI * 2, false) // 圆心(170,125)，半径25
  ctx.stroke()

  // 2. 绘制左眼（小圆）
  ctx.beginPath()
  ctx.arc(163, 120, 3, 0, Math.PI * 2, false) // 左眼位置：左移7px，上移5px
  ctx.fillStyle = '#2d3748' // 眼睛颜色（深灰）
  ctx.fill() // 实心眼睛，无需 stroke()

  // 3. 绘制右眼（小圆，与左眼对称）
  ctx.beginPath()
  ctx.arc(178, 120, 3, 0, Math.PI * 2, false) // 右眼位置：右移8px，上移5px
  ctx.fill()

  // 4. 绘制微笑嘴巴（下半圆，顺时针）
  ctx.beginPath()
  ctx.arc(170, 123, 18, 0, Math.PI, false) // 圆心(170,123)，半径18，180°
  ctx.stroke()
}
```

## 四、常见问题与注意事项

1. **Canvas 尺寸设置：** width 和 height 必须直接在 Canvas 标签上设置，若用 CSS 设置会导致图形拉伸失真。
2. **路径隔离：** 每次绘制新图形前，务必调用 beginPath()，否则新图形会与上一次路径叠加。
3. **弧度与角度转换：** arc() 方法仅支持弧度制，需用 `(Math.PI / 180) * 角度` 转换（如 90° = Math.PI/ 2）。
4. **样式优先级：** 若单个图形需要特殊样式（如不同颜色），需在 stroke()/fill() 前单独设置（如 ctx.fillStyle），否则会继承公共样式。

# Canvas 实现电子签名功能

电子签名功能在现代 Web 应用中非常常见，从在线合同签署到表单确认都有广泛应用。本文将带你从零开始，使用 Canvas API 实现一个功能完备的电子签名组件。

## 一、实现思路与核心技术点

实现电子签名的核心思路是追踪用户的鼠标或触摸轨迹，并在 Canvas 上将这些轨迹绘制出来。

**核心技术点：**

- **Canvas API**：用于在网页上动态绘制图形
- **事件监听**：监听鼠标 / 触摸的按下、移动和松开事件
- **坐标转换**：将鼠标 / 触摸事件的坐标转换为 Canvas 元素内的相对坐标
- **线条优化**：通过设置线条属性实现平滑的签名效果

## 二、HTML 结构设计

这是一份简单到爆的html结构，没错，就是这样简单...

```html
<div class="container">
  <p>电子签名</p>
  <canvas id="signatureCanvas" class="signature-border"></canvas>
</div>
```

## 三、CSS 样式设置

为 Canvas 添加一些基础样式，使其看起来像一个签名板。

```css
.container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signature-border {
  width: 98%;
  height: 300px;
  border: 4px dashed #cbd5e1;
  border-radius: 10px;
  cursor: crosshair;
}
```

## 四、JavaScript 核心实现

这是实现签名功能的关键部分，主要包含以下几个步骤：

1.  获取 Canvas 元素和上下文
2.  设置 Canvas 的实际绘制尺寸
3.  定义变量存储签名状态和坐标
4.  实现坐标转换函数
5.  编写事件处理函数
6.  绑定事件监听器

```js
// 获取Canvas元素和上下文
const canvas = document.getElementById('signatureCanvas')
const ctx = canvas.getContext('2d', { willReadFrequently: true })

// 签名状态变量
let isDrawing = false
let lastX = 0
let lastY = 0
let lineColor = '#000000'
let lineWidth = 2

// 初始化Canvas
function initCanvas() {
  // 设置Canvas样式
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

// 响应窗口大小变化
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()
  const { width, height } = rect
  // 保存当前画布内容
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // 调整Canvas尺寸
  canvas.width = width
  canvas.height = height
  // 恢复画布内容
  ctx.putImageData(imageData, 0, 0)
  // 重新设置绘图样式
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
}

// 获取坐标（适配鼠标和触摸事件）
function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect()
  if (e.type.includes('mouse')) {
    return [e.clientX - rect.left, e.clientY - rect.top]
  } else if (e.type.includes('touch')) {
    return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top]
  }
}

// 开始绘制
function startDrawing(e) {
  isDrawing = true
  lastX = getCoordinates(e)[0]
  lastY = getCoordinates(e)[1]
}

// 绘制中
function draw(e) {
  if (!isDrawing) return
  const [currentX, currentY] = getCoordinates(e)
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()
  // 解释： 这里是将当前移动的坐标赋值给下一次绘制的起点，实现线条的流畅。
  ;[lastX, lastY] = [currentX, currentY]
}

// 结束绘制
function stopDrawing() {
  isDrawing = false
}

// 绑定事件监听
function bindEvents() {
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mouseout', stopDrawing)
  // 触摸事件（移动设备）
  canvas.addEventListener('touchstart', e => {
    e.preventDefault() // 防止触摸事件被浏览器默认处理
    startDrawing(e)
  })
  canvas.addEventListener('touchmove', e => {
    e.preventDefault()
    draw(e)
  })
  canvas.addEventListener('touchend', e => {
    e.preventDefault()
    stopDrawing()
  })
}

// 初始化
window.addEventListener('load', () => {
  initCanvas()
  bindEvents()
})
```

## 五、功能亮点与设计思路

1.  **流畅的绘制体验**：通过设置`lineCap: 'round'`和`lineJoin: 'round'`让线条更加平滑自然。
2.  **响应式设计**：监听窗口`resize`事件，动态调整 Canvas 尺寸，确保在不同设备和屏幕尺寸下都能正常工作。
3.  **跨设备支持**：同时支持鼠标和触摸事件，兼容桌面和移动设备。

## 六、完整的代码

::: code-group

```html
<div class="container">
  <p>电子签名</p>
  <canvas id="signatureCanvas" class="signature-border"></canvas>
</div>
```

```css
.container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signature-border {
  width: 98%;
  height: 300px;
  border: 4px dashed #cbd5e1;
  border-radius: 10px;
  cursor: crosshair;
}
```

```js
// 获取Canvas元素和上下文
const canvas = document.getElementById('signatureCanvas')
const ctx = canvas.getContext('2d', { willReadFrequently: true })

// 签名状态变量
let isDrawing = false
let lastX = 0
let lastY = 0
let lineColor = '#000000'
let lineWidth = 2

// 初始化Canvas
function initCanvas() {
  // 设置Canvas样式
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

// 响应窗口大小变化
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()
  const { width, height } = rect
  // 保存当前画布内容
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // 调整Canvas尺寸
  canvas.width = width
  canvas.height = height
  // 恢复画布内容
  ctx.putImageData(imageData, 0, 0)
  // 重新设置绘图样式
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
}

// 获取坐标（适配鼠标和触摸事件）
function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect()
  if (e.type.includes('mouse')) {
    return [e.clientX - rect.left, e.clientY - rect.top]
  } else if (e.type.includes('touch')) {
    return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top]
  }
}

// 开始绘制
function startDrawing(e) {
  isDrawing = true
  lastX = getCoordinates(e)[0]
  lastY = getCoordinates(e)[1]
}

// 绘制中
function draw(e) {
  if (!isDrawing) return
  const [currentX, currentY] = getCoordinates(e)
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()
  // 解释： 这里是将当前移动的坐标赋值给下一次绘制的起点，实现线条的流畅。
  ;[lastX, lastY] = [currentX, currentY]
}

// 结束绘制
function stopDrawing() {
  isDrawing = false
}

// 绑定事件监听
function bindEvents() {
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mouseout', stopDrawing)
  // 触摸事件（移动设备）
  canvas.addEventListener('touchstart', e => {
    e.preventDefault() // 防止触摸事件被浏览器默认处理
    startDrawing(e)
  })
  canvas.addEventListener('touchmove', e => {
    e.preventDefault()
    draw(e)
  })
  canvas.addEventListener('touchend', e => {
    e.preventDefault()
    stopDrawing()
  })
}

// 初始化
window.addEventListener('load', () => {
  initCanvas()
  bindEvents()
})
```

:::

## 七、下一步可以探索的方向

1.  **颜色和粗细选择**：增加 UI 控件让用户自定义签名的颜色和笔触粗细。
2.  **清空签名和保存签名**：增加 UI 控件让用户清空当前的签名，同时支持保存和下载签名。

# canvas 实现滚动序列帧动画

## 前言

在现代网页设计中，滚动触发的动画能极大增强用户体验，其中 Apple 官网的 AirPods Pro 产品页动画堪称经典 —— 通过滚动进度控制序列帧播放，营造出流畅的产品展示效果。本文将简单的实现一下这个动画效果。

## 一、动画核心逻辑

1. 页面分为 3 个楼层：楼层 1（灰色背景）、楼层 2（黑色背景，核心动画区）、楼层 3（灰色背景）
2. 楼层 2 高度为200vh（2 倍视口高度），内部有一个sticky定位的容器，包含文字和 Canvas
3. 当用户滚动页面时，仅在楼层 2 进入并完全离开视口的过程中，Canvas 会根据滚动进度播放 147 帧 AirPods 序列图
4. 窗口尺寸变化时，Canvas 会自动适配，保证动画显示比例正确

## 二、核心技术栈及原理拆解

要实现滚动序列帧动画，需要解决 3 个核心问题：序列帧加载与管理、滚动进度计算、Canvas 渲染与适配。

1. HTML 部分的核心是三层 section 结构和Canvas 动画容器，结构清晰且语义化：

```html
<!-- 楼层1：引导区 -->
<section class="floor1-container floor-container">
  <p>楼层一</p>
</section>
<!-- 楼层2：核心动画区（目标楼层） -->
<section class="floor2-container floor-container" id="targetFloor">
  <!-- sticky容器：滚动时"粘住"视口 -->
  <div class="sticky">
    <p>楼层二</p>
    <!-- Canvas：用于渲染序列帧 -->
    <canvas class="canvas" id="hero-lightpass"></canvas>
  </div>
</section>
<!-- 楼层3：结束区 -->
<section class="floor3-container floor-container">
  <p>楼层三</p>
</section>
```

2. CSS 的核心作用是控制三层布局、实现 sticky 定位、保证 Canvas 适配，代码注释已标注关键逻辑：

```css
/* 重置默认margin，避免布局偏移 */
body,
p {
  margin: 0;
}

/* 楼层1和楼层3样式：灰色背景+居中文字 */
.floor1-container,
.floor3-container {
  background-color: #474646; /* 深灰色背景 */
  height: 500px; /* 固定高度，模拟常规内容区 */
  display: flex; /* Flex布局：实现文字水平+垂直居中 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 楼层1/3文字样式：响应式字体 */
.floor3-container p,
.floor1-container p {
  font-size: 5vw; /* 5vw：相对于视口宽度的5%，实现响应式字体 */
  color: #fff; /* 白色文字，与深色背景对比 */
}

/* 楼层2样式：黑色背景+高高度（动画触发区） */
.floor2-container {
  height: 200vh; /* 200vh：2倍视口高度，保证有足够滚动空间触发动画 */
  background-color: black; /* 黑色背景，突出产品图片 */
  color: #fff; /* 白色文字 */
}

/* 楼层2文字：水平居中 */
.floor2-container p {
  text-align: center;
}

/* 核心：sticky定位容器 */
.sticky {
  position: sticky; /* 粘性定位：滚动到top:0时固定 */
  top: 0; /* 固定在视口顶部 */
  height: 500px; /* 与楼层1/3高度一致，保证视觉连贯 */
  width: 100%; /* 占满视口宽度 */
}

/* Canvas样式：宽度自适应 */
.canvas {
  width: 100%; /* 宽度占满容器 */
  height: auto; /* 高度自动，保持图片比例 */
}
```

3. JS 部分是整个动画的核心，负责预加载序列帧、计算滚动进度、控制 Canvas 渲染和窗口适配，我们分模块解析：

**模块 1：初始化变量与 DOM 元素**

首先定义动画所需的核心变量，包括序列帧数量、图片数组、Canvas 上下文等：

```js
// 1. 动画核心配置
const frameCount = 147 // 序列帧总数（根据实际图片数量调整）
const images = [] // 存储所有预加载的序列帧图片
const canvas = document.getElementById('hero-lightpass') // 获取Canvas元素
const context = canvas.getContext('2d') // 获取Canvas 2D渲染上下文
const airpods = { frame: 0 } // 存储当前播放的帧序号（用对象便于修改）

// 2. 获取目标楼层（楼层2）的DOM元素，用于后续计算滚动位置
const targetFloor = document.getElementById('targetFloor')

// 3. 序列帧图片地址模板（Apple官网的AirPods序列帧地址）
// 作用：通过索引生成每帧图片的URL（如0001.jpg、0002.jpg...）
const currentFrame = index =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
```

**模块 2：预加载所有序列帧图片**

序列帧动画需要所有图片加载完成后才能流畅播放，因此必须先预加载图片：

```js
// 循环生成147帧图片，存入images数组
for (let i = 0; i < frameCount; i++) {
  const img = new Image() // 创建Image对象
  img.src = currentFrame(i) // 给图片设置URL（通过模板生成）
  images.push(img) // 将图片存入数组
}

// 当第一张图片加载完成后，执行首次渲染（避免页面空白）
images[0].onload = render
```

> **为什么要预加载：**
>
> 1. 如果不预加载，用户滚动时图片可能还在加载，导致动画卡顿或跳帧
> 2. 监听第一张图片的onload事件：保证页面初始化时至少有一张图显示，提升首屏体验

**模块 3：Canvas 渲染函数**

定义render()函数，负责将当前帧图片绘制到 Canvas 上：

```js
function render() {
  // 1. 清除Canvas画布（避免上一帧残留）
  context.clearRect(0, 0, canvas.width, canvas.height)

  // 2. 绘制当前帧图片
  // 参数：图片对象、绘制起点X、Y、绘制宽度、绘制高度
  context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height)
}
```

**模块 4：Canvas 窗口适配函数**

当窗口尺寸变化时，需要重新调整 Canvas 的宽高，避免图片拉伸或变形：

```js
function resizeCanvas() {
  // 1. 获取Canvas元素的实际位置和尺寸（包含CSS样式的影响）
  const rect = canvas.getBoundingClientRect()

  // 2. 设置Canvas的实际宽高（Canvas的width/height是像素尺寸，而非CSS样式）
  canvas.width = rect.width
  canvas.height = rect.height

  // 3. 重新渲染当前帧（避免尺寸变化后画布空白）
  render()
}
```

> **易错点提醒：**
>
> 1.  Canvas 有两个 "尺寸"：一个是 HTML 属性width/height（实际像素尺寸），另一个是 CSS 样式width/height（显示尺寸）
> 2.  如果只改 CSS 样式而不改canvas.width/height，图片会拉伸变形；因此必须通过getBoundingClientRect()获取实际显示尺寸，同步设置 Canvas >的像素尺寸

**模块 5：滚动进度计算与帧控制（核心中的核心）**

这是整个动画的逻辑核心 —— 根据用户的滚动位置，计算当前应播放的帧序号，实现 "滚动控制动画"：

```js
function handleScroll() {
  // 1. 获取关键尺寸数据
  const viewportHeight = window.innerHeight // 视口高度（浏览器可见区域高度）
  const floorTop = targetFloor.offsetTop // 目标楼层（楼层2）距离页面顶部的距离
  const floorHeight = targetFloor.offsetHeight // 目标楼层自身的高度（200vh）
  const currentScrollY = window.scrollY // 当前滚动位置（页面顶部到视口顶部的距离）

  // 2. 计算"滚动结束点"：当目标楼层底部进入视口时，动画应播放到最后一帧
  const scrollEnd = floorTop + floorHeight - viewportHeight

  // 3. 计算滚动进度（0~1）：0=未进入楼层2，1=完全离开楼层2
  let scrollProgress = 0
  if (currentScrollY < floorTop) {
    // 情况1：滚动位置在楼层2上方→进度0（显示第一帧）
    scrollProgress = 0
  } else if (currentScrollY > scrollEnd) {
    // 情况2：滚动位置在楼层2下方→进度1（显示最后一帧）
    scrollProgress = 1
  } else {
    // 情况3：滚动位置在楼层2内部→计算相对进度
    const scrollDistanceInFloor = currentScrollY - floorTop // 进入楼层2后滚动的距离
    const totalScrollNeeded = scrollEnd - floorTop // 楼层2内需要滚动的总距离（触发完整动画的距离）
    scrollProgress = scrollDistanceInFloor / totalScrollNeeded // 进度=已滚动距离/总距离
  }

  // 4. 根据进度计算当前应显示的帧序号
  // 公式：目标帧 = 进度 × (总帧数-1) → 保证进度1时显示最后一帧（避免数组越界）
  const targetFrame = Math.floor(scrollProgress * (frameCount - 1))

  // 5. 优化性能：仅当帧序号变化时才重新渲染
  if (targetFrame !== airpods.frame) {
    airpods.frame = targetFrame
    render() // 重新绘制当前帧
  }
}
```

**模块 6：事件监听与初始化**

最后，通过事件监听触发上述逻辑，完成动画初始化：

```js
window.addEventListener('load', () => {
  // 1. 监听滚动事件：用户滚动时触发进度计算
  window.addEventListener('scroll', handleScroll)

  // 2. 监听窗口 resize 事件：窗口尺寸变化时适配Canvas
  window.addEventListener('resize', resizeCanvas)

  // 3. 初始化Canvas尺寸（页面加载完成后首次适配）
  resizeCanvas()
})
```

## 三、完成代码展示

::: code-group

```html
<section class="floor1-container floor-container">
  <p>楼层一</p>
</section>
<section class="floor2-container floor-container" id="targetFloor">
  <div class="sticky">
    <p>楼层二</p>
    <canvas class="canvas" id="hero-lightpass"></canvas>
  </div>
</section>
<section class="floor3-container floor-container">
  <p>楼层三</p>
</section>
```

```css
body,
p {
  margin: 0;
}

.floor1-container,
.floor3-container {
  background-color: #474646;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor3-container p,
.floor1-container p {
  font-size: 5vw;
  color: #fff;
}

.floor2-container {
  height: 200vh;
  background-color: black;
  color: #fff;
}

.floor2-container p {
  text-align: center;
}

.sticky {
  position: sticky;
  top: 0;
  height: 500px;
  width: 100%;
}

.canvas {
  width: 100%;
  height: auto;
}
```

```js
const frameCount = 147
const images = []
const canvas = document.getElementById('hero-lightpass')
const context = canvas.getContext('2d')
const airpods = {
  frame: 0,
}
// 获取目标楼层（floor2）的DOM元素
const targetFloor = document.getElementById('targetFloor')

// 序列帧图片地址模板
const currentFrame = index =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`

for (let i = 0; i < frameCount; i++) {
  const img = new Image()
  img.src = currentFrame(i)
  images.push(img)
}

images[0].onload = render
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height)
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()
  const { width, height } = rect
  canvas.width = width
  canvas.height = height
  render()
}

function handleScroll() {
  const viewportHeight = window.innerHeight // 获取视口高度
  const floorTop = targetFloor.offsetTop // 目标楼层距离顶部的距离
  const floorHeight = targetFloor.offsetHeight // 目标楼层自身的距离
  const currentScrollY = window.scrollY // 获取当前滚动位置（页面顶部到视口顶部的距离）
  const scrollEnd = floorTop + floorHeight - viewportHeight // 滚动结束：目标楼层底部进入视口
  let scrollProgress = 0 // 滚动进度（0~1）

  if (currentScrollY < floorTop) {
    scrollProgress = 0
  } else if (currentScrollY > scrollEnd) {
    scrollProgress = 1
  } else {
    const scrollDistanceInFloor = currentScrollY - floorTop // 在目标楼层的有效区间内计算滚动的进度
    const totalScrollNeeded = scrollEnd - floorTop // 目标楼层需要滚动的总距离
    scrollProgress = scrollDistanceInFloor / totalScrollNeeded
  }
  const targetFrame = Math.floor(scrollProgress * (frameCount - 1)) // 根据进度计算当前应该显示的帧
  // 只有当帧发生变化时才重新渲染，优化性能
  if (targetFrame !== airpods.frame) {
    airpods.frame = targetFrame
    render()
  }
}

// 初始化
window.addEventListener('load', () => {
  // 监听页面滚动条
  window.addEventListener('scroll', handleScroll)
  // 监听页面窗口尺寸变化
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
})
```

:::
