## 如何实现水平垂直居中布局？

1. flex 布局： 父元素设置 display:flex; justify-content:center; align-items:center; (适用于多行或者单行，元素可以是任意类型)
2. grid 布局： 父元素设置 display:grid; place-items:center; 或者 display:grid; justify-items:center; align-items:center;
3. 绝对定位 + transform: 父元素相对定位 position:relative; 子元素 position:absolute; left:50%; top:50%; transform: translate(-50%,-50%);
4. 绝对定位 + margin:auto: 父元素相对定位 position:relative; 子元素 position:absolute; left:0; right:0; top:0; bottom:0; margin:auto;
5. 单行文本或者行里元素行内块元素居中: text-align:center; height:x; line-height:x; 高度和行高相等。

## 实现响应式布局的方式有哪些？

1. 媒体查询@media：特点是基于不同的断点定义不同的样式。

```css
/* 默认样式（pc优先） */
.container {
  width: 100%;
}
/* 平板及以下 */
@media (max-width: 768px) {
  .container {
    width: 750px;
  }
}
```

2. flex 布局：一维布局。
3. grid 布局：二维布局。
4. 使用视口单位进行布局：比如 rem、em、vw、wh。
5. 百分比布局：依赖父元素的宽度进行变化。

总结：开发过程中常常采用多种布局方式的融合，比如网站可以采用媒体查询 + vw + 百分比布局

## 如何实现两栏布局？

1. 左边浮动，定宽，右边外边距等于左边宽度。
2. 左右浮动，左边定宽度定百分比，右边定宽度百分比，左右百分比之和等于百分之百。
3. 使用 flex 布局，父元素设置 display:flex，左边元素定宽，右边设置 flex:1。
4. 使用定位，父元素设置相对定位，左子元素设置绝对定位，右边子元素设置外边距等于左边元素的宽度。这种类似于上面的第一种，利用的浮动元素和定位元素会脱离文档流的特性。
5. 利用定位，父元素设置相对定位，左右子元素设置绝对定位，右边元素的 left 设置等于左边元素的宽度。

## 响应式布局的实现方案有哪些？

1. 流式布局：元素按照百分比设定，这种情况下无论屏幕大小如何变化，元素都会按照一定的比例自动调节自己的宽度来适应屏幕的变化。
2. 百分比布局：百分比布局与流式布局类似，也是通过设定元素的百分比宽度来适应不同屏幕尺寸。不过，百分比布局通常还需要配合一些额外的 CSS 技巧，如使用 min-width 和 max-width 属性来限制元素的宽度范围，以防止元素在极端小屏幕下变形或在大屏幕上过于空旷。
3. 媒体查询：媒体查询是 CSS3 中的一项特性，它允许开发者根据设备的特性（如屏幕宽度. 分辨率等）来应用不同的 CSS 样式。
4. 使用 rem 单位：rem 是相对于根元素（html）的字体大小的单位。
5. 使用 vw/vh 单位：vw 和 vh 是视口单位，分别表示视口宽度的 1%和视口高度的 1%。
6. 使用响应式框架：如 Bootstrap. Foundation 等，这些框架内置了响应式布局的功能和组件，可以快速创建响应式网页。

## 如何实现圣杯布局？

圣杯布局：通俗的来说就是左右两栏固定宽度，中间部分自适应的三栏布局。
实现就是在上面固定高度，或者内容撑开，下面固定高度或者内容撑开，中间部分设置 display:flex;左边固定宽度，右边固定宽度，中间设置 flex:1;

## display 有哪些属性？弹性布局和网格布局有哪些区别？

display 属性：
none：用于设置隐藏元素，并且元素不占据任何空间。
block：设置为块级元素，默认宽高百分之百。
inline：设置行内元素，宽高是内容撑开的，不可以设置宽高，可以设置内外边距。
inline-block：设置行内块元素，拥有块级元素的特征，但是不像块级元素那样换行显示，而是左右紧挨着显示的。
table：将元素设置为块级表格显示。
grid：网格布局，最强大的 css 布局之一。
flex：弹性布局，为盒模型提供强大的灵活性。
inline-flex：内联弹性盒模型，与 flex 的不同之处在于当父元素没有设置宽度的时候，设置 flex 默认宽度是百分之百，设置 inline-flex 则宽度由子元素撑开。

区别：

1. 弹性布局的本质是一维布局，网格布局是二维布局，所以网格布局的功能更加强大。
2. 同时弹性布局和网格布局也有很多相似的地方，比如都划分项目和容器，只是网格布局对于项目的控制更加精准。

弹性布局常见的属性：
容器：

