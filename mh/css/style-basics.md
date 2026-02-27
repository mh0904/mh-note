## position:fixed 和 position：sticky 的区别？

position:fixed 是固定定位

1. 相对浏览器的视口进行定位。
2. 固定定位会脱离文档流。
3. 固定定位始终固定在页面的某个位置，不会随着页面的滚动而滚动，常见的如网页中的返回顶部按钮。

position：sticky 是粘性定位

1. 粘性定位是相对最近的滚动容器进行定位（默认是 viewport，但受父元素影响）。
2. 粘性定位不会脱离文档流动。
3. 粘性定位在特定范围内固定，超出范围后恢复流动。

上面的定位方式都支持设置 top left right bottom 的值

## 粘性定位失效的原因的可能有哪些？

1. ​​父容器或祖先元素设置了 overflow: hidden / overflow: scroll / overflow: auto.
2. sticky 元素是否处于一个​​可滚动的容器内​​？页面/父容器是否能滚动？
3. 检查sticky的z-index是否是否比较低，被其他元素遮挡。
4. 元素没有设置top、left、bottom、right值。

## css 选择器的优先级？

1. 元素选择器（div、p）：权重 1
2. 类、伪类（.class、:hover）：权重 10
3. ID 选择器（#id）：权重 100
4. 行内样式（style="color:red;"）：权重 1000
5. !important：最高优先级，覆盖所有样式（但不推荐滥用）

## css 中 calc 属性的作用是什么，主要解决什么问题？

作用：calc 可以用于动态计算长度和大小的值，它允许你使用数学表达式中加减乘除进行计算。
解决问题：
1、适配不同屏幕尺寸：可以根据窗口的大小动态调整元素的位置和大小。
2、响应式设计：比如媒体查询是动态调整元素的大小，实现更加细致的响应式设计。

## css 中哪些属性可以继承，哪些不可以继承？

大多数和文本字体相关的属性都是可以继承的：
1、color、font-size、font-style、font-weight、line-height
2、text-align、text-indent、visibility、list-style、zoom
大多数和布局盒模型相关的属性都是不可以继承的：
1、width、height、margin、padding、border、float、display
2、position、overflow、babckground、box-shadow

## 如何画出 0.5px 的线条？

```css
/* 第一种 */
.box {
  border-bottom: 1px solid red;
  transform: scaleY(0.1);
}

/* 第二种 */
.box {
  position: relative;
}
.box::after {
  position: absolute;
  content: '';
  background-color: red;
  height: 0.5px;
  width: 100%;
}
```

## 什么是浮动？浮动引起什么问题？如何解决？

浮动：当一个元素设置浮动的时候，它会脱离正常的文档流，浮动元素向左或者向右排列。浮动后面的元素会替换浮动元素的位置。（标准流：标准流指的是浏览器渲染元素时的默认状态，浏览器会根据块状元素和行内元素进行不同的排列，块状元素独占一行，行内元素则在同一行内排列。）

浮动引起的问题：
1、父元素高度塌陷：浮动元素默认是脱离正常文档流的，所以当子元素浮动的时候，父元素如果没有设置高度会出现高度塌陷的问题。
2、元素重叠。
3、文字环绕问题。

清除浮动：
1、在父级元素后面添加一个伪元素，例如：.parent::after { content: ""; display: table; clear: both; }
2、给父级元素设置高度：可以解决父元素高度塌陷的问题。
3、使用 BFC（Block Formatting Context）清除浮动：通过设置元素的某些属性（如 overflow: hidden;、display: flow-root;等），可以使其成为一个 BFC，从而清除浮动。

## CSS 引入的方式有哪些?link 和@import 的区别是?

css 中引入外部的 css 文件的方式通常有两种，一种是 link，一种是@import，他们的用法如下：

```html
<link href="./a.css" rel="stylesheet" />

<style type="text/css">
  @import url('./b.css');
</style>
```

区别：
link 是 HTML 提供的引入 css 的方式，link 标签不光用于引入 css 还可以定义 rel 连接属性等，@import 就只能加载 CSS。
link 标签引入的 css 在页面加载的时候就会被加载，而@import 引入的 css 是等待页面全部加载完成后才去加载。
link 本身是标签，所有可以通过 js 去控制 dom 元素的样式，而@import 不可以。

