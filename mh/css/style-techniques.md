# 常见的css使用技巧

## 一、margin：auto的妙用

1. 块级元素水平居中

当给定宽的块级元素设置 margin: 0 auto; 的时候，元素会在其父容器中水平居中对齐。

```css
.box {
  width: 300px; /* 必须指定宽度 */
  margin-left: auto;
  margin-right: auto; /* 简写为 margin: 0 auto; */
}
```

2. 弹性布局中灵活分配剩余空间

在 Flexbox 中，margin: auto 会吸收剩余空间，可用于实现元素的灵活对齐

```css
.container {
  display: flex;
}

.item {
  margin-left: auto; /* 推到容器右侧 */
}
```

这种方式比 justify-content 更灵活，可单独控制某个元素的位置。