1. flex-direction(主轴的排列方向):row（默认值） / row-reverse（水平方向，起点在右） / column / column-reverse
2. flex-warp(项目排列不下如何换行显示):nowarp(默认值不换行) / warp(换行) / warp-reverse(换行第一行在下面)
3. flex-flow（主轴排列方向及是否换行）:row(默认值) / nowrap （flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式）
4. justify-content(项目在主轴的排列方式):flex-start(默认值) / flex-end / center / space-between / space-around
5. align-items(项目在交叉轴排列方式):flex-start / flex-end / center / baseline(文字基线对齐) / stretch(默认值)
6. align-content(多个项目在交叉轴的对齐方式)：flex-start / flex-end / center / space-between / space-around / stretch(默认值)

项目：

1. flex-grow(项目放大比例) 默认值是 0
2. flex-shrink(项目缩小比例) 默认值是 1
3. flex-basis(项目在主轴方向的初始大小) 默认值是 auto
4. order(项目的排列顺序，数字越小排列越靠前)
5. align-self(设置自身在交叉轴的排列方式，可以覆盖 align-items 属性)

网格布局常见属性：

1. grid-template-columns(设置列宽)
2. grid-template-cow（设置行高）
3. repeat 函数（用于简化重复的值）比如：grid-template-rows: repeat(3, 50px);
4. auto-fill 关键字（用于自动填充）比如：grid-template-columns: repeat(auto-fill, 100px);表示当前行尽可能多的排列元素，如果排列不下自动换行。
5. row-gap（表示行间距）
6. column-gap（表示列间距）
7. grid-gap（表示行列间距）
8. grid-template-areas（允许你在网格布局中定义网格的区域）. grid-areas（用于放置自定义的内容）
9. grid-auto-flow（用于控制项目在网格中的流动方式）
10. justify-items（用于设置项目在网格中水平的对齐方式）align-items（用于控制项目在容器中垂直方向的对齐方式）place-items（他们的缩写）
11. jusity-content（用于控制网格容器在浏览器中的水平对齐方式）align-content(用于控制网格容在浏览器垂直方向的对齐方式) palce-content（他们的缩写）
12. grid-auto-columns(用于控制没有指定 grid-template-cloumns 值的宽度). grid-auto-row(用于控制没有指定 grid-template-row 值的高度)
13. grid-column-start（用于控制网格中列网格的起始位置）
14. grid-row-start（用于控制网格中行网格的起始位置）
15. justify-self 属性. align-self 属性以及 place-self 属性（都是用于控制单个网格的对齐方式）

## display:none 和 visibility:hidden 两者的区别？

相同点：display:none 和 visibility：hidden 都是控制元素的显示和隐藏
不同点：当给一个元素设置 display:none 的时候，元素不会占据页面的几何空间，其子元素以及自身的属性都会消失，而设置 visibility：hidden 的元素会占据几何空间，自身的属性仍然然存在，如果给其子元素设置 visibility：visble，则会出现父元素隐藏子元素显示的情况。

## 如何实现等分响应式布局？

```css
ul {
  display: grid; /* 设置网格布局 */
  gap: 10px; /* 项目间隔10px */
  justify-content: center; /* 容器居中对齐 */
  /* 网格中项目的宽度100px 自动填充，排列不下换行显示 */
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 50px; /* 网格中项目的行高 */
  margin: 0;
  padding: 0;
}
li {
  background-color: red;
  list-style: none; /* 去除li的默认样式 */
}
```

## 解释下 flex:1 是什么？flex:0 是什么？flex:auto 又是什么？

先说结论:
flex:1 代表的是 flex:1 1 0%; 即如果存在剩余空间，会占据剩余空间。如果多个项目设置 flex：1，会平分剩余空间。
flex:2 代表的是 flex:2 1 0%; 同样的道理，数字越大，占据剩余空间的比重会越大。
flex:auto 代表的是 flex: 1 1 auto; 即存在剩余空间，会占据剩余空间，如果多个项目设置，与 flex：1 不同的地方是会优先考虑内容，在安排完内容后再对剩余空间进行分配。
flex:0 代表的是 flex:0 1 0% ; 即如果项目如果空间不够，会优先牺牲自己的空间。

解释：这三个参数代表的意思
flex-grow 定义项目放大比例，默认值是 0，即存在剩余空间也不放大。
flex-shrink 定义项目缩小比例，默认值是 1，即不存在剩余空间也不缩小。
flex-basis 定义剩余空间的分配，默认值是 auto，即项目原来的大小。

记忆技巧：先记忆 flex 的默认值，然后如果是数字的话设置的都是 flex-grow 的，同时 flex-basis 都是百分之 0，如果是 auto，设置的 flex-basis，同时 flex-grow：1。

## 如何让图片始终自适应铺满全屏？

1. 背景图片 + background-size: cover;

```css
body {
  margin: 0;
  height: 100vh;
  background-size: cover; /* 等比例缩放图片覆盖容器，图片不会变形 */
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('');
}
```

2. img 标签 + object-fit:cover;

```css
img {
  position: fixed; /* 相对浏览器的视口进行定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 置于内容下方 */
}
```