## 怎么让 chrome 浏览器支持 12px 以下的字体？

```css
display: inline-block;
-webkit-transform: scale(0.5);
transform: scale(0.5);
```

## 标准盒模型和 IE 盒模型的区别?

CSS3 中的盒模型有以下两种：标准盒模型、IE（替代）盒模型。
两种盒子模型都是由 content + padding + border + margin 构成，其大小都是由 content + padding + border 决定的，但是盒子内容宽/高度（即 width/height）的计算范围根据盒模型的不同会有所不同：
标准盒模型：只包含 content 。
IE（替代）盒模型：content + padding + border 。
可以通过 box-sizing 来改变元素的盒模型：
box-sizing: content-box ：标准盒模型（默认值）。
box-sizing: border-box ：IE（替代）盒模型。

## 什么是 BFC？

块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
简单来说就是设置了 BFC 的元素就形成独立的区域，BFC 的中内部元素的渲染不会影响到外部元素，一个元素只能存在于一个 BFC 空间

形成 BFC 的条件（常见）
浮动元素 flort 不为 none
绝对定位元素 position 为 absolute 或者 fixed
块级元素 overflow 不是 visible 或者 clip
行内块元素 display 为 inline-block

场景一：避免两个相邻的元素外边距重叠，解决办法：将其中一个盒子外面添加一个 BFC 容器。

场景二：避免父元素高度塌陷，解释：父元素的高度是子元素撑开的，当子元素设置浮动的时候，子元素形成了一个 BFC 元素，又由于 BFC 元素会形成独立的区域，此时浮动的子元素会脱离父元素的文档流。解决方案有很多种，其中一种就是可以将父元素设置成 BFC 容器，给父元素设置 overflow：hidden。

场景三：阻止元素被浮动元素覆盖，这个场景和上面的类似，都是浮动引起的，解决办法有很多，其中最简单的就是将另一个盒子也设置浮动，让两个盒子都处于 BFC 中。

## position 属性有哪些？

静态定位（static）
position 的默认值。
设置了 position:static 的元素按照标准流进行布局。
设置 top，bottom，left，right 等属性无效。

相对定位（relative）
相对定位是相对元素的原本位置进行定位。
不会脱离标准流。
可以使用 top，bottom，left，right 等属性。

绝对定位（absolut）
绝对定位是相对于最近一层有定位元素的父级进行定位，如果没有就相对视口进行定位。
绝对定位会脱离标准流。
可以使用 top，bottom，left，right 等属性。

固定定位（fixed）
固定定位是相对于视口进行定位。
固定定位会脱离标准流。
可以使用 top，bottom，left，right 等属性。
IE6 不支持固定定位；

粘性定位（sticky）
粘性定位是基于用户的滚动位置进行定位。
一般粘性定位开始会根据滚动条滚动，当滚动到设定的区域，将不会滚动，固定在那里。
粘性定位会脱离标准流。
可以使用 top，bottom，left，right 等属性。

## 常见的伪类和伪元素有哪些？

伪类一般用于设置元素的状态。一般用单个冒号表示。
:active 比如鼠标按下不松
:hover 鼠标滑过
:focus 元素获取焦点，一直保持的状态（与 active 的区别是 active 松开鼠标就状态消失，focus 会直到焦点消失后状态才会消失）
:first-child 匹配当前元素的第一个元素。
:last-child 匹配当前元素的最后一个元素。
:nth-child(2) 匹配当前元素的第几个元素。
:only-child 匹配父元素中唯一子元素。
:read-only 伪类选择器,匹配每个设置只读属性的元素。

伪元素用于设置元素的特定部分或者样式。它本身是基于元素的抽象，并不存在文档中。
::first-line 用于向文本的首行设置样式。
::before 用于在元素之前插入新的内容。
::after 用于在元素之后插入新的内容。
::selection 用于元素中用户选中的部分（鼠标或者其他设备选中的部分）。

## css 中隐藏滚动条的属性是？

```css
/* 隐藏 Chrome、Safari 和 Opera 的滚动条 */
.example::-webkit-scrollbar {
  display: none;
}

/* 隐藏 IE、Edge 和 Firefox 的滚动条 */
.example {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
```
