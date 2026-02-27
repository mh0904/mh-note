console.log('初始化webpack');

import './style/index.css'
import './style/index.less'

/**
 * 向body中插入一个div
 */
var box = document.createElement("div"); // 创建一个div标签
box.classList.add("box"); // 添加div的class
document.body.appendChild(box); // 向body中添加一个dev

/**
 * @index.js文件
 * 处理不同的图片
 */
import pngSrc from "./images/img-01.png";
import jpegSrc from "./images/img-02.jpeg";
import gifSrc from "./images/img-03.gif";

let srcs = [pngSrc, jpegSrc, gifSrc];
var imgDiv = document.createElement("div"); // 创建一个div标签
imgDiv.classList.add("imageList"); // 添加div的class
srcs.forEach((item) => {
  const img = document.createElement("img");
  img.src = item;
  imgDiv.appendChild(img);
});
document.body.appendChild(imgDiv);