// 引入express中间件
const express = require("express");
// 创建web服务器
const app = express();
// 你可以更改这个端口号  
const port = 3001; 

// 跨域处理
// app.all("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET");
//   next();
// });

// 返回商品列表
app.get("/goodsList", (req, res) => {
  res.send({
    code: 200,
    list: [
      {
        name: "外星人笔记本",
        price: "$3000",
      },
      {
        name: "兰博基尼",
        price: "$30",
      },
    ],
  });
});

// 启动服务器监听端口
app.listen(port, () => {
  console.log(`启动成功:http://localhost:${port}/`);
});




