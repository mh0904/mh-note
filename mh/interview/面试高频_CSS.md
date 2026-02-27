## 目录

- [css 中选择器有哪些？优先级是怎么样的？](##1)
- [div 水平垂直居中的方式有哪些？](##2)
- [盒子模型有哪些？他们的区别？](##3)
- [rem 和 em 的区别？vw 和 vh 的区别？](##4)

## css 中选择器有哪些？优先级是怎么样的？

- 公司：

  1. 2024/5/09/15:00 固德威（苏州外派，线上，薪资：15k-18k）
  2. 2025/3/3/13:30 医疗（外派，线下）薪资 20k-21k

- 第一次回答：

  1. 常见的选择器有 id 选择器，类选择器，属性选择器，兄弟选择器等。

- 总结：
  常见的样式规则有如下几种
  1. 内联样式（直接在标签上写样式，例如：`<div style='font-size:16px'></div>`）权重是 1000
  2. 内部样式（在 body 中调用样式，例如：class="main"）
  3. 在内部样式中，ID 选择器的权重是 100，
  4. 类选择器，属性选择器和伪类选择器的权重都是 10
  5. 元素选择器和伪元素选择器的权重都是 1
  6. 通配符、子选择器、相邻兄弟选择器、一般兄弟选择器，这些选择器的权重为 0，不会增加权重。
  7. 如果在属性的后面加一个！important，则表示优先权最高。
  8. 外部样式（额外建立一个 CSS 文件夹,通过 link 的方式引入，例如：`<link type='text/css' href='css/web、css'>`）
     优先级：内联样式 > 内部样式 > 外部样式
  9. 其他选择器有：
     属性选择器 input[type="text"] { border: 1px solid black; }
     分组选择器 分组选择符（,）例如：h1, h2, h3 { color: purple; }
     相邻元素选择符：div + p { text-indent: 2em; }
     子元素选择符：div > p { color: green; }
     伪类选择符：a:hover { color: blue; }

## div 水平垂直居中的方式有哪些？

- 公司：

  1. 2024/5/14/10:30 金赛药业（上海外派，线上，薪资：16k-18k）
  2. 2024/11/29/17:30 东方希望（外派上海，线上）薪资 11K-20k
  3. 2025/3/3/13:30 医疗（外派，线下）薪资 20k-21k

- 第一次回答：

  1. 父元素设置 display：flex，justify-content：center；align-items：center；
  2. 父元素设置 position：reletive；子元素设置 position：absolute；left：50%； top：50%；tansform:transtion(-50%;-50%);
  3. 父元素设置 display：flex；position：reletive； 子元素设置 position：absolute； left：0；right：0 top：0，bottom：0；
  4. 如果是文字是话可以设置：text-align：center； light-height：50px； height：50px；

- 总结：
  上面的 4 种前面 1、2、4 都是对的，第三种不对。
  1. 父元素设置 display: flex; justify-content: center; align-items: center;
  2. 父元素设置 position: relative;子元素设置 position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);
  3. 父元素设置 position: relative;子元素设置 position: absolute;margin: auto;left: 0;right: 0;top: 0;bottom: 0;
  4. 父元素设置 display: flex; margin:auto;
  5. 父元素设置 height: 300px;text-align: center;line-height: 300px; 子元素是文字的生效;

## 盒子模型有哪些？他们的区别？

- 公司：

  1. 2024/4/03/10:00 同企人工（自研苏州，线上线下）薪资 11k-22k
  2. 2024/4/29/15:00 君果信息（自研上海，线下，薪资：9k-12k）

- 第一次回答：

  1.  盒子模型有两种，分别是怪异盒模型和标准盒模型，他们分别是通过 box-sizing：border-box（怪异盒模型）以及 content-box（标准盒模型）
  2.  怪异盒模型在计算宽高的时候会把 padding 和 broder 的值计算在宽高里面，这样看上去盒子小一点。而标准盒模型不会计算。

- 总结：基本 ok

## rem 和 em 的区别？vw 和 vh 的区别？

- 公司

  1. 2024/4/03/10:00 同企人工（自研苏州，线上线下）薪资 11k-22k
  2. 2025/3/13/16:00 爱奇迹（外派，线上）薪资 10-14k

- 第一次回答：

  1.  rem 和 em 都是相对像素单位，rem 是相对于根元素的像素大小去设置自身的像素大小，em 是根据父元素的像素大小设置自身的像素大小。
  2.  vh 和 vw 都是相对像素单位，100vh 等于当前屏幕的整体高度。

- 总结：
  1.  默认 1rem 的大小等于更元素的 html 的 font-size，也就是 16px。
  2.  vh 和 vw 都是相对浏览器视口的宽度和高度单位。默认 1vw = 视口宽度 / 100
